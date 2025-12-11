CREATE DATABASE IF NOT EXISTS cashwiz;
USE cashwiz;

CREATE TABLE users (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  role ENUM('admin','user') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_actions (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT NOT NULL,
  action VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO users (email, password_hash, full_name, role)
VALUES (
  'test@test.com',
  '$2b$10$8u9tZF6HrMNtVCgRTQUmVObKcUUDXxl7mcbqu0p4oQmZrvIfMe0QW',
  'Test User',
  'user'
);

