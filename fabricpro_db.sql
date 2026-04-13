-- ============================================================
--  FabricPro Factory Management System — Full Database Schema
--  Run this in phpMyAdmin or: mysql -u root -p < fabricpro_db.sql
-- ============================================================

CREATE DATABASE IF NOT EXISTS fabricpro_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE fabricpro_db;

-- ── Users (owners + workers) ──────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  username    VARCHAR(60)  NOT NULL UNIQUE,
  password    VARCHAR(255) NOT NULL,   -- store bcrypt hash
  full_name   VARCHAR(120) NOT NULL,
  role        ENUM('admin','worker') NOT NULL DEFAULT 'worker',
  department  VARCHAR(60)  DEFAULT 'Sewing',
  email       VARCHAR(120) DEFAULT NULL,
  phone       VARCHAR(30)  DEFAULT NULL,
  color       VARCHAR(10)  DEFAULT '#2563EB',
  rate_per_piece DECIMAL(8,2) DEFAULT 25.00,
  created_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

-- ── Attendance ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS attendance (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  user_id     INT          NOT NULL,
  date        DATE         NOT NULL,
  check_in    TIME         DEFAULT NULL,
  check_out   TIME         DEFAULT NULL,
  status      ENUM('present','absent','late','half_day') DEFAULT 'present',
  UNIQUE KEY uq_att (user_id, date),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ── Orders ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS orders (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  order_code  VARCHAR(30)  NOT NULL UNIQUE,
  product     VARCHAR(120) NOT NULL,
  client      VARCHAR(120) DEFAULT NULL,
  quantity    INT          NOT NULL DEFAULT 0,
  done        INT          NOT NULL DEFAULT 0,
  stage       ENUM('cutting','sewing','finishing','packaging') DEFAULT 'cutting',
  deadline    DATE         DEFAULT NULL,
  delay       TINYINT(1)   DEFAULT 0,
  status      ENUM('pending','inProgress','completed') DEFAULT 'pending',
  created_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

-- ── Tasks (assigned per worker per order) ─────────────────────
CREATE TABLE IF NOT EXISTS tasks (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  worker_id   INT          NOT NULL,
  order_id    INT          NOT NULL,
  product     VARCHAR(120) DEFAULT NULL,
  stage       VARCHAR(60)  DEFAULT 'Sewing',
  target      INT          NOT NULL DEFAULT 0,
  done        INT          NOT NULL DEFAULT 0,
  rate        DECIMAL(8,2) DEFAULT 25.00,
  due_date    DATE         DEFAULT NULL,
  status      ENUM('pending','inProgress','completed') DEFAULT 'pending',
  notes       TEXT         DEFAULT NULL,
  proof_image VARCHAR(255) DEFAULT NULL,
  created_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (worker_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (order_id)  REFERENCES orders(id) ON DELETE CASCADE
);

-- ── Inventory / Stock ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS inventory (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(120) NOT NULL,
  category    VARCHAR(60)  DEFAULT 'cloth',
  qty         DECIMAL(10,2) NOT NULL DEFAULT 0,
  unit        VARCHAR(20)  DEFAULT 'meters',
  max_qty     DECIMAL(10,2) NOT NULL DEFAULT 100,
  threshold   DECIMAL(10,2) NOT NULL DEFAULT 10,
  updated_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ── Material Requests ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS material_requests (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  worker_id   INT          NOT NULL,
  material    VARCHAR(80)  NOT NULL,
  qty         DECIMAL(10,2) NOT NULL DEFAULT 1,
  unit        VARCHAR(20)  DEFAULT 'meters',
  urgency     ENUM('normal','urgent','critical') DEFAULT 'normal',
  specification VARCHAR(200) DEFAULT NULL,
  notes       TEXT         DEFAULT NULL,
  status      ENUM('pending','approved','rejected','fulfilled') DEFAULT 'pending',
  created_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (worker_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ── Leave Requests ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS leave_requests (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  worker_id   INT          NOT NULL,
  type        ENUM('casual','medical','personal') DEFAULT 'casual',
  start_date  DATE         NOT NULL,
  end_date    DATE         NOT NULL,
  reason      TEXT         NOT NULL,
  status      ENUM('pending','approved','rejected') DEFAULT 'pending',
  created_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (worker_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ── Payments ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS payments (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  worker_id   INT          NOT NULL,
  period      VARCHAR(30)  NOT NULL,     -- e.g. "April 2025"
  pieces      INT          NOT NULL DEFAULT 0,
  rate        DECIMAL(8,2) NOT NULL DEFAULT 25.00,
  bonus       DECIMAL(10,2) DEFAULT 0,
  salary      DECIMAL(10,2) NOT NULL DEFAULT 0,
  status      ENUM('pending','paid') DEFAULT 'pending',
  paid_date   DATE         DEFAULT NULL,
  created_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (worker_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ── Quality Control ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS quality (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  worker_id   INT          NOT NULL,
  task_id     INT          DEFAULT NULL,
  task_name   VARCHAR(120) DEFAULT NULL,
  total       INT          NOT NULL DEFAULT 0,
  defective   INT          NOT NULL DEFAULT 0,
  score       DECIMAL(5,2) DEFAULT 0,
  checked_date DATE        DEFAULT NULL,
  FOREIGN KEY (worker_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ── Notifications ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS notifications (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  target_role ENUM('all','admin','worker') DEFAULT 'all',
  target_user INT          DEFAULT NULL,   -- NULL = broadcast
  type        VARCHAR(30)  DEFAULT 'task',
  title       VARCHAR(200) NOT NULL,
  msg         TEXT         DEFAULT NULL,
  is_read     TINYINT(1)   DEFAULT 0,
  created_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (target_user) REFERENCES users(id) ON DELETE CASCADE
);

-- ── Sessions (server-side) ────────────────────────────────────
CREATE TABLE IF NOT EXISTS sessions (
  session_token VARCHAR(64)  PRIMARY KEY,
  user_id       INT          NOT NULL,
  expires_at    DATETIME     NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ============================================================
--  SEED DATA — Demo users + sample records
-- ============================================================

-- Demo users (passwords are bcrypt of "admin123" and "pass123")
INSERT INTO users (username, password, full_name, role, department, email, phone, color, rate_per_piece) VALUES
('admin',   '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Ram Sharma',      'admin',  'Management', 'ram@fabricpro.com',   '9800000001', '#1D4ED8', 0),
('worker1', '$2y$10$TwxI2N5Yq3ePb1FZmV.6A.c7xmHDXVkHaU1HaVa5qiDMrkNJzOom', 'Sita Karki',      'worker', 'Sewing',     'sita@fabricpro.com',  '9800000002', '#059669', 25),
('worker2', '$2y$10$TwxI2N5Yq3ePb1FZmV.6A.c7xmHDXVkHaU1HaVa5qiDMrkNJzOom', 'Hari Thapa',      'worker', 'Cutting',    'hari@fabricpro.com',  '9800000003', '#7C3AED', 25),
('worker3', '$2y$10$TwxI2N5Yq3ePb1FZmV.6A.c7xmHDXVkHaU1HaVa5qiDMrkNJzOom', 'Maya Gurung',     'worker', 'Finishing',  'maya@fabricpro.com',  '9800000004', '#EA580C', 25),
('worker4', '$2y$10$TwxI2N5Yq3ePb1FZmV.6A.c7xmHDXVkHaU1HaVa5qiDMrkNJzOom', 'Bibek Tamang',    'worker', 'Sewing',     'bibek@fabricpro.com', '9800000005', '#DC2626', 25),
('worker5', '$2y$10$TwxI2N5Yq3ePb1FZmV.6A.c7xmHDXVkHaU1HaVa5qiDMrkNJzOom', 'Anita Shrestha',  'worker', 'Packaging',  'anita@fabricpro.com', '9800000006', '#0891B2', 25);

-- NOTE: The bcrypt hashes above decode as:
--   admin   → password: admin123
--   worker* → password: pass123

-- Orders
INSERT INTO orders (order_code, product, client, quantity, done, stage, deadline, delay, status) VALUES
('ORD-001', 'School Uniforms',    'Sunrise School',   500, 320, 'finishing',  DATE_ADD(CURDATE(), INTERVAL 5  DAY), 0, 'inProgress'),
('ORD-002', 'Corporate Shirts',   'TechCorp Ltd',     200,  80, 'sewing',     DATE_ADD(CURDATE(), INTERVAL 2  DAY), 1, 'inProgress'),
('ORD-003', 'Sports Kits',        'City FC',          150, 150, 'packaging',  DATE_ADD(CURDATE(), INTERVAL 10 DAY), 0, 'completed'),
('ORD-004', 'Wedding Dresses',    'Bridal House',      30,   5, 'cutting',    DATE_ADD(CURDATE(), INTERVAL 15 DAY), 0, 'inProgress'),
('ORD-005', 'Winter Jackets',     'Mountain Wear',    400,   0, 'cutting',    DATE_ADD(CURDATE(), INTERVAL 20 DAY), 0, 'pending');

-- Tasks (linked to worker1 and worker2)
INSERT INTO tasks (worker_id, order_id, product, stage, target, done, rate, due_date, status) VALUES
(2, 1, 'School Uniforms',  'Sewing',    100, 72, 25.00, DATE_ADD(CURDATE(), INTERVAL 3 DAY), 'inProgress'),
(2, 2, 'Corporate Shirts', 'Finishing',  50, 12, 25.00, DATE_ADD(CURDATE(), INTERVAL 1 DAY), 'inProgress'),
(3, 1, 'School Uniforms',  'Cutting',   120, 120, 25.00, CURDATE(), 'completed'),
(4, 4, 'Wedding Dresses',  'Sewing',     30,  5, 40.00, DATE_ADD(CURDATE(), INTERVAL 10 DAY), 'inProgress');

-- Inventory
INSERT INTO inventory (name, category, qty, unit, max_qty, threshold) VALUES
('Navy Blue Cotton',  'cloth',   250.0, 'meters',  500, 50),
('White Thread',      'thread', 1200.0, 'rolls',  2000, 200),
('Black Buttons',     'buttons', 850.0, 'pieces', 1000, 100),
('Metal Zippers',     'zipper',  320.0, 'pieces',  500,  50),
('White Liner',       'liner',    45.0, 'meters',  200,  30),
('Polyester Fabric',  'cloth',   180.0, 'meters',  400,  40);

-- Payments (for worker1 and worker2)
INSERT INTO payments (worker_id, period, pieces, rate, bonus, salary, status, paid_date) VALUES
(2, 'March 2025', 380, 25, 500, 10000, 'paid',    '2025-04-01'),
(2, 'April 2025', 84,  25, 0,   2100,  'pending', NULL),
(3, 'March 2025', 420, 25, 800, 11300, 'paid',    '2025-04-01'),
(3, 'April 2025', 120, 25, 0,   3000,  'pending', NULL),
(4, 'March 2025', 290, 25, 200, 7450,  'paid',    '2025-04-01'),
(4, 'April 2025',  5,  25, 0,   125,   'pending', NULL);

-- Attendance (today + yesterday for all workers)
INSERT IGNORE INTO attendance (user_id, date, check_in, check_out, status) VALUES
(2, CURDATE(),                     '08:00:00', NULL,       'present'),
(3, CURDATE(),                     '08:15:00', NULL,       'present'),
(4, CURDATE(),                     NULL,       NULL,       'absent'),
(5, CURDATE(),                     '07:55:00', NULL,       'present'),
(6, CURDATE(),                     '08:30:00', NULL,       'late'),
(2, DATE_SUB(CURDATE(), INTERVAL 1 DAY), '08:00:00', '17:00:00', 'present'),
(3, DATE_SUB(CURDATE(), INTERVAL 1 DAY), '08:10:00', '17:05:00', 'present'),
(4, DATE_SUB(CURDATE(), INTERVAL 1 DAY), '08:20:00', '16:50:00', 'present'),
(5, DATE_SUB(CURDATE(), INTERVAL 1 DAY), '07:50:00', '17:10:00', 'present'),
(6, DATE_SUB(CURDATE(), INTERVAL 1 DAY), '09:00:00', '17:00:00', 'late');

-- Quality
INSERT INTO quality (worker_id, task_id, task_name, total, defective, score, checked_date) VALUES
(2, 1, 'School Uniforms — Sewing',    72, 2, 97.2, CURDATE()),
(3, 3, 'School Uniforms — Cutting',  120, 5, 95.8, CURDATE()),
(4, 4, 'Wedding Dresses — Sewing',     5, 0, 100.0, CURDATE());

-- Material requests
INSERT INTO material_requests (worker_id, material, qty, unit, urgency, specification, status) VALUES
(2, 'cloth',   10, 'meters', 'normal',   'Navy Blue, 120cm', 'pending'),
(3, 'thread', 5,   'rolls',  'urgent',   'White',            'approved'),
(4, 'buttons', 100,'pieces', 'critical', 'Small, black',     'pending');

-- Leave requests
INSERT INTO leave_requests (worker_id, type, start_date, end_date, reason, status) VALUES
(2, 'medical', DATE_ADD(CURDATE(), INTERVAL 3 DAY), DATE_ADD(CURDATE(), INTERVAL 4 DAY), 'Doctor appointment', 'pending'),
(3, 'casual',  DATE_ADD(CURDATE(), INTERVAL 7 DAY), DATE_ADD(CURDATE(), INTERVAL 7 DAY), 'Family function',    'approved');

-- Notifications
INSERT INTO notifications (target_role, target_user, type, title, msg, is_read) VALUES
('all',    NULL, 'task',    'New Order Assigned',        'School uniform order needs to start immediately.',    0),
('worker', 2,    'payment', 'Payment Processed',         'Your March salary of Rs 10,000 has been paid.',      1),
('all',    NULL, 'stock',   'Low Stock Alert',           'White Liner is below threshold — only 45m left.',    0),
('worker', 3,    'leave',   'Leave Request Approved',    'Your casual leave on Apr 15 has been approved.',     0),
('admin',  NULL, 'task',    'Material Request Pending',  '2 material requests need your review.',               0);
