# demo-claude-code-app

シンプルなTODOアプリのデモプロジェクトです。

## 技術スタック

- **バックエンド**: Node.js / Express / TypeScript / better-sqlite3
- **フロントエンド**: React / TypeScript / Vite
- **インフラ**: Docker / Docker Compose / Nginx

## プロジェクト構成

```
.
├── src/
│   └── index.ts          # Express APIサーバー
├── frontend/
│   ├── src/
│   │   ├── App.tsx       # Reactアプリ本体
│   │   └── main.tsx      # エントリーポイント
│   ├── nginx.conf        # Nginxリバースプロキシ設定
│   └── Dockerfile
├── docker-compose.yml
└── Dockerfile
```

## 起動方法

### Docker Compose（推奨）

```bash
docker compose up --build
```

- フロントエンド: http://localhost:5173
- API: http://localhost:3000

### ローカル開発

**バックエンド**

```bash
npm install
npm run dev
```

**フロントエンド**

```bash
cd frontend
npm install
npm run dev
```

## API仕様

| メソッド | パス          | 説明           |
|----------|---------------|----------------|
| GET      | /todos        | TODO一覧取得   |
| GET      | /todos/:id    | TODO1件取得    |
| POST     | /todos        | TODO作成       |
| PATCH    | /todos/:id    | TODO更新       |
| DELETE   | /todos/:id    | TODO削除       |

### リクエスト例

**TODO作成**

```bash
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "買い物をする"}'
```

**TODO完了にする**

```bash
curl -X PATCH http://localhost:3000/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"done": true}'
```

## 環境変数

| 変数名   | デフォルト | 説明                         |
|----------|------------|------------------------------|
| PORT     | 3000       | APIサーバーのポート番号       |
| DATA_DIR | .          | SQLiteデータベースの保存先    |
