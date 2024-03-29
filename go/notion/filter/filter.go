package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"sort"

	"github.com/joho/godotenv"
)

type Filter struct {
	And *[]FilterCondition `json:"and,omitempty"`
}

type FilterCondition struct {
	Property string  `json:"property"`
	Status   *Status `json:"status,omitempty"`
}

type Status struct {
	Equals    *string `json:"equals,omitempty"`         // オプショナル
	NotEquals *string `json:"does_not_equal,omitempty"` // オプショナル
}

type RequestBody struct {
	Filter Filter `json:"filter"`
}

type ResponseData struct {
	Results []struct {
		Properties struct {
			Name struct {
				Title []struct {
					Text struct {
						Content string `json:"content"`
					} `json:"text"`
				} `json:"title"`
			} `json:"Name"`
		} `json:"properties"`
	} `json:"results"`
}

// フィルター付きアイテム取得するHTTPリクエストを作成
func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	databaseID := os.Getenv("DATABASE_ID")
	apiURL := "https://api.notion.com/v1/databases/" + databaseID + "/query"

	status := "Done"

	filter := Filter{
		And: &[]FilterCondition{
			{
				Property: "Status",
				Status: &Status{
					Equals: &status,
				},
			},
		},
	}

	reqBody := RequestBody{
		Filter: filter,
	}

	// Goの構造体をHTTPリクエストのボディ（JSON形式）として送信可能な形に変換
	jsonBody, _ := json.Marshal(reqBody)

	req, _ := http.NewRequest("POST", apiURL, bytes.NewBuffer(jsonBody))

	req.Header.Add("Authorization", "Bearer "+os.Getenv("NOTION_API_KEY"))
	req.Header.Add("Notion-Version", "2022-06-28")
	req.Header.Add("Content-Type", "application/json")

	res, err := http.DefaultClient.Do(req)

	if err != nil {
		log.Fatal(err)
	}

	defer res.Body.Close()

	body, _ := io.ReadAll(res.Body)

	// JSONをGoのデータ構造に変換する
	var data ResponseData
	json.Unmarshal(body, &data)

	contents := make([]string, 0, len(data.Results))

	// サイズと容量をあらかじめ指定したスライスを作成
	for _, result := range data.Results {
		if len(result.Properties.Name.Title) > 0 {
			content := result.Properties.Name.Title[0].Text.Content
			contents = append(contents, content)
		}
	}

	// 文字列のスライスソート
	sort.Strings(contents)

	for i, content := range contents {
		fmt.Printf("Content %d: %s\n", i, content)
	}

}
