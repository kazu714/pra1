# pra1

最小構成の ToDo アプリです。

## 起動

```bash
npm install
npm run dev
```

### もし `dist/index.html` を直接開いて白画面になる場合

Vite のビルド成果物は、`file://` で直接開くよりもローカルサーバー経由で見る方が安定します。

```bash
npm run preview
```

表示された `http://localhost:4173` をブラウザで開いてください。

## GitHub Pages で公開する場合

このリポジトリには、`main` ブランチに push すると `dist` を GitHub Pages に公開するワークフローを入れています。

GitHub 側では `Settings > Pages` で、`Source` を `GitHub Actions` にしてください。

公開先が真っ白になるときは、ほとんどの場合 `src/main.tsx` を直接配信してしまっています。GitHub Pages では必ず `npm run build` の結果である `dist` を配信してください。

## 機能

- ToDo の追加
- 一覧表示
- 編集
- 削除
- 完了 / 未完了の切り替え
- localStorage への保存
