### マップ

---

マップは、Go における連想配列のための組み込み型（別の言語ではハッシュや辞書と呼ばれることも）

- 空のマップを作成するには、`make` ビルトイン関数を使用して `make(map[キーの型]値の型)`とする
- `name[key] = val` という記法で、キーと値のペアを設定する
- `delete` ビルトイン関数は、マップからキーと値のペアを削除する

```
$ go run maps.go
map: map[k1:7 k2:13]
v1: 7
len: 2
map: map[k1:7]
prs: false
map: map[bar:2 foo:1]
```

fmt.Println でマップを表示すると、 map[k:v k:v] の形式となる点に注意
