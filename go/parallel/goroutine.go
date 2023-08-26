package main

import (
	"fmt"
	"runtime"
)

func main() {
	go func() {
		fmt.Println("goroutine invoked")
	}()

	fmt.Printf("num of working goroutines: %d\n", runtime.NumGoroutine())
	fmt.Println("main func finish")
}
