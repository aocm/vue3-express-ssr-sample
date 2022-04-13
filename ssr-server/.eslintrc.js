const rules = { // 0 = off, 1 = warn, 2 = error
  // 参考: https://qiita.com/diggy-mo/items/bb01bcb54237f16bb008
  // 不要なカッコは消す
  'no-extra-parens': 1,
  // 無駄なスペースは削除
  'no-multi-spaces': 2,
  // 不要な空白行は削除。2行開けてたらエラー
  'no-multiple-empty-lines': [2, { 'max': 1 }],
  // 関数とカッコはあけない(function hoge() {/** */})
  'func-call-spacing': [2, 'never'],
  // true/falseを無駄に使うな
  'no-unneeded-ternary': 2,
  // セミコロンは禁止
  'semi': [2, 'never'],
  // 文字列はシングルクオートのみ
  'quotes': [2, 'single'],
  // varは禁止
  'no-var': 2,
  // jsのインデントは２
  'indent': [2, 2],
  // かっこの中はスペースなし！違和感
  'space-in-parens': [2, 'never'],
  // コンソールは許可
  'no-console': 0,
  // カンマの前後にスペース入れる？
  'comma-spacing': 2,
  // 配列のindexには空白入れるな(hogehoge[ x ])
  'computed-property-spacing': 2,
  // キー
  'key-spacing': 2,
  // キーワードの前後には適切なスペースを
  'keyword-spacing': 2,
  // 行末スペース
  'no-trailing-spaces': 2,
  // vue3では問題ないためオフ
  'vue/no-multiple-template-root': 0
}

module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 13,
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.eslint.json']
  },
  extends: [
    'eslint:recommended',
  ],
  rules,
  overrides: [
    // typescript用
    {
      parser: '@typescript-eslint/parser',
      files: ['**/*.ts'],
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 12,
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.eslint.json']
      },
      plugins: [
        '@typescript-eslint',
        'vue'
      ],
      extends: [
        'eslint:recommended',
        'plugin:vue/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      rules,
    },
    // Vue用
    {
      files: ['**/*.vue'],
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 12,
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.eslint.json']
      },
      plugins: [
        'vue'
      ],
      extends: [
        'eslint:recommended',
        'plugin:vue/recommended',
      ],
      rules,
    }
  ]
}