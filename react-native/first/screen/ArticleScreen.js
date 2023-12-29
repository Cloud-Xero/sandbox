import { SafeAreaView, StyleSheet, Text } from "react-native";

export const ArticleScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>This is Article Screen.</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
