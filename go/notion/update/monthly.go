package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"sort"
)

func getMonthRequestBody() RequestBody {
	filter := Filter{
		And: &[]Filter{
			{
				Or: &[]FilterCondition{
					{
						Property: "Month",
						Select: &Select{
							Equals: LAST_MONTH,
						},
					},
				},
			},
			{
				Or: &[]FilterCondition{
					{
						Property: "Status",
						Status: &Status{
							Equals: &STATUS_NOT,
						},
					},
					{
						Property: "Status",
						Status: &Status{
							Equals: &STATUS_PROGRESS,
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

func GetSelectedMonthData() ResponseData {

	reqBody := getMonthRequestBody()

	// Goの構造体をHTTPリクエストのボディ（JSON形式）として送信可能な形に変換
	jsonBody, err := json.Marshal(reqBody)
	if err != nil {
		log.Fatal(err)
	}

	// 指定したURLとHTTPメソッド、およびHTTPリクエストボディを使用して、新しいHTTPリクエストを作成
	req, err := http.NewRequest("POST", GetNotionEndpoint("/query"), bytes.NewBuffer(jsonBody))
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
func UpdateSelectedMonthData(body ResponseData) {

	for _, page := range body.Results {
		pageID := page.ID

		updateReqBody := UpdateRequest{
			Properties: map[string]interface{}{
				"Month": map[string]interface{}{
					"select": map[string]interface{}{
						"name": THIS_MONTH,
					},
				},
			},
		}

		// GoのデータをJSON形式のバイト配列にエンコード
		jsonUpdateBody, _ := json.Marshal(updateReqBody)

		updateURL := PAGES_ENDPOINT + pageID
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
