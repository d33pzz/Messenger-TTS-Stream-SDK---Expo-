import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";
import React, { useState, useContext } from "react";
import {useChatContext} from 'stream-chat-expo'
import AuthContext from "../contexts/Authentication";

const SignupScreen = () => {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");

  const {client} = useChatContext()

  const {setUserId } = useContext(AuthContext)

  const signUp = () => {
    connectUser(username, fullName);
  };

  const connectUser = async (username : string, fullName: string) => {
    await client.connectUser(
      {
        id: username,
        name: fullName,
        // image:
        //   "https://images.unsplash.com/photo-1609687532637-967130b8f32f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
      },
      client.devToken(username)
    );
    console.log("User Connected");

    //create a channel
    const channel = client.channel("livestream", "live", {
      name: "notJust.dev",
    });

    await channel.create();
    setUserId(username)
  };
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="UserName"
          value={username}
          onChangeText={(text) => setUsername(text)}
          placeholderTextColor={"grey"}
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Full Name"
          value={fullName}
          placeholderTextColor={"grey"}
          onChangeText={(text) => setFullName(text)}
          style={styles.input}
        />
      </View>
      <Pressable onPress={signUp} style={styles.button}>
        <Text>Sign Up</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    margin: 10,
    justifyContent: "center",
  },
  inputContainer: {
    backgroundColor: "white",
    padding: 10,
    marginVertical: 10,
  },
  input: {},
  button: {
    backgroundColor: "#7da453",
    padding: 15,
    alignItems: "center",
    marginVertical: 10,
  },
});

export default SignupScreen;
