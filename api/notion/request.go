package main

import (
	"log"
	"net/http"
	"os"
)

// DB情報を取得するHTTPリクエストを作成
func CreateRequestDBInfo(apiURL string) *http.Request {
	req, err := http.NewRequest("GET", apiURL, nil)
	if err != nil {
		log.Fatal(err)
	}

	// HTTPリクエストヘッダーにNotionのAPIキーとバージョンを設定する
	req.Header.Add("Authorization", "Bearer "+os.Getenv("NOTION_API_KEY"))
	req.Header.Add("Notion-Version", "2022-06-28")

	return req
}
