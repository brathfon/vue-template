DROP DATABASE IF EXISTS dev_vue_template;
CREATE DATABASE IF NOT EXISTS dev_vue_template;
USE dev_vue_template;

DROP USER IF EXISTS 'dev_vue_template_dba'@'localhost';
CREATE USER 'dev_vue_template_dba'@'localhost' IDENTIFIED WITH mysql_native_password BY 'dev_dba_pw';
GRANT ALL ON dev_vue_template.* TO 'dev_vue_template_dba'@'localhost';

DROP USER IF EXISTS 'dev_vue_template_user'@'localhost';
CREATE USER 'dev_vue_template_user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'dev_user_pw';
GRANT SELECT, INSERT, UPDATE, DELETE, EXECUTE ON dev_vue_template.* TO 'dev_vue_template_user'@'localhost';
