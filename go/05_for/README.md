### ループ

---

for は、Go の唯一のループ

- 条件式がない `for` は、`break` でループを抜けるか、`return` によって関数自体から抜けるまでループし続ける
- `continue` でループの次の実行に進むことができる

```
$ go run for.go
1
2
3
7
8
9
loop
1
3
5
```
