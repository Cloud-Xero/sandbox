go.work ファイルを使用して、一つ以上のモジュールを一つのワークスペースで管理することができる

### init

```bash
$ go work init basics example notion
```

これにより、go.work が生成される
※前提として各プロジェクトフォルダが Go モジュールとして適切に初期化されていること（go.mod が存在していること）

### edit

go.work ファイルを編集するために使用するコマンドは以下
■ 追加

```bash
$ go work edit -use [ディレクトリ名]
```

■ 削除

```bash
$ go work edit -dropuse [ディレクトリ名]
```
