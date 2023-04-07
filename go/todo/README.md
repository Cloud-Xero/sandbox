## 1. config の設定

---

- config フォルダ内に config.go ファイルを作成する

  ```go
  package config
  ```

  これで「config パッケージに属するファイル」ということになる

- ConfigList の構造体を定義する
  ```go
  type ConfigList struct {
    Port      string
    SQLDriver string
    DbName    string
    LogFile   string
  }
  ```
- 外部のパッケージからも呼び出せるように、グローバルに変数宣言する

  ```go
  var Config ConfigList
  ```

- ConfigList に設定するための ini ファイルをルート直下に作成する（config.ini）

  ```ini
  [web]
  port = 8080
  logfile = webapp.log

  [db]
  driver = sqlite3
  name = webapp.sql
  ```

- config.go で ini ファイルを読み込んで値を設定していく
