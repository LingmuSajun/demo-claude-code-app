# CLAUDE.md

このファイルは、リポジトリのコードを扱う際に Claude Code (claude.ai/code) へのガイダンスを提供します。

## コマンド

### バックエンド（ルート）
```bash
npm install
npm run dev      # ts-node-dev によるホットリロード
npm run build    # tsc → dist/
npm start        # node dist/index.js
```

### フロントエンド（frontend/）
```bash
cd frontend
npm install
npm run dev      # Vite 開発サーバー
npm run build    # tsc + vite build
```

### Docker（推奨）
```bash
docker compose up --build
```
- フロントエンド: http://localhost:5173
- API: http://localhost:3000

## アーキテクチャ

2つの独立した Node.js プロジェクトで構成されたフルスタック TODO アプリです。

**バックエンド** (`src/index.ts`): `better-sqlite3` を使った SQLite データベースを持つ Express + TypeScript の REST API。DB ファイルは `$DATA_DIR/todos.db` に保存される（デフォルトはカレントディレクトリ）。SQLite の `done` カラムは `INTEGER`（0/1）で、`toTodo()` ヘルパーが JSON レスポンス用に `boolean` へ変換する。

**フロントエンド** (`frontend/src/App.tsx`): Vite でビルドされた単一ファイルの React + TypeScript SPA。すべての API コールは `/api/*` へ送られる。本番環境（Docker）では Nginx が `/api/` を `http://api:3000/` にプロキシする。ローカル開発ではプロキシ設定がないため、バックエンドがポート 3000 で起動している必要がある。

**Docker 構成**: フロントエンドコンテナは Nginx でビルド済み静的ファイルを配信し、`/api/` を `api` サービスにリバースプロキシする。API コンテナは SQLite の永続化のため `/data` に名前付きボリュームをマウントする。

## API

| メソッド | パス         | 説明                              |
|---------|--------------|-----------------------------------|
| GET     | /todos       | TODO 一覧取得                     |
| GET     | /todos/:id   | TODO 1件取得                      |
| POST    | /todos       | 作成（ボディ: `{title}`）          |
| PATCH   | /todos/:id   | 更新（ボディ: `{title?, done?}`）  |
| DELETE  | /todos/:id   | 削除                              |

## 環境変数

| 変数名     | デフォルト | 説明                      |
|-----------|------------|---------------------------|
| `PORT`    | `3000`     | API サーバーのポート番号   |
| `DATA_DIR` | `.`       | SQLite DB の保存ディレクトリ |
