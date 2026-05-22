# Honest — 開発ガイドライン

## プロジェクト概要
「光と影」で自分をさらけ出せるSNS。
最適化された自分ではなく、ありのままの自分を投稿できる場所。

## 技術スタック
- Next.js 14 (App Router)
- TypeScript
- Supabase (Auth + PostgreSQL)
- Tailwind CSS v4

## ディレクトリ構成
```
src/
├── app/             # ルーティング（App Router）
├── components/      # UIコンポーネント
├── hooks/           # カスタムフック
└── lib/
    ├── supabase/    # Supabaseクライアント（client.ts / server.ts）
    └── types.ts     # 型定義
supabase/
└── migrations/      # SQLマイグレーションファイル
```

## 開発ルール

### コンポーネント
- Server Component をデフォルトとし、インタラクションが必要な場合のみ `'use client'` を付与
- コンポーネントはすべて `src/components/` に配置
- ファイル名はPascalCase（例: `PostCard.tsx`）

### Supabaseクライアント
- サーバー側（Server Component / Route Handler）: `@/lib/supabase/server.ts` の `createClient()`
- クライアント側（Client Component）: `@/lib/supabase/client.ts` の `createClient()`

### テーマ
- `ThemeProvider` が `data-mode` 属性を `<html>` に付与
- `light` モード: amber 系カラー
- `shadow` モード: slate 系カラー
- テーマに関わるクラスは条件分岐で直接記述（CSS変数は globals.css に定義）

### 型
- DB型は `src/lib/types.ts` で一元管理
- Supabaseの自動生成型（`supabase gen types`）を使う場合は `src/lib/database.types.ts` に配置

## セットアップ
```bash
cp .env.example .env.local
# .env.local にSupabaseのURL・キーを設定
npm install
npm run dev
```

## マイグレーション適用
Supabaseダッシュボードの SQL Editor、または Supabase CLI で実行:
```bash
supabase db push
```
