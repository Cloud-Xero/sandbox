package main

import "fmt"

func main() {

	// make関数で空のマップを作成
	m := make(map[string]int)

	m["k1"] = 7
	m["k2"] = 13

	// 全てのキーと値のペアが出力される
	fmt.Println("map:", m)

	// name[key]でキーに対する値を取得できる
	v1 := m["k1"]
	fmt.Println("v1:", v1)

	// len は map に対して使用すると、キーと値のペアの数を返す
	fmt.Println("len:", len(m))

	// delete は map からキーと値のペアを削除する
	delete(m, "k2")
	fmt.Println("map:", m)

	// 2番目の戻り値で指定したキーがマップに存在したかどうかを確認できる（値が不要なときは "_" で無視できる）
	_, prs := m["k2"]
	fmt.Println("prs:", prs)

	// map の宣言と初期化を同時に行う
	n := map[string]int{"foo": 1, "bar": 2}
	fmt.Println("map:", n)
	
}
