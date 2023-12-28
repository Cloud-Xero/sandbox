import { StatusBar } from "expo-status-bar";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import { ListItem } from "./components/ListItem";
import articles from "./dummies/articles.json";

export default function App() {
  const items = articles.map((article, index) => (
    <ListItem
      imageUrl={article.urlToImage}
      title={article.title}
      author={article.author}
      key={index.toString()}
    />
  ));
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={articles}
        renderItem={({ item }) => (
          <ListItem
            imageUrl={item.urlToImage}
            title={item.title}
            author={item.author}
          />
        )}
        keyExtractor={(_, index) => index.toString()}
      >
        {items}
      </FlatList>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
