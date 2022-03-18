CREATE TABLE census (
 case_id SERIAL PRIMARY KEY,
 REGION VARCHAR (255),
 DISTRICT INTEGER,
 DISTCODE VARCHAR (255),
 TA_NAME VARCHAR (255),
 EACODE INTEGER,
 TOTAL_POP INTEGER (255),
 MALE INTEGER,
 FEMALE INTEGER,
 HOUSEHOLDS INTEGER,
 HH_SIZE FLOAT,
);

CREATE TABLE covid (
 id SERIAL PRIMARY KEY,
 Country VARCHAR (255),
 Lat FLOAT,
 Long FLOAT,
 cases FLOAT,
 date DATE
);


DROP TABLE IF EXISTS employees;

CREATE TABLE employees (
	employee_id serial PRIMARY KEY,
	first_name VARCHAR (255),
	last_name VARCHAR (355),
	birth_date DATE NOT NULL,
	hire_date DATE NOT NULL
);

INSERT INTO employees (first_name, last_name, birth_date, hire_date)
VALUES ('Shannon','Freeman','1980-01-01','2005-01-01'),
	   ('Sheila','Wells','1978-02-05','2003-01-01'),
	   ('Ethel','Webb','1975-01-01','2001-01-01');