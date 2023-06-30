package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
)

// DB情報を取得するHTTPリクエストを作成（アイテム名なし）
func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	databaseID := os.Getenv("DATABASE_ID")
	apiURL := "https://api.notion.com/v1/databases/" + databaseID

	req, _ := http.NewRequest("GET", apiURL, nil)

	req.Header.Add("Authorization", "Bearer "+os.Getenv("NOTION_API_KEY"))
	req.Header.Add("Notion-Version", "2022-06-28")

	res, err := http.DefaultClient.Do(req)

	if err != nil {
		log.Fatal(err)
	}

	defer res.Body.Close()

	body, _ := io.ReadAll(res.Body)

	// fmt.Println(res)
	// fmt.Println(string(body))

	// Goのデータ構造を、整形したJSON文字列に変換する
	formatted, err := json.MarshalIndent(body, "", "  ")
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(string(formatted))
}
