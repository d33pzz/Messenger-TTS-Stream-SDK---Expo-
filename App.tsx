import React, { useEffect, useState, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StreamChat } from "stream-chat";
import AuthContext from "./contexts/Authentication";
import {
  OverlayProvider,
  Chat,
} from "stream-chat-expo";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

const API_KEY = "pyttepyp5uv9";
const client = StreamChat.getInstance(API_KEY);

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    return () => client.disconnectUser();
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <AuthContext.Provider value={{ userId, setUserId }}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <OverlayProvider>
              {/* <Chat client={client}>
              {selectedChannel ? (
                <Channel channel={selectedChannel}>
                  <MessageList />
                  <MessageInput /> 
                  <Text style={{margin: 50}} onPress={() => setSelectedChannel(null)}>
                    Channel Page
                  </Text>
                </Channel>
              ) : (
                <ChannelList onSelect={onChannelPressed} />
              )}
            </Chat> */}
              <Chat client={client}>
                <Navigation colorScheme={colorScheme} />
              </Chat>
            </OverlayProvider>
            <StatusBar />
          </GestureHandlerRootView>
        </AuthContext.Provider>
      </SafeAreaProvider>
    );
  }
}
