package main

import "fmt"

func main() {

	// 長さ３のstringのスライスを作成（ゼロ値で初期化）
	s := make([]string, 3)
	fmt.Println("emp:", s)

	// 配列と同じように値の設定と取得が可能
	s[0] = "a"
	s[1] = "b"
	s[2] = "c"
	fmt.Println("set:", s)
	fmt.Println("get:", s[2])

	// スライスの長さを取得
	fmt.Println("len:", len(s))

	// appendビルトイン関数で新しい値を含んだスライスを返す
	s = append(s, "d")
	s = append(s, "e", "f")
	fmt.Println("apd:", s)

	// スライスのコピー
	c := make([]string, len(s))
	copy(c, s)
	fmt.Println("cpy:", c)

	// s[2],s[3],s[4]の要素を持つスライスを取得
	l := s[2:5]
	fmt.Println("sl1:", l)

	// s[5]まで（上限は除いて）スライスする
	l = s[:5]
	fmt.Println("sl2:", l)

	// s[2]から（下限は含んで）スライス
	l = s[2:]
	fmt.Println("sl3:", l)

	// スライスの変数を1行で宣言しさらに初期化
	t := []string{"g", "h", "i"}
	fmt.Println(t)

	// スライスを多次元のデータ構造に（内側のスライスの長さは変わり得る）
	twoD := make([][]int, 3)
	for i := 0; i < 3; i++ {
		innerLen := i + 1
		twoD[i] = make([]int, innerLen)
		for j := 0; j < innerLen; j++ {
			twoD[i][j] = i + j
		}
	}
	fmt.Println("2d:", twoD)

}
