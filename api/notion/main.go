package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/joho/godotenv"
)

func main() {

	// .envファイルから環境変数を読み込む
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// NotionのAPIエンドポイントと、データベースIDを設定
	notionAPIBase := "https://api.notion.com/v1"
	databaseID := os.Getenv("DATABASE_ID")
	apiURL := fmt.Sprintf("%s/databases/%s", notionAPIBase, databaseID) // 指定したフォーマット（%sを後続の引数に置き換えて）文字列を生成

	// HTTPリクエストを作成
	req, err := http.NewRequest("GET", apiURL, nil)
	if err != nil {
		log.Fatal(err)
	}

	// HTTPリクエストヘッダーにNotionのAPIキーとバージョンを設定する
	req.Header.Add("Authorization", "Bearer "+os.Getenv("NOTION_API_KEY"))
	req.Header.Add("Notion-Version", "2022-06-28")

	// HTTPリクエストを実行
	client := &http.Client{
		Timeout: time.Second * 10,
	}
	resp, err := client.Do(req)
	if err != nil {
		log.Fatal(err)
	}
	defer resp.Body.Close()

	// 応答ボディを読み込み、コンソールに出力
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatal(err)
	}

	// JSONをGoのデータ構造に変換する
	var result interface{}
	json.Unmarshal(body, &result)

	// Goのデータ構造を、整形したJSON文字列に変換する
	formatted, err := json.MarshalIndent(result, "", "  ")
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(string(formatted))

}
