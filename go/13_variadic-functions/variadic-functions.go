package main

import "fmt"

// 任意個の int を引数として受け取る関数
func sum(nums ...int) {
	fmt.Print(nums, " ")
	total := 0
	for _, num := range nums {
		total += num
	}
	fmt.Println(total)
}

func main() {
	sum(1, 2)
	sum(1, 2, 3)

	// 複数の引数をすでにスライスとして持っている場合は、func(slice...)の形で渡せる
	nums := []int{1, 2, 3, 4}
	sum(nums...)
}
