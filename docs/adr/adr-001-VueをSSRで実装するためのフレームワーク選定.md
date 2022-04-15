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
- vite https://ja.vitejs.dev/guide/ssr.html#%E9%96%8B%E7%99%BA%E3%82%B5%E3%83%BC%E3%83%90%E3%81%AE%E3%82%BB%E3%83%83%E3%83%88%E3%82%A2%E3%83%83%E3%83%97
- https://github.com/vitejs/vite/tree/main/packages/playground/ssr-vue
- viteにexpressをのっけるパターン https://scrapbox.io/dojineko/Vite%E3%82%92%E4%BD%BF%E3%81%A3%E3%81%A6Express.js%E3%82%A2%E3%83%97%E3%83%AA%E3%82%92%E4%BD%9C%E3%82%8B
- https://zenn.dev/niaeashes/articles/9cf121b46af2a0