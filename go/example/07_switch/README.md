### Switch

---

Switch ステートメントは、多くの分岐を持つ条件文を表現する

- 同じ `case` の中で複数の式をカンマ区切りで指定することができる
- `default` ケースを使用することもできる
- 式のない `switch` は、if/else の代替になる
- `case` は定数式とは限らない

```
$ go run switch.go
Write 2 as two
It's the weekend
It's after noon
I'm a bool
I'm an int
Don't know type string
```
