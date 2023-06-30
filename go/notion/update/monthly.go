package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"sort"
)

func getMonthRequestBody(status1, status2, lastMonth string) RequestBody {
	filter := Filter{
		And: &[]Filter{
			{
				Or: &[]FilterCondition{
					{
						Property: "Month",
						Select: &Select{
							Equals: lastMonth,
						},
					},
				},
			},
			{
				Or: &[]FilterCondition{
					{
						Property: "Status",
						Status: &Status{
							Equals: &status1,
						},
					},
					{
						Property: "Status",
						Status: &Status{
							Equals: &status2,
						},
					},
				},
			},
		},
	}

	reqBody := RequestBody{
		Filter: filter,
	}

	return reqBody
}

func GetSelectedMonthData(status1, status2, lastMonth string) ResponseData {

	reqBody := getMonthRequestBody(status1, status2, lastMonth)

	// Goの構造体をHTTPリクエストのボディ（JSON形式）として送信可能な形に変換
	jsonBody, err := json.Marshal(reqBody)
	if err != nil {
		log.Fatal(err)
	}

	// 指定したURLとHTTPメソッド、およびHTTPリクエストボディを使用して、新しいHTTPリクエストを作成
	req, err := http.NewRequest("POST", GetNotionEndpoint(), bytes.NewBuffer(jsonBody))
	if err != nil {
		log.Fatal(err)
	}

	// header変数を使用してリクエストヘッダを設定
	header := GetRequestHeader()
	for key, value := range header {
		req.Header.Add(key, value)
	}

	// HTTPリクエスト実行
	res := DoRequest(req)

	defer res.Body.Close()

	// JSONをGoのデータ構造に変換する
	var body ResponseData
	err = json.NewDecoder(res.Body).Decode(&body)
	if err != nil {
		log.Fatal(err)
	}

	contents := make([]string, 0, len(body.Results))

	// サイズと容量をあらかじめ指定したスライスを作成
	for _, result := range body.Results {
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

	return body
}

// 先月データを今月データに変更
func UpdateSelectedMonthData(body ResponseData, thisMonth string) {

	for _, page := range body.Results {
		pageID := page.ID

		updateReqBody := UpdateRequest{
			Properties: map[string]interface{}{
				"Month": map[string]interface{}{
					"select": map[string]interface{}{
						"name": thisMonth,
					},
				},
			},
		}

		// GoのデータをJSON形式のバイト配列にエンコード
		jsonUpdateBody, _ := json.Marshal(updateReqBody)

		updateURL := "https://api.notion.com/v1/pages/" + pageID
		updateReq, _ := http.NewRequest("PATCH", updateURL, bytes.NewBuffer(jsonUpdateBody))

		// header変数を使用してリクエストヘッダを設定
		header := GetRequestHeader()
		for key, value := range header {
			updateReq.Header.Add(key, value)
		}

		// HTTPリクエスト実行
		res := DoRequest(updateReq)

		defer res.Body.Close()

		// HTTPレスポンスのボディを読み込み、JSONからGoのデータ構造にデコード
		var updatedPage PageResponse
		err := json.NewDecoder(res.Body).Decode(&updatedPage)
		if err != nil {
			log.Fatal(err)
		}

		fmt.Printf("Updated Name: %s\n", updatedPage.Properties.Name.Title[0].Text.Content)

	}
}
