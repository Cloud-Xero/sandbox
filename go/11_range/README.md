### Range

---

Range は、様々なデータ構造の要素を反復処理する

- 配列やスライスに対する range は、各要素に対するインデックスと値の両方を提供する
- マップに対しては、キーと値のペアを反復処理するが、キーだけを反復処理することもできる
- 文字列に対する range は、Unicode コードポイントを反復処理する
  １つ目の値は文字列の先頭からこの文字（rune）までのバイト数を表し、２つ目は rune そのものを表す

```
$ go run range.go
sum: 9
index: 1
a -> apple
b -> banana
key: a
key: b
0 103
1 111
```
