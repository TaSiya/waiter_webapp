
create table employee_table(
    id serial primary key not null,
    employee varchar(50) not null,
    passcode int not null,
    work_days int not null
)

-- create table weekdays(
--     week_id serial primary key not null,
--     week varchar(50) not null,
--     colour varchar(50) not null,
--     employee_id int not null,
--     FOREIGN key  (employee_id) REFERENCES employee_table(id)
-- )