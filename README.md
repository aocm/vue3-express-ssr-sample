# vue3-express-sample

## 起動方法

### ローカルで開発の仕方
コンテナ内での開発を想定しています。RemoteContainerを利用してもいいですし、シェルをアタッチしてもいいです

コンテナを起動する
```
docker-compose up -d
```

起動したコンテナ内で起動する

- ssrで起動する場合
```
root@b381e6612b66:/usr/src/app/ssr# npm run dev
```

- spaで起動する場合
```
root@b381e6612b66:/usr/src/app/ssr# npm run dev:spa
```

### コンテナにビルドする
- ビルド

```
docker build -f Dockerfile.prod -t vue-express-ssr-image .
```

- イメージから作成

```
docker run -it -p 3001:3000 --name vue-express-ssr vue-express-ssr-image
```

- 起動（2回目）

```
docker start vue-express-ssr
```