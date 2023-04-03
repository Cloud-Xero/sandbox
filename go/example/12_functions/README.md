### Functions（関数）

---

```go
package main

import "fmt"

/*
 * 関数
 */

func Plus(x, y int) int {
  return x + y
}

// 返り値が複数の場合
func Div(x, y int) (int, int) {
  q := x / y
  r := x % y
  return q, r
}

// 返り値の変数を指定する場合
func Double(price int) (result int) {
  result = price * 2
  return
}

// 返り値がない場合
func NoReturn() {
  fmt.Println("No Return")
  return
}

// 関数を返す関数
func ReturnFunc() func() {
  return func() {
    fmt.Println("I'm a function")
  }
}

// 関数を引数に取る関数
func CallFunction(f func()) {
  f()
}

func main() {
  i := Plus(1, 2)
  fmt.Println(i)  // 3

  i2, _ := Div(9, 4)
  fmt.Println(i2)  // 2

  i4 := Double(1000)
  fmt.Println(i4)  // 2000

  NoReturn()  // "No Return"


  // 無名関数①
  f := func(x, y int) int {
    return x + y
  }
  i := f(1, 2)
  fmt.Println(i)  // 3


  // 無名関数②（引数を直接渡す場合）
  i2 := func(x, y int) int {
    return x + y
  }(1, 2)

  fmt.Println(i2)  // 3


  f := ReturnFunc()
  f()  // I'm a function


  CallFunction(func() {
    fmt.Println("I'm a function2")  // "I'm a function2"
  })
}
```
