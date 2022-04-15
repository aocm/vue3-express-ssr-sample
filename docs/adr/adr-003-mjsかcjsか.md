# mjsかcjsか
2022-4-15

## 概要
commonjsかes moduleを使うか決める

## コンテキスト
Vue+TypeScript+ViteではESModuleで書かれているため、合わせたい

## 決定
babelを用いて、ExpressもESModuleに変更する

## ステータス
### 2022-04-15 決定済み


## 結果
- すべてESModuleに変更する
- babelを用いる

## 参考
- https://qiita.com/kaba/items/9e1347613a4bd63594b4
- https://mseeeen.msen.jp/express-for-es6/
- https://zenn.dev/yodaka/articles/596f441acf1cf3
- https://qiita.com/rooooomania/items/4c999d93ae745e9d8657