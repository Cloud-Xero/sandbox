package main

import "fmt"

func main() {

	nums := []int{2, 3, 4}
	sum := 0

	// スライス内の数字を合計するために range を使用（配列でも同様に使用可能）
	for _, num := range nums {
		sum += num
	}
	fmt.Println("sum:", sum)

	for i, num := range nums {
		if num == 3 {
			fmt.Println("index:", i)
		}
	}

	// マップに対する range は、キーと値のペアを反復処理する
	kvs := map[string]string{"a": "apple", "b": "banana"}
	for k, v := range kvs {
		fmt.Printf("%s -> %s\n", k, v)
	}

	// キーだけの反復処理も可能
	for k := range kvs {
		fmt.Println("key:", k)
	}

	// 文字列に対する range は、Unicode コードポイントを反復処理する
	// １つ目の値は文字列の先頭からこの文字（rune）までのバイト数を表し、２つ目は rune そのものを表す
	for i, c := range "go" {
		fmt.Println(i, c)
	}

}
