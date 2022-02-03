CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS 'pgcrypt'

CREATE TABLE IF NOT EXISTS aplication_user(
    uuid uuid DEFAULT uuid_generate_v4(),
    userName varchar(60) not null,
    password varchar(40) not null,
    PRIMARY KEY(uuid)
);


insert into
    aplication_user(userName, password)
VALUES
    ("Danilo", crypt(`senha`,`my_salt`))