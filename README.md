# MiniBog
- MiniBog được thiết kế :
   - Backend : Theo mô hình MVC + Spring security
   - Font end: redux + actions + recuder để lấy dữ liệu

- Về Backend : chạy trên : http://localhost:8080/miniblog/api
   + Database mẫu đính kèm : (data.sql)
   + File tạo datbase: queryCreateDatabase.sql

- Cấu hình application.properties
   spring.application.name=MiniBlog
   server.servlet.context-path=/miniblog
   app.default-role=ROLE_USER

   #connect database
   spring.jpa.hibernate.ddl-auto=update
   spring.datasource.url=jdbc:mysql://localhost:3306/miniblog
   spring.datasource.username=root
   spring.datasource.password=Admin123@
   spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
   spring.jpa.show-sql: true

- Về client: http://localhost:5173
     + B1: npm install
     + B2: npm run dev

- Các chứng năng chính:
    + Client đăng nhập qua token
    + Client có thể tạo bài viết khi đã đăng nhập, chỉ được phép sửa và xóa bài viết của chính mình
    + Có thể đăng kí, đăng nhập.
    + Có phân trang, tìm kiếm


