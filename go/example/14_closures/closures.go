package main

import "fmt"

// intSeq 関数は、instSeq の中で定義した無名関数を返す
func instSeq() func() int {
	i := 0
	return func() int {
		i++
		return i
	}
}

func main() {

	// intSeq を呼び出した結果（関数）を nextInt に代入
	nextInt := instSeq()

	// nextInt を呼び出すたびに更新される
	fmt.Println(nextInt())  // 1
	fmt.Println(nextInt())  // 2
	fmt.Println(nextInt())  // 3

	// 関数ごとに個別の状態を持っていることを確認するためにもう一つ作成して実行
	newInts := instSeq()
	fmt.Println(newInts())  // 1
}
