### Closures

---

Go の無名関数はクロージャ
クロージャとは、関数外の環境を持った（閉じ込めた）関数のこと

クロージャによって捕捉された変数の領域はクロージャが実行される限り破棄されない（実行時に変数が初期化されない）

```go
package main

import "fmt"

func Later() func(string) string {
  var store string
  return func(next string) string {
    s := store
    store = next
    return s
  }
}

func main () {
  f := Later()
  fmt.Println(f("Hello"))  //（空）
  fmt.Println(f("My"))  // Hello
  fmt.Println(f("name"))  // My
  fmt.Println(f("is"))  // name
  fmt.Println(f("Golang"))  // is
}

```
