package main

import "fmt"

// int型の引数を持つため、引数は値で渡される
// 呼び出し元の関数とは別のivalコピーを受け取る
func zeroval(ival int) {
	ival = 0
}

// *int型の引数を持つため、intのポインタを受け取る
// *iptrはでリファレンスして、ポインタの指すメモリアドレスから現在の値を取得する
func zeroptr(iptr *int) {
	*iptr = 0
}

func main() {
	i := 1
	fmt.Println("initial:", i)

	zeroval(i)
	fmt.Println("zeroval:", i)

	// &iで、iのメモリアドレス（iへのポインタ）を取得できる
	zeroptr(&i)
	fmt.Println("zeroptr:", i)

	// ポインタは表示することもできる
	fmt.Println("pointer:", &i)
}
