package main

import "fmt"

type rect struct {
	width, height int
}

// areaメソッドは、*rectをレシーバ型として持つ
func (r *rect) area() int {
	return r.width * r.height
}

// メソッドは、ポインタまたは値のどちらのレシーバ型に対しても定義できる（ここでは値レシーバ）
func (r rect) perim() int {
	return 2*r.width + 2*r.height
}

func main() {
	r := rect{width: 10, height: 5}

	// 構造体に定義された２つのメソッドを呼び出す
	fmt.Println("area:", r.area()) // area: 50
	fmt.Println("perim:", r.perim()) // perim: 30

	// Goは、メソッド呼び出しに対する値・ポインタ間の変換を自動的に扱う
	// メソッドを呼び出す時の構造体の不要なコピーを避けたり、元の構造自体を変更したりするためには、ポインタレシーバを型を使用する
	rp := &r
	fmt.Println("area:", rp.area()) // area: 50
	fmt.Println("perim:", r.perim()) // perim: 30
	
}
