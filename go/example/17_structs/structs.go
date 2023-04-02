package main

import "fmt"

// nameフィールドと ageフィールドを持つ構造体
type person struct {
	name string
	age  int
}

func newPerson(name string) *person {
	p := person{name: name}
	p.age = 42
	return &p
}

func main() {
	fmt.Println(person{"Bob", 20})

	// 初期化時にフィールド名を指定することもできる
	fmt.Println(person{name: "Alice", age: 30})

	// 省略されたフィールドはゼロ値になる
	fmt.Println(person{name: "Fred"})

	// &を頭につけると構造体へのポインタになる
	fmt.Println(&person{name: "Ann", age: 40})

	// 構造体の生成をコンストラクタ関数でカプセル化する方法
	fmt.Println(newPerson("John"))

	// ドットを使用してフィールドにアクセスする
	s := person{name: "Sean", age: 50}
	fmt.Println(s.name)

	// 構造体のポインタにもドットを使用できる（ポインタは自動的にでリファレンスされる）
	sp := &s
	fmt.Println(sp.age)

	// 構造体は変更可能（mutable）
	sp.age = 51
	fmt.Println(sp.age)

}
