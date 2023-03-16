package main

import "fmt"

// 明示的な return が必要
func plus(a int, b int) int {
	return a + b
}

// 同じ型の引数が連続する時はまとめられる
func plusPlus(a, b, c int) int {
	return a + b + c
}

// ２つの int を返す
func vals() (int, int) {
	return 3, 7
}

func main() {
	res := plus(1, 2)
	fmt.Println("1+2=", res)

	res = plusPlus(1, 2, 3)
	fmt.Println("1+2+3=", res)

	// 多重代入で関数呼び出しから２つの戻り値を使用
	a, b := vals()
	fmt.Println(a)
	fmt.Println(b)

	// 戻り値の一部のみの仕様であればブランク識別子を使用
	_, c := vals()
	fmt.Println(c)

}
