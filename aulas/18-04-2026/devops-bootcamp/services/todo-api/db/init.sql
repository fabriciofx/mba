create table if not exists todos (
  id serial primary key,
  title text not null,
  done boolean not null default false
);
