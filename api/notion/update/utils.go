package main

import (
	"fmt"
	"log"
	"net/http"
	"time"
)

// HTTPリクエストを実行
func DoRequest(req *http.Request) *http.Response {
	client := &http.Client{Timeout: time.Second * 10}
	resp, err := client.Do(req)
	fmt.Println(resp.StatusCode)
	if err != nil {
		log.Fatal(err)
	}

	return resp
}
