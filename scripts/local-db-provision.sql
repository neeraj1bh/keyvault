CREATE DATABASE keyvaultest;

CREATE USER keyvaultest_dev WITH PASSWORD 'SuperCoolPassword123';

GRANT ALL PRIVILEGES ON DATABASE keyvaultest TO keyvaultest_dev;

-- Additional privileges if necessary
ALTER USER keyvaultest_dev CREATEDB;
