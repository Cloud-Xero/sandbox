## Guide

1. Get Credentials
2. [Quickstart for PDF Extract API (Node.js)](https://developer.adobe.com/document-services/docs/overview/pdf-extract-api/quickstarts/nodejs/)

## What (by ChatGPT)

この Node.js コードは Adobe の PDF Services API を使用して PDF からテキスト情報を抽出し、結果を ZIP ファイルとして保存し、その ZIP ファイルを開いて特定のテキスト（パスが"/H1"で終わるテキスト）をコンソールに出力するという処理を行っています。

具体的には次のような処理を行っています：

1. Adobe の PDF Services API のモジュールと、ファイル操作のためのモジュール(fs)、ZIP ファイル操作のためのモジュール(AdmZip)をロードします。
2. ファイルパスを指定します。OUTPUT_ZIP には出力先の ZIP ファイルのパスを、INPUT_PDF には入力となる PDF ファイルのパスを指定します。
3. OUTPUT_ZIP で指定したファイルがすでに存在していた場合は、それを削除します。
4. Adobe の PDF Services API の認証情報を"pdfservices-api-credentials.json"というファイルから読み込み、それをもとに ExecutionContext を作成します。ExecutionContext は API の実行環境を定義します。
5. 入力ファイル（INPUT_PDF）から FileRef（ファイルへの参照）を作成し、これを抽出操作(extractPDFOperation)にセットします。
6. 抽出する要素としてテキストを指定するオプションを作成し、これを抽出操作(extractPDFOperation)にセットします。
7. 抽出操作(extractPDFOperation)を実行します。この操作は非同期で行われ、Promise を返します。
8. 抽出操作の結果（result）を OUTPUT_ZIP というファイル名で保存します。
9. 保存した ZIP ファイルを開き、"structuredData.json"という名前のファイルからテキストデータを読み込みます。
10. 読み込んだテキストデータ（jsondata）を JSON 形式として解析し、その結果を data という変数に保存します。
11. data.elements.forEach を使用して、各要素に対して処理を行います。要素の Path が"/H1"で終わっている場合、そのテキストをコンソールに出力します。
12. 何かしらのエラーが発生した場合は、そのエラー情報をコンソールに出力します。

PDF からの情報抽出は、PDF の内容を解析し、特定の情報を抽出するために使用されます。このコードでは、PDF からテキスト情報を抽出し、その結果を ZIP ファイルに保存しています。その後、その ZIP ファイルから特定の情報（パスが"/H1"で終わるテキスト）を抽

出してコンソールに出力しています。

Adobe の PDF Services API は、PDF の生成、変換、操作などを提供するクラウドベースの API です。このコードでは、その中の一つである Extract PDF API を使用して PDF からテキスト情報を抽出しています。

```bash
$ node extract.js
No logging configuration. Using default config
2023-06-16T17:28:30.897:[INFO]: All validations successfully done. Beginning Extract Pdf operation execution
2023-06-16T17:28:41.238:[INFO]: Extract PDF Operation successfully completed
2023-06-16T17:28:42.031:[INFO]: Moving the file from temporary location /private/var/folders/4c/rdpwtgf12gqcbm8mqjnvsy_40000gp/T/pdfServicesSdkResult/ybkXsywxcP0Z.zip to ./ExtractTextInfoFromPDF.zip.
Successfully extracted information from PDF.
Structured Information Output Format
Introduction
List of key components
```
