import { View, Text } from 'react-native'
import React from 'react'
import { Channel, MessageInput, MessageList } from 'stream-chat-expo'
import { useRoute } from '@react-navigation/native'

const ChannelScreen = () => {
    const route = useRoute()
    const channel = route.params?.channel;

    if(!channel){
        return <Text>Channel not Found!</Text>
    }
  return (
    <Channel channel={channel}>
    <MessageList />
    <MessageInput />
    </Channel>
  )
}

export default ChannelScreen