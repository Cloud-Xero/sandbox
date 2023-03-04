package main

import "fmt"

func main() {

	// ５つの int を持つ配列を作成（デフォルトではゼロ値で初期化される）
	var a [5]int
	fmt.Println("emp:", a)

	a[4] = 100
	fmt.Println("set:", a)
	fmt.Println("get:", a[4])

	// lenビルトイン関数で配列の長さを取得できる
	fmt.Println("len:", len(a))

	// 配列を1行で宣言かつ初期化
	b := [5]int{1, 2, 3, 4, 5}
	fmt.Println("dcl:", b)

	// 多次元のデータ構造
	var twoD [2][3]int
	for i := 0; i < 2; i++ {
		for j := 0; j < 3; j++ {
			twoD[i][j] = i + j
		}
	}
	fmt.Println("2d:", twoD)
}
