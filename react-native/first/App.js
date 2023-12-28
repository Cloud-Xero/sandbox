import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { ListItem } from "./components/ListItem";

export default function App() {
  return (
    <View style={styles.container}>
      <ListItem
        imageUrl={"https://picsum.photos/id/10/300/300"}
        title={
          "Exercitation aute sunt in nulla nisi culpa eiusmod ad minim et."
        }
        author={"React News"}
      />
      <ListItem
        imageUrl={"https://picsum.photos/id/20/300/300"}
        title={"Commodo irure enim nulla irure aliqua nisi sit et."}
        author={"Japan News"}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
