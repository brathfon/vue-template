DROP DATABASE IF EXISTS vue_template;
CREATE DATABASE IF NOT EXISTS vue_template;
USE vue_template;

DROP USER IF EXISTS 'vue_template_dba'@'localhost';
CREATE USER 'vue_template_dba'@'localhost' IDENTIFIED BY 'dba_pw';
GRANT ALL ON vue_template.* TO 'vue_template_dba'@'localhost';

DROP USER IF EXISTS 'vue_template_user'@'localhost';
CREATE USER 'vue_template_user'@'localhost' IDENTIFIED BY 'user_pw';
GRANT SELECT, INSERT, UPDATE, DELETE, EXECUTE ON vue_template.* TO 'vue_template_user'@'localhost';
