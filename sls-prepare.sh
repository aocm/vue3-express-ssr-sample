# npm run build -w ssr-server

# cp -rp ssr-server/dist sls/dist

cp package-lock.json sls/package-lock.json
cp ssr-server/package.json sls/package.json

cd sls 
npm ci --production