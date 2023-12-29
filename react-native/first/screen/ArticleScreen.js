import { SafeAreaView, StyleSheet, Text } from "react-native";
import { WebView } from "react-native-webview";

export const ArticleScreen = ({ route }) => {
  const { article } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <WebView source={{ url: article.url }}></WebView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
