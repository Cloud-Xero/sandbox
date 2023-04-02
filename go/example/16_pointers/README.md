### Pointers（ポインタ）

---

プログラムの中で値やレコードへの参照を渡すことができる

- &i という構文で、i のメモリアドレス（i へのポインタ）を取得でき、ポインタは表示することもできる
- zeroval 関数は main の中の i の値を変更しないが、zeroptr 関数は変更する（この変数のアドレスに対する参照を持つため）

```
$ go run pointers.go
initial: 1
zeroval: 1
zeroptr: 0
pointer: 0xc00001e0e8
```
