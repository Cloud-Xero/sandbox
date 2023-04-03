### Interfaces

---

Interfaces は、メソッドシグネチャの集まりに名前をつけたもの

型の性質を抽出した interface を定義すると、Go の厳密な型のシステムに柔軟性を与えることができる

```go
package main

import "fmt"


type Stringfy interface {
	ToString() string
}
type Person struct {
	Name string
	Age int
}

func (p *Person) ToString() string {
	return fmt.Sprintf("Name=%v, Age=%v", p.Name, p.Age)
}


type Car struct {
	sNumber string
	Model string
}

func (c *Car) ToString() string {
	return fmt.Sprintf("Number=%v, Model=%v", c.Number, c.Model)
}

func main() {
	// PersonとCarは異なるデータ型のスライスのため、通常はまとめることができないが、共通の性質を持つStringfyという型でスライスとしてまとめて管理できる
	vs := []Stringfy{
		&Person{Name: "Taro", Age: 21},
		&Car{Number: "123-456", Model: "AB-1234"},
	}

	// interfaceで異なるデータ型のスライスをまとめて出力し、共通のメソッドを使用することもできる
	for _, v := range vs {
		fmt.Println(v.ToString())
		// Name=Taro, Age=21
		// Number=123-456, Model=AB-1234
	}
}
```

### カスタムエラー

Go の組み込み型の error が interface として定義されている

```go
type error interface {
	Error() string
}
```

そのため、これを使用することにより、独自のエラーをカスタムエラーとして作成・定義することができる

```go
package main

import "fmt"

type MyError struct {
	Message string
	ErrCode int
}

// Goのソースコードのerrorのinterfaceと共通の性質を持つ型として認識される
func (e *MyError) Error() string {
	return e.Message
}

func RaiseError() error {
	return &MyError{Message: "カスタムエラーが発生しました", ErrCode: 1234}
}

func main() {
	err := RaiseError()
	fmt.Println(err.Error())  // カスタムエラーが発生しました

	e, ok := err.(*MyError)
	if ok {
		fmt.Println(e.ErrCode)  // 1234
	}
}
```

### Stringer

fmt パッケージに定義されている Stringer 型も Interface になっている

```go
type Stringer interface {
	String() string
}
```

以下を Stringer Interface を活用して任意の型の文字列表現をカスタマイズしていく

```go
package main

import "fmt"

type Point struct {
	A int
	B string
}

func main() {
	p := &Point{100, "ABC"}
	fmt.Println(p)  // &{100 ABC}
}
```

String メソッドを定義する

```go
package main

import "fmt"

type Point struct {
	A int
	B string
}

func (p *Point) String() string {
	return fmt.Sprintf("<<%v, %v>>", p.A, p.B)
}

func main() {
	p := &Point{100, "ABC"}
	fmt.Println(p)  // <<100, ABC>>
}
```
