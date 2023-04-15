## Google プロバイダーを使い始める

### 始める前に

---

- Google Cloud Console でプロジェクトを作成し、そのプロジェクトで課金を設定します。
  <br>
- Terraform をインストールし、この後の Terraform getting started guide を読んでください。このガイドは Terraform の基本的な習熟を前提としています - Google プロバイダの入門編です。
  <br>
  <br>

### プロバイダーの設定

---

まず、GCP で認証を行います。

最も簡単な方法は、すでに gcloud がインストールされていれば、`gcloud auth application-default login`を実行することです。
まだ持っていない場合は、ここからインストールすることができます。

次に、「main.tf」という名前の Terraform の設定ファイルを作成します。
中には、以下のような設定を入れておきます：

```
provider "google" {
  project = "{{YOUR GCP PROJECT}}"
  region  = "us-central1"
  zone    = "us-central1-c"
}
```

- `project`フィールドは、あなたの個人的なプロジェクト ID でなければなりません。プロジェクトは、すべてのリソースが作成されるデフォルトの GCP プロジェクトを示します。ほとんどの Terraform リソースには`project`フィールドがあります。
  <br>
- `region`と`zone`は、リソースを作成するための場所
  - `region`は、地域リソースのデフォルトの場所を選択するために使用されます。リージョナルリソースは、複数のゾーンにまたがっています。
  - ゾーンは、ゾーナルリソースのデフォルトの場所を選択するために使用されます。ゾーナルリソースは、1 つのゾーンに存在する。すべてのゾーンはリージョンの一部である。
