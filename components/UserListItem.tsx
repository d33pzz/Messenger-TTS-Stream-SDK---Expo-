import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React, { useContext } from "react";
import { useChatContext } from "stream-chat-expo";
import AuthContext from "../contexts/Authentication";
import { useNavigation } from "@react-navigation/native";

const UserListItem = ({ user }) => {
  const { client } = useChatContext();
  const { userId } = useContext(AuthContext);
  const navigation = useNavigation();

  const onPress = async () => {
    if (!user.id || !userId) {
      return;
    }
    const channel = client.channel("messaging", { members: [user.id, userId] });
    await channel.watch();

    navigation.navigate("Channel", { channel });
  };
  console.log(user);
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image style={styles.profile} source={{ uri: user.image }} />
      <Text>{user.name}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-between",
  },
  profile: { width: 50, height: 50, borderRadius: 50, marginRight: 10 },
});

export default UserListItem;
