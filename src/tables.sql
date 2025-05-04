create table user (
    uuid default gen_random_uuid() primary key,
    first_name varchar2(30) not null,
    last_name varchar2(30) not null,
    email varchar2(30) not null unique,
    password varchar2(50) not null,
    role varchar2(10) check (role in ('user', 'admin'))
);

create table loan (
    uuid default gen_random_uuid() primary key,
    user_id uuid references user(uuid) on delete cascade,
    loan_date date not null,
    return_date date
)
