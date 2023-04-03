### Methods

---

Go は構造体に定義するメソッドをサポートしている
メソッドは特定の型に関連づけられた関数のことを指し、その型のインスタンス（オブジェクト）に対して操作を実行するために使用される

以下のような構造を持つ

```
func (レシーバ名 レシーバ型) メソッド名(引数1 型1, 引数2 型2, ...) 戻り値の型 {
  // 処理
  return 戻り値
}
```

メソッドは、通常の関数と同様に定義されるが、レシーバと呼ばれる特別なパラメータが追加されている
レシーバは、メソッドが関連付けられた型のインスタンスを参照する

```go
package main

import "fmt"

// 構造体の定義
type Circle struct {
	radius float64
}

// Circle構造体に関連付けられたメソッド
func (c Circle) area() float64 {
	return 3.14 * c.radius * c.radius
}

func main() {

	// Circle構造体のインスタンスを作成
	myCircle := Circle{radius: 5}

	// Circle構造体に関連付けられたメソッドを呼び出す
	circleArea := myCircle.area()
	fmt.Println("Circle area:", circleArea)  // Circle area: 78.5

}
```
