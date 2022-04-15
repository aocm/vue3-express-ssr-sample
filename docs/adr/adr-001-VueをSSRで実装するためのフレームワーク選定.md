# VueをSSRで実装するためのフレームワーク選定
2022-4-14

## 概要
このプロジェクトでのフレームワークの利用理由について整理する

## コンテキスト
VueでSSRをしたことがないので、VueでSSRができる組み合わせを考える。  
viteにvueとexpressを乗っけるか、expressにvite+vueを乗っけるか考えたとき前者じゃないとSSRができないと判断。

### 他に考えた候補
- vue+webpack→viteを使いたいため除外
- nuxt3 →別で試しているので除外


## 決定
ViteでビルドしたVueをExpressに搭載する


## ステータス
### 2022-04-14 決定済み


## 結果
- vue3 + viteはviteのcliで作成する(TypeScript)
- expressにVueのSSRを搭載する

## 参考
