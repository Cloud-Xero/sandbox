package main

import (
	"fmt"
	"math"
)

// 図形に対する基本的なインターフェース
type geometry interface {
	area() float64
	perim() float64
}

// rect型とcircle型でインターフェースを実装してみる
type rect struct {
	width, height float64
}
type circle struct {
	radius float64
}

// rect に対して geometry を実装
func (r rect) area() float64 {
	return r.width * r.height
}
func (r rect) perim() float64 {
	return 2*r.width + 2*r.height
}

// circle に対して geometry を実装
func (c circle) area() float64 {
	return math.Pi * c.radius * c.radius
}
func (c circle) perim() float64 {
	return 2 * math.Pi * c.radius
}

// 引数がインタフェース型なので、メソッドを呼ぶことができる
func measure(g geometry) {
	fmt.Println(g)
	fmt.Println(g.area())
	fmt.Println(g.perim())
}

// circle, rect 構造体は geometry インターフェースを実装するため、これらのインスタンスを measure 関数の引数として使用できる
func main() {
	r := rect{width: 3, height: 4}
	c := circle{radius: 5}

	measure(r)
	measure(c)
}

/**
$ go run interfaces.go
{3 4}
12
14
{5}
78.53981633974483
31.41592653589793
*/
