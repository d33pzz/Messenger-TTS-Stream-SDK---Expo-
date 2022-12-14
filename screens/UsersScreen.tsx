import { StyleSheet, FlatList } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

import React, { useEffect, useState } from "react";
import { useChatContext } from "stream-chat-expo";
// import { FlatList } from "react-native-gesture-handler";
import UserListItem from "../components/UserListItem";

export default function UsersScreen() {
  const { client } = useChatContext();
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false)

  const fetchUsers = async () => {
    setIsLoading(true)
    const response = await client.queryUsers({});
    console.log(response);
    setUsers(response.users);
    setIsLoading(false)

  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={({ item }) => <UserListItem user={item} />}
        onRefresh={fetchUsers}
        refreshing={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
