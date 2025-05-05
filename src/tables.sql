drop table loans;
drop table mortgage_loans;
drop table auto_loans;
drop table personal_loans;
drop table student_loans;
drop table users;

create table users (
  user_uuid varchar(30),
  email varchar(40),
  first_name varchar(30),
  last_name varchar(30),
  pass varchar(30),
  role varchar(10),
  primary key (user_uuid)
);

create table loans (
  user_uuid varchar(30),
  loan_status varchar(30),
  loan_type varchar(30),
  loan_uuid varchar(30),
  loan_amount numeric(10,2),
  start_date date,
  end_date date,
  primary key (loan_uuid),
  foreign key (user_uuid) references users
);

create table mortgage_loans (
  loan_uuid varchar(30),
  house_address varchar(40),
  house_area varchar(30),
  number_bedrooms numeric(2,0),
  house_price numeric(10,2),
  interest_rate numeric(6,2),
  amount_paid numeric(10,2),
  number_payments numeric(3,0),
  primary key (loan_uuid)
);

create table auto_loans (
  loan_uuid varchar(30),
  make varchar(30),
  model varchar(30),
  year number(4),
  vin varchar(17) unique,
  interest_rate numeric(6,2),
  amount_paid numeric(10,2),
  number_payments numeric(3,0),
  primary key (loan_uuid)
);

create table personal_loans (
  loan_uuid varchar(30),
  loan_purpose varchar(100),
  interest_rate numeric(6,2),
  amount_paid numeric(10,2),
  number_payments numeric(3,0),
  primary key (loan_uuid)
);

create table student_loans (
  loan_uuid varchar(30),
  loan_term number(2),
  disbursement_date date,
  monthly_payment numeric(10,2),
  grace_period number(3),
  loan_type varchar(50),
  primary key (loan_uuid)
);
