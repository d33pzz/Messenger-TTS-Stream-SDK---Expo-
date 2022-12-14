import { StyleSheet } from "react-native";
import { ChannelList } from "stream-chat-expo";
import React, { useContext } from "react";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import AuthContext from "../contexts/Authentication";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const onChannelPressed = (channel) => {
    navigation.navigate("Channel", { channel });
    console.log(channel);
  };

  const { userId } = useContext(AuthContext);

  const filters = { members: { $in: [userId] } };
  return (
    <View style={styles.container}>
      <ChannelList onSelect={onChannelPressed} filters={filters} />
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
