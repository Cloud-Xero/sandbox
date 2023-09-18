package main

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

var (
	DATABASE_ENDPOINT = "https://api.notion.com/v1/databases/"
	PAGES_ENDPOINT    = "https://api.notion.com/v1/pages/"
	NOTION_API_KEY    string
	DATABASE_ID       string

	STATUS_NOT      = "Not Started"
	STATUS_PROGRESS = "In Progress"

	LAST_WEEK        = "9/8 ~ 9/14"
	THIS_WEEK        = "9/15 ~ 9/21"
	SELECT_WEEK_NAME = "Week"

	LAST_MONTH        = "August"
	THIS_MONTH        = "September"
	SELECT_MONTH_NAME = "Month"

	LAST_COLOR = "gray"
	THIS_COLOR = "yellow"
)

func init() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	NOTION_API_KEY = os.Getenv("NOTION_API_KEY")
	DATABASE_ID = os.Getenv("DATABASE_ID")

	if NOTION_API_KEY == "" || DATABASE_ID == "" {
		log.Fatal("NOTION_API_KEY or DATABASE_ID is not set in the environment")
	}
}

// HTTPリクエストヘッダー情報を取得
func GetRequestHeader() map[string]string {
	return map[string]string{
		"Authorization":  "Bearer " + NOTION_API_KEY,
		"Notion-Version": "2022-06-28",
		"Content-Type":   "application/json",
	}
}

// エンドポイントを生成
func GetNotionEndpoint(subDir string) string {
	return DATABASE_ENDPOINT + DATABASE_ID + subDir
}
