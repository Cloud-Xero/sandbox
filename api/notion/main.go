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

// .envファイルから環境変数を読み込む
func loadEnv() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
}

// NotionのAPIエンドポイント作成
func createAPIURL(baseURL, databaseID string) string {
	return fmt.Sprintf("%s/databases/%s", baseURL, databaseID) // 指定したフォーマット（%sを後続の引数に置き換えて）文字列を生成
}

// HTTPリクエストを実行
func doRequest(req *http.Request) *http.Response {
	client := &http.Client{Timeout: time.Second * 10}
	resp, err := client.Do(req)
	if err != nil {
		log.Fatal(err)
	}

	return resp
}

// レスポンスの加工処理
func processResponse(resp *http.Response) {
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

/*
 * main関数
 */
func main() {

	loadEnv()

	notionAPIBase := "https://api.notion.com/v1"
	databaseID := os.Getenv("DATABASE_ID")
	apiURL := createAPIURL(notionAPIBase, databaseID)

	// req := CreateRequestDBInfo(apiURL)
	// req := CreateRequestAllItems(apiURL)
	// req := CreateRequestFilteredItems(apiURL)
	req := CreatedRequestMultiFilteredItems(apiURL)
	resp := doRequest(req)

	processResponse(resp)
}
