import { StatusBar } from "expo-status-bar";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import { ListItem } from "./components/ListItem";
import { useEffect, useState } from "react";
// import dummyArticles from "./dummies/articles.json";
import axios from "axios";
import Constants from "expo-constants";

const URL = `https://newsapi.org/v2/top-headlines?country=jp&category=business&apiKey=${Constants.expoConfig.extra.newsApiKey}`;

export default function App() {
  const [articles, setArticles] = useState([]);

  const fetchArticles = async () => {
    try {
      const response = await axios.get(URL);
      // console.log(response.data.articles);
      setArticles(response.data.articles);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

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
