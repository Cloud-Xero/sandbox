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

### 注意点

- エディタが go.work ファイルが存在するディレクトリ（つまり、プロジェクトのルートディレクトリ）を開いていない場合、gopls はモジュールを見つけられず、エラーが発生する)
  - つまり、sandbox/go の階層で VSCode で開く必要がある

### Update go version

```bash
$ brew upgrade go
$ go version
```

- VSCode 画面下の go のバージョンが更新されていない場合は、Go の拡張機能を無効 → 有効にする
- go.work でプロジェクトを管理している場合、各プロジェクトの go のバージョンを統一する必要がある（go.work に記載されたバージョンを使用する必要がある）
  1. 古いバージョンを使用しているプロジェクトの go.mod に記載されているバージョンを更新する（go.work に記載の ver と一致させる）
  2. Go のモジュールキャッシュをクリアする
  ```bash
  $ go clean -modcache
  ```
  3. 各プロジェクトのディレクトリでモジュールの依存関係を更新
  ```bash
  $ go mod tidy
  ```
  4. VSCode の再起動
