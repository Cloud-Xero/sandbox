package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
)

type Filter struct {
	And *[]FilterCondition `json:"and,omitempty"`
	// Or *[]FilterCondition `json:"or,omitempty"`
	Or *[]Filter `json:"or,omitempty"`
}

type FilterCondition struct {
	Property    string       `json:"property"`
	Status      *Status      `json:"status,omitempty"`
	Select      *Select      `json:"select,omitempty"`
	MultiSelect *MultiSelect `json:"multi_select,omitempty"`
}

type Status struct {
	Equals    *string `json:"equals,omitempty"`
	NotEquals *string `json:"does_not_equal,omitempty"`
}

type Select struct {
	Equals string `json:"equals"`
}

type MultiSelect struct {
	Contains       *string `json:"contains,omitempty"`
	DoesNotContain *string `json:"does_not_contain,omitempty"`
}

type RequestBody struct {
	Filter Filter `json:"filter"`
}

type Property struct {
	Select struct {
		Name string `json:"name"`
	} `json:"select,omitempty"`
}

type Response struct {
	Results []Page `json:"results"`
}

type Page struct {
	ID         string                 `json:"id"`
	Properties map[string]interface{} `json:"properties"`
}

type UpdateRequest struct {
	PageID     *string                `json:"page_id,omitempty"`
	Properties map[string]interface{} `json:"properties"`
}

type PageResponse struct {
	Object     string `json:"object"`
	ID         string `json:"id"`
	Properties struct {
		Name struct {
			Title []struct {
				Text struct {
					Content string `json:"content"`
				} `json:"text"`
			} `json:"title"`
		} `json:"Name"`
	} `json:"properties"`
}

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	databaseID := os.Getenv("DATABASE_ID")
	apiURL := "https://api.notion.com/v1/databases/" + databaseID + "/query"

	statusDone := "Done"
	statusWait := "Wait"
	lastWeek := "6/15 ~ 6/21"
	thisWeek := "6/22 ~ 6/30"

	filter := Filter{
		Or: &[]Filter{
			{
				And: &[]FilterCondition{
					{
						Property: "Status",
						Status: &Status{
							Equals: &statusDone,
						},
					},
					{
						Property: "Week",
						Select: &Select{
							Equals: lastWeek,
						},
					},
				},
			},
			{
				And: &[]FilterCondition{
					{
						Property: "Status",
						Status: &Status{
							Equals: &statusWait,
						},
					},
					{
						Property: "Week",
						Select: &Select{
							Equals: lastWeek,
						},
					},
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

	// JSONをGoのデータ構造に変換する
	var resBody Response
	json.NewDecoder(res.Body).Decode(&resBody)

	for _, page := range resBody.Results {
		pageID := page.ID

		updateReqBody := UpdateRequest{
			// PageID: pageID,
			Properties: map[string]interface{}{
				"Week": map[string]interface{}{
					"select": map[string]interface{}{
						"name": thisWeek,
					},
				},
			},
		}

		jsonUpdateBody, _ := json.Marshal(updateReqBody)

		updateURL := "https://api.notion.com/v1/pages/" + pageID
		updateReq, _ := http.NewRequest("PATCH", updateURL, bytes.NewBuffer(jsonUpdateBody))
		updateReq.Header.Add("Authorization", "Bearer "+os.Getenv("NOTION_API_KEY"))
		updateReq.Header.Add("Notion-Version", "2022-06-28")
		updateReq.Header.Add("Content-Type", "application/json")

		updateResp, err := http.DefaultClient.Do(updateReq)
		if err != nil {
			log.Fatal(err)
		}

		defer updateResp.Body.Close()

		var updatedPage PageResponse
		err = json.NewDecoder(updateResp.Body).Decode(&updatedPage)
		if err != nil {
			log.Fatal(err)
		}

		fmt.Printf("Updated Name: %s\n", updatedPage.Properties.Name.Title[0].Text.Content)

	}
}
