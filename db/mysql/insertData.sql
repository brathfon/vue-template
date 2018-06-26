
-- special case for the root user that will have permissions to do all.  Initial root password will be "default"
-- email will be used as the login
INSERT INTO users (first_name, last_name, initials, email, phone_number, salt, hash) values  -- root_pw #1
   ('root', 'root', '99', 'root', null,
    '21ffaf7e294100ea7cd662103044a712',
    'cb08ceb87d462d2779ede7d24e0a8a3be7a37864697c596dfa0e3034c5583b15b1aaecc43a050dd4799701d7282c0b87be38836f9c82b7e9d0079d49c1f2f03b');

INSERT INTO users (first_name, last_name, initials, email, phone_number, salt, hash) values -- guest_pw #2
   ('The', 'Guest', 'G', "guest", null,
   '5f950a935b2d4382334ec79b72331fe2',
   '457388040dd6e2ff354486d0d99edcf046fd4b146ac2dce13e32206f16dad10f516394fc87ee6420bad39dac3543b796e7a57470771fba9817761d3e640be24e');

-- Roles information
INSERT INTO roles (abrv, long_name) VALUES ( 'ADM', 'Administration');
INSERT INTO roles (abrv, long_name) VALUES ( 'DE', 'Data Entry');
INSERT INTO roles (abrv, long_name) VALUES ( 'DV', 'Data Verification');
INSERT INTO roles (abrv, long_name) VALUES ( 'QA', 'Quality Assurance');
INSERT INTO roles (abrv, long_name) VALUES ( 'RO', 'Read Only');   -- in case we want to let someone look at the data as entered


INSERT INTO user_roles (user_id, role_id) VALUES ( 1, 1);  -- initial root user who has admin privileges
INSERT INTO user_roles (user_id, role_id) VALUES ( 1, 2);  -- this value is more for testing, giving root DE privs
INSERT INTO user_roles (user_id, role_id) VALUES ( 2, 5);  -- guest, read only`


INSERT INTO example_data(col_1, the_date, the_time, comments)
VALUES (2000, "2018-06-25", "10:20", "this is some example data");
INSERT INTO example_data(col_1, the_date, the_time, comments)
VALUES (1000, "1954-10-04", "07:10", "somebodies birthday");
