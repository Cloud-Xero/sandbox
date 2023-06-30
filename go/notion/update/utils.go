package main

import (
	"fmt"
	"log"
	"net/http"
	"time"
)

// HTTPリクエストを実行
func DoRequest(req *http.Request) *http.Response {
	client := &http.Client{Timeout: time.Second * 30}
	resp, err := client.Do(req)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(resp.StatusCode)

	return resp
}
