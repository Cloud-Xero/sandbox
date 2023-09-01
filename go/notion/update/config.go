package main

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

// 共通定数
func CommonConstants() (string, string) {
	statusNot := "Not Started"
	statusProgress := "In Progress"

	return statusNot, statusProgress
}

// Weekly用定数
func WeeklyConstants() (string, string) {
	lastWeek := "8/22 ~ 8/31"
	thisWeek := "9/1 ~ 9/7"

	return lastWeek, thisWeek
}

// Monthly用定数
func MonthlyConstants() (string, string) {
	lastMonth := "August"
	thisMonth := "September"

	return lastMonth, thisMonth
}

// HTTPリクエストヘッダー情報を取得
func GetRequestHeader() map[string]string {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	header := map[string]string{
		"Authorization":  "Bearer " + os.Getenv("NOTION_API_KEY"),
		"Notion-Version": "2022-06-28",
		"Content-Type":   "application/json",
	}

	return header
}

// エンドポイントを生成
func GetNotionEndpoint() string {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	return "https://api.notion.com/v1/databases/" + os.Getenv("DATABASE_ID") + "/query"
}
