package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"sort"
)

func getWeekRequestBody() RequestBody {
	filter := Filter{
		And: &[]Filter{
			{
				Or: &[]FilterCondition{
					{
						Property: "Week",
						Select: &Select{
							Equals: LAST_WEEK,
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

func GetSelectedWeekData() ResponseData {

	reqBody := getWeekRequestBody()

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

// 先週データを今週データに変更
func UpdateSelectedWeekData(body ResponseData) {

	for _, page := range body.Results {
		pageID := page.ID

		updateReqBody := UpdateRequest{
			Properties: map[string]interface{}{
				"Week": map[string]interface{}{
					"select": map[string]interface{}{
						"name": THIS_WEEK,
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

// 色を更新する
func UpdateSelectedWeeklyColor() {
	req, err := http.NewRequest("GET", fmt.Sprintf("%s/%s", DATABASE_ENDPOINT, DATABASE_ID), nil)
	if err != nil {
		panic(err)
	}

	// header変数を使用してリクエストヘッダを設定
	header := GetRequestHeader()
	for key, value := range header {
		req.Header.Add(key, value)
	}

	// HTTPリクエスト実行
	res := DoRequest(req)

	defer res.Body.Close()

	var databaseData map[string]interface{}
	if err := json.NewDecoder(res.Body).Decode(&databaseData); err != nil {
		panic(err)
	}

	rawProperties, hasProperties := databaseData["properties"]
	if !hasProperties || rawProperties == nil {
		panic("No properties found in database data")
	}

	properties, ok := rawProperties.(map[string]interface{})
	if !ok {
		panic("Failed to convert properties to map")
	}

	// カラム名が「Week」のセレクトを取得
	selectProperty, ok := properties[SELECT_WEEK_NAME].(map[string]interface{})
	if !ok {
		panic(fmt.Errorf("%s is not a select property", SELECT_WEEK_NAME))
	}

	// optionsプロパティはselectプロパティ内に存在する
	selectData, ok := selectProperty["select"].(map[string]interface{})
	if !ok {
		panic(fmt.Errorf("%s does not have 'select' key", SELECT_WEEK_NAME))
	}

	// 取得したセレクトに含まれるオプションを全て取得
	options, ok := selectData["options"].([]interface{})
	if !ok {
		panic(fmt.Errorf("%s does not have options", SELECT_WEEK_NAME))
	}

	// 取得したオプションを一つずつ取り出して色を変更していく
	for _, option := range options {
		opt := option.(map[string]interface{})

		// colorが変更されたかどうかをトラックするフラグ
		changed := false

		switch opt["name"].(string) {
		case LAST_WEEK:
			opt["color"] = LAST_COLOR
			changed = true
		case THIS_WEEK:
			opt["color"] = THIS_COLOR
			changed = true
		}

		// 色が変更された場合、その変更をNotionに送信する
		if changed {

			updateReqBody := UpdateRequest{
				Properties: map[string]interface{}{
					SELECT_WEEK_NAME: map[string]interface{}{
						"select": map[string]interface{}{
							"name":  opt["name"].(string),
							"color": opt["color"].(string),
						},
					},
				},
			}

			// GoのデータをJSON形式のバイト配列にエンコード
			jsonUpdateBody, _ := json.Marshal(updateReqBody)

			if err != nil {
				log.Fatal(err)
			}

			req, err := http.NewRequest("PATCH", fmt.Sprintf("%s%s", DATABASE_ENDPOINT, DATABASE_ID), bytes.NewBuffer(jsonUpdateBody))
			if err != nil {
				log.Fatal(err)
			}

			// header変数を使用してリクエストヘッダを設定
			header := GetRequestHeader()
			for key, value := range header {
				req.Header.Set(key, value)
			}

			fmt.Println(req)

			// HTTPリクエスト実行
			res := DoRequest(req)

			defer res.Body.Close()

		}
	}
}
