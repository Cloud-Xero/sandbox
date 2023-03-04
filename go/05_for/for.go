package main

import "fmt"

func main() {

	// 条件式しかない最も基本的なタイプ
	i := 1
	for i <=3 {
		fmt.Println(i)
		i = i + 1
	}

	// 初期化・条件式・後処理を持つ典型的なループ
	for j := 7; j <= 9; j++ {
		fmt.Println(j)
	}

	// 条件式がないタイプ
	for {
		fmt.Println("loop")
		break
	}

	for n := 0; n <= 5; n++ {
		if n % 2 == 0 {
			continue
		}
		fmt.Println(n)
	}
}
