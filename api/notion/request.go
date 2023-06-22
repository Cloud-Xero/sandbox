package main

import (
	"bytes"
	"encoding/json"
	"log"
	"net/http"
	"os"
)

type Filter struct {
	And *[]FilterCondition `json:"and,omitempty"`
	// Or  *[]FilterCondition `json:"or,omitempty"`
	Or *[]Filter `json:"or,omitempty"`
}
type FilterCondition struct {
	Property    string       `json:"property"`
	Status      *Status      `json:"status,omitempty"`       // オプショナル（ステータス）
	Select      *Select      `json:"select,omitempty"`       // オプショナル（セレクトボックス）
	MultiSelect *MultiSelect `json:"multi_select,omitempty"` // オプショナル（マルチセレクトボックス）
}

type Status struct {
	Equals    *string `json:"equals,omitempty"`         // オプショナル
	NotEquals *string `json:"does_not_equal,omitempty"` // オプショナル
}

type Select struct {
	Equals string `json:"equals"`
}

type MultiSelect struct {
	Contains       *string `json:"contains,omitempty"`         // オプショナル
	DoesNotContain *string `json:"does_not_contain,omitempty"` // オプショナル
}

type RequestBody struct {
	Filter Filter `json:"filter"`
}

var statusNotStarted = "Not Started"
var statusDone = "Done"
var statusWait = "Wait"

func setRequestHeader(req *http.Request) *http.Request {
	// HTTPリクエストヘッダーにNotionのAPIキーとバージョンを設定する
	req.Header.Add("Authorization", "Bearer "+os.Getenv("NOTION_API_KEY"))
	req.Header.Add("Notion-Version", "2022-06-28")

	return req
}

// DB情報を取得するHTTPリクエストを作成（アイテム名なし）
func CreateRequestDBInfo(apiURL string) *http.Request {
	req, err := http.NewRequest("GET", apiURL, nil)
	if err != nil {
		log.Fatal(err)
	}

	return setRequestHeader(req)
}

// アイテムを全取得するHTTPリクエストを作成
func CreateRequestAllItems(apiURL string) *http.Request {
	req, err := http.NewRequest("POST", apiURL+"/query", nil)
	if err != nil {
		log.Fatal(err)
	}

	return setRequestHeader(req)
}

// フィルター付きアイテム取得するHTTPリクエストを作成
func CreateRequestFilteredItems(apiURL string) *http.Request {
	filter := Filter{
		And: &[]FilterCondition{
			{
				Property: "Status",
				Status: &Status{
					Equals: &statusNotStarted,
				},
			},
		},
	}

	reqBody := RequestBody{
		Filter: filter,
	}
	jsonBody, err := json.Marshal(reqBody)
	if err != nil {
		log.Fatal(err)
	}

	req, err := http.NewRequest("POST", apiURL+"/query", bytes.NewBuffer(jsonBody))
	if err != nil {
		log.Fatal(err)
	}

	req.Header.Add("Content-Type", "application/json")

	return setRequestHeader(req)
}

// 複数条件でフィルター付きアイテム取得するHTTPリクエストを作成
func CreatedRequestMultiFilteredItems(apiURL string) *http.Request {

	filter := Filter{
		Or: &[]Filter{
			{
				And: &[]FilterCondition{
					{
						Property: "Status",
						Status: &Status{
							NotEquals: &statusDone,
						},
					},
					{
						Property: "Week",
						Select: &Select{
							Equals: "6/15 ~ 6/21",
						},
					},
				},
			},
			{
				And: &[]FilterCondition{
					{
						Property: "Status",
						Status: &Status{
							NotEquals: &statusWait,
						},
					},
					{
						Property: "Week",
						Select: &Select{
							Equals: "6/22 ~ 6/30",
						},
						// MultiSelect: &MultiSelect{
						// 	Contains: &selectedWeek,
						// },
					},
				},
			},
		},
	}

	reqBody := RequestBody{
		Filter: filter,
	}
	jsonBody, err := json.Marshal(reqBody)
	if err != nil {
		log.Fatal(err)
	}

	req, err := http.NewRequest("POST", apiURL+"/query", bytes.NewBuffer(jsonBody))
	if err != nil {
		log.Fatal(err)
	}

	req.Header.Add("Content-Type", "application/json")

	return setRequestHeader(req)
}
