-- ハッシュタグシステム

create type hashtag_mode as enum ('light', 'shadow');

-- hashtags
create table hashtags (
  id          uuid default gen_random_uuid() primary key,
  name        text not null,
  mode        hashtag_mode not null,
  created_at  timestamptz default now(),
  unique(name, mode)
);

-- ユーザーのフォロータグ
create table user_hashtags (
  user_id     uuid references profiles(id) on delete cascade not null,
  hashtag_id  uuid references hashtags(id) on delete cascade not null,
  created_at  timestamptz default now(),
  primary key (user_id, hashtag_id)
);

-- タグごとのルーム（タグ登録時に自動生成）
create table rooms (
  id          uuid default gen_random_uuid() primary key,
  hashtag_id  uuid references hashtags(id) on delete cascade not null,
  mode        hashtag_mode not null,
  created_at  timestamptz default now(),
  unique(hashtag_id)
);

-- ルームメンバー
create table room_members (
  room_id     uuid references rooms(id) on delete cascade not null,
  user_id     uuid references profiles(id) on delete cascade not null,
  joined_at   timestamptz default now(),
  primary key (room_id, user_id)
);

-- RLS
alter table hashtags    enable row level security;
alter table user_hashtags enable row level security;
alter table rooms       enable row level security;
alter table room_members enable row level security;

create policy "hashtags_select"       on hashtags      for select using (true);
create policy "user_hashtags_select"  on user_hashtags for select using (auth.uid() = user_id);
create policy "user_hashtags_insert"  on user_hashtags for insert with check (auth.uid() = user_id);
create policy "user_hashtags_delete"  on user_hashtags for delete using (auth.uid() = user_id);
create policy "rooms_select"          on rooms         for select using (true);
create policy "room_members_select"   on room_members  for select using (true);
create policy "room_members_insert"   on room_members  for insert with check (auth.uid() = user_id);
create policy "room_members_delete"   on room_members  for delete using (auth.uid() = user_id);

-- シードデータ
insert into hashtags (name, mode) values
  ('仕事',    'light'), ('恋愛',    'light'), ('家族',    'light'), ('お金',    'light'),
  ('健康',    'light'), ('将来',    'light'), ('人間関係', 'light'), ('趣味',    'light'),
  ('仕事',    'shadow'), ('人間関係', 'shadow'), ('将来',   'shadow'), ('恋愛',   'shadow'),
  ('家族',    'shadow'), ('お金',    'shadow'), ('健康',   'shadow'), ('趣味',   'shadow');

-- タグごとにルームを自動作成
insert into rooms (hashtag_id, mode)
select id, mode from hashtags;
