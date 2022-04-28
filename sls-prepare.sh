echo start `date`
npm ci
npm run build -w ssr-server

echo "copy"
cp -rp ssr-server/dist sls/dist

cp package-lock.json sls/package-lock.json
cp ssr-server/package.json sls/package.json

cd sls 
echo "npm ci -production"
npm ci --production

echo end `date`
