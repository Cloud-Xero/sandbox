### 古典的な「hello world」の表示

---

プログラムを実行するには、go run コマンドで実行する

```
$ go run hello-world.go
hello world
```

</br>
</br>

プログラムをバイナリにビルドしたい時は、go build を使用する

```
$ go build hello-world.go
$ ls
hello-world    hello-world.go
```

ビルドしたバイナリを直接実行できる

```
$ ./hello-world
hello world
```
