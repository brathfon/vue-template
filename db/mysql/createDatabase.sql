DROP DATABASE IF EXISTS vue_template;
CREATE DATABASE IF NOT EXISTS vue_template;
USE vue_template;

DROP USER IF EXISTS 'vue_template_dba'@'localhost';
CREATE USER 'vue_template_dba'@'localhost' IDENTIFIED WITH mysql_native_password BY 'dba_pw';
GRANT ALL ON vue_template.* TO 'vue_template_dba'@'localhost';

DROP USER IF EXISTS 'vue_template_user'@'localhost';
CREATE USER 'vue_template_user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'user_pw';
GRANT SELECT, INSERT, UPDATE, DELETE, EXECUTE ON vue_template.* TO 'vue_template_user'@'localhost';
