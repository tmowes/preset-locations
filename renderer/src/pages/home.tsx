import React, { useCallback, useState, useEffect } from 'react'

import fs from 'fs'
import path from 'path'
import { Flex, Text } from '@chakra-ui/react'

import { webKitScrollBar } from '../utils/webKitScrollBar'
import { parseFilePendingRequestToState } from '../utils/parseFilePendingRequestToState'
import { readMultipleFoldersFileNames } from '../utils/readMultipleFoldersFileNames'

export type PendingRequests = {
  id: string
  host: string
  requester: string
  dateTime: string
  time: number
  machine: string
  requestedToolsItems: RequestedToolsItems[]
}

type RequestedToolsItems = {
  quantity: number
  tool: string
  reason: string
}

type PendingFiles = {
  id: string
  path: string
}

export default function Home() {
  const [data, setData] = useState({})
  const [pendingRequests, setPendingRequests] = useState<PendingRequests[]>([])
  const [pendingFiles, setPendingFiles] = useState<PendingFiles[]>([])

  const pendingRequestsFile = path.join('..', 'requests-for-test', 'pending-requests.json')

  const readAction = useCallback(() => {
    fs.readFile(pendingRequestsFile, 'ascii', (err, fileData) => {
      if (!err) {
        setData(JSON.parse(fileData))
      }
    })
  }, [pendingRequestsFile])

  const writeAction = () => {
    const newID = new Date().getTime()
    const newData = JSON.stringify({ ...data, id: newID }, null, 2)
    fs.writeFile(pendingRequestsFile, newData, 'latin1', err => {
      if (err) throw err
    })
  }

  const readPendingRequestsFiles = useCallback(() => {
    setPendingFiles(readMultipleFoldersFileNames)
    pendingFiles.forEach(file => {
      const filteredFiles = pendingRequests.find(request => request.id === file.id)
      if (!filteredFiles) {
        const stream = fs.createReadStream(`${file.path}/${file.id}`, 'latin1')
        stream.once('open', () => {
          stream.on('data', chunk => {
            const content = chunk.toString().split('\n')
            const parsedContent = parseFilePendingRequestToState(content)
            setPendingRequests(prev => [...prev, { id: file.id, ...parsedContent }])
          })
        })
      }
    })
  }, [pendingFiles, pendingRequests])

  useEffect(() => {
    const testConnectionInterval = 5 * 1000 // 5 seconds
    const interval = setInterval(() => {
      readPendingRequestsFiles()
    }, testConnectionInterval)
    return () => clearInterval(interval)
  }, [readPendingRequestsFiles])

  return (
    <Flex w="100%" h="100%" direction="column" align="center">
      <Flex
        w="100%"
        h="100%"
        direction="column"
        overflowY="scroll"
        rounded="6"
        mx="auto"
        bg="transparent"
        css={webKitScrollBar}
      >
        {pendingRequests
          .sort((a, b) => a.time - b.time)
          .map(req => (
            <Flex
              key={req.id}
              bg="gray.800"
              ml="6px"
              mr="0"
              direction="column"
              borderRadius="6"
              mb="1"
              p="0.5"
              px="2"
            >
              <Text mr="auto" fontSize="0.8rem">
                {req.dateTime} - {req.requester} - {req.machine.split(' - ')[1]}
              </Text>
              {req.requestedToolsItems.map(tool => (
                <Flex
                  key={tool.tool}
                  w="100%"
                  pl="3"
                  my="1"
                  borderBottomWidth={1}
                  borderBottomColor="gray.700"
                  pb="0.5"
                >
                  <Text fontSize="0.8rem" lineHeight={1}>
                    {String(tool.quantity).padStart(2, '0')}
                  </Text>
                  <Text fontSize="0.8rem" lineHeight={1} pl="2">
                    {tool.tool}
                  </Text>
                </Flex>
              ))}
            </Flex>
          ))}
      </Flex>
    </Flex>
  )
}
