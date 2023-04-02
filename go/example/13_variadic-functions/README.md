### Variadic Functions（可変長引数関数）

---

- 可変長引数関数では、任意個の引数で呼び出すことができる（fmt.Println は一般的な可変長引数関数）
- 複数の引数をすでにスライスで持っている場合は、func(slice...)の形で可変長引数関数に渡せる

```
$ go run variadic-functions.go
[1 2] 3
[1 2 3] 6
[1 2 3 4] 10
```
