# Board Game Hub - Web2 Project

Đây là đồ án môn học Web, một nền tảng giải trí trực tuyến cung cấp nhiều trò chơi cờ bàn (board games), tích hợp hệ thống quản lý người dùng, kết bạn, nhắn tin, bảng xếp hạng và hệ thống thành tựu (achievements).

## 🚀 Tính năng chính

* **Xác thực:** Đăng ký, đăng nhập an toàn.
* **Trò chơi:** Thư viện đa dạng các game (TicTacToe, Caro, Snake, Match3, Memory, v.v.).
* **Xã hội:** Hệ thống kết bạn và nhắn tin giữa người dùng.
* **Bảng xếp hạng & Thành tựu:** Lưu trữ điểm số, xếp hạng người chơi và hệ thống danh hiệu cá nhân.
* **Quản trị:** Trang Admin Dashboard để quản lý người dùng và trò chơi.
* **Tài liệu API:** Tích hợp Swagger UI để tra cứu endpoint trực tiếp trên hệ thống.

## 🛠 Công nghệ sử dụng

### Backend
* **Runtime:** Node.js & Express.js
* **Cơ sở dữ liệu:** PostgreSQL
* **Query Builder:** Knex.js (Quản lý Migration & Seed)
* **API Docs:** Swagger UI
* **Bảo mật:** JWT Authentication, API Key Middleware, Admin Role.

### Frontend
* **Framework:** React 19 (Vite)
* **Styling:** Tailwind CSS (v4)
* **State Management:** Zustand
* **Routing:** React Router DOM
* **HTTP Client:** Axios

## ⚙️ Hướng dẫn cài đặt

### Yêu cầu
* Node.js (v18+)
* PostgreSQL

### 1. Thiết lập Backend
1. Di chuyển vào thư mục backend: 
   `cd backend`
2. Cài đặt các gói phụ thuộc: 
   `npm install`
3. Cấu hình file `.env` (copy từ `.env.example` và thiết lập `DATABASE_URL`).
4. Chạy migration để tạo bảng: 
   `npx knex migrate:latest`
5. Chạy seed để nạp dữ liệu mẫu: 
   `npx knex seed:run`
6. Khởi chạy server: 
   `npm run dev`

### 2. Thiết lập Frontend
1. Di chuyển vào thư mục frontend: 
   `cd frontend`
2. Cài đặt các gói phụ thuộc: 
   `npm install`
3. Khởi chạy dự án: 
   `npm run dev`

## 📚 Tài liệu API
Khi backend đang chạy, bạn có thể truy cập tài liệu API tại:
`http://localhost:<PORT>/api-docs`

## 📂 Cấu trúc dự án
```text
/backend
  ├── db/              # Knex migrations & seeds
  ├── src/
  │   ├── controllers/ # Logic xử lý API
  │   ├── models/      # Tương tác CSDL
  │   └── routes/      # Định nghĩa endpoints
  └── app.js           # Khởi chạy Express
/frontend
  ├── src/
  │   ├── components/  # Game components & Common UI
  │   ├── pages/       # Admin & Client pages
  │   └── services/    # API calls
  └── vite.config.js   # Cấu hình Vite
