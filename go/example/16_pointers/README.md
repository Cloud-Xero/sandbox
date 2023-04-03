### Pointers（ポインタ）

---

ポインタとは、値型に分類されるデータ構造（基本型、参照型、構造体）のメモリ上のアドレスと型の情報のこと

Go ではこれを使用して、データ構造を間接的に参照、操作することができる

スライスやマップ、チャネルなどの参照型のデータ型は元々この機能を含んでいる
基本的には関数で渡す時は参照渡しになる

```go
package main

import "fmt"

func Double(i int) {
  i = i * 2
}

func Double2(i *int) {
  *i = *i * 2
}

func Double3(s []int) {
  for i, v := range s {
    s[i] = v * 2
  }
}

func main() {
  var n int = 100
  fmt.Println(n)  // 100

  // メモリのアドレスを表示
  fmt.Println(&n)  // 0xc00001e0f8（100 のメモリ上のアドレス ＝ ポインタ）

  Double(n)  // 100（コピーされたnに対して2倍して代入しているため、元の値は変わらず100）

  // *を使用して定義することで、ポインタ型（メモリのアドレス）を宣言することができる（参照渡し）
  var p *int = &n  // &のことをアドレス演算子と呼ぶ
  fmt.Println(p)  // 0xc000096018（nとpのアドレスが同じになる）
  fmt.Println(*p)  // 100（*をつけるとpの実体が表示される = デリファレンス）

  // *p = 300
  // fmt.Println(n)  // 300（同じアドレスなので、pが変わるとnも変更される）
  // n = 200
  // fmt.Println(*p)  // 200

  Double2(&n)
  fmt.Println(n)  // 200（関数で値を更新することができる）

  Double2(p)
  fmt.Println(*p)  // 400

  // 参照型のデータは元々参照渡しの機能を持っているため、ポインタ型を使用しなくても書き換え可能
  var sl []int = []int{1, 2, 3}  // 参照型のデータ構造を定義
  Double3(sl)
  fmt.Println(sl)  // [2, 4, 6]
}
```
