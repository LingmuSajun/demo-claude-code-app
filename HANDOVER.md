# プロジェクト引き継ぎ・蓄積ドキュメント

## 1. 現時点のステータス (Latest)
- **最終更新:** 2026-03-23
- **現在の到達点:** フルスタック TODO アプリの初期実装が完了し、Docker Compose で起動可能な状態。フロントエンド(React + Vite)、バックエンド(Express + SQLite)ともに基本的な CRUD 機能が動作する。
- **直近の大きな変更:** 初回 HANDOVER.md の作成（本セッションでのコード変更なし）

## 2. 実装の詳細と試行錯誤 (Current Session)
- **完了タスク:**
  - [x] HANDOVER.md の初回作成
- **解決したバグ/ハマりどころ:** なし（本セッションではコード変更なし）
- **主要な意思決定:** なし

## 3. 次のステップ (Next Action)
- [ ] 具体的な機能追加やバグ修正の要件をユーザーから確認
- [ ] テストの追加（現時点ではテストコードが存在しない）
- [ ] ローカル開発時のプロキシ設定（Vite dev server から API へのプロキシ未設定）

## 4. 累積されたプロジェクトの文脈 (Project History)
- **過去の経緯:**
  - 初期コミットでプロジェクト構造・Docker セットアップ・フロントエンドアプリを構築
  - README にプロジェクト概要・起動方法・API 仕様を追記
  - CLAUDE.md を追加し、Claude Code 向けガイダンスを整備
- **蓄積された知見 (Gotchas):**
  - SQLite の `done` カラムは `INTEGER`(0/1)で、`toTodo()` ヘルパーが JSON レスポンス用に `boolean` へ変換する
  - ローカル開発ではプロキシ設定がないため、バックエンドがポート 3000 で別途起動している必要がある
  - Docker 環境では Nginx が `/api/` を `http://api:3000/` にリバースプロキシする

## 5. 重要ファイルのマップ
- `src/index.ts`: バックエンド Express API サーバー（REST エンドポイント + SQLite 接続）
- `frontend/src/App.tsx`: フロントエンド React SPA（単一ファイル構成）
- `frontend/src/main.tsx`: React エントリーポイント
- `frontend/vite.config.ts`: Vite 設定
- `docker-compose.yml`: Docker Compose 構成（フロントエンド + API）
- `CLAUDE.md`: Claude Code 向けガイダンス

---
*Next Session Instructions:*
このファイルを読み込み、特に「3. 次のステップ」と「4. 累積されたプロジェクトの文脈」を重点的に理解してから作業を開始してください。
