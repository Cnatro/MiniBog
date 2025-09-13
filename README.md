# MiniBog

**MiniBog** là một ứng dụng blog nhỏ được xây dựng với các công nghệ hiện đại, hỗ trợ quản lý bài viết và phân quyền người dùng.  

## Kiến trúc
- **Backend:** Spring Boot theo mô hình MVC, tích hợp Spring Security cho xác thực và phân quyền.  
- **Frontend:** Sử dụng Redux kết hợp Actions và Reducers để quản lý trạng thái và lấy dữ liệu từ API.  

---

## Backend
- API chạy trên: `http://localhost:8080/miniblog/api`  
- **Database:**  
  - File dữ liệu mẫu: `data.sql`  
  - Script tạo database: `queryCreateDatabase.sql`  

- **Cấu hình `application.properties`:**
```properties
spring.application.name=MiniBlog
server.servlet.context-path=/miniblog
app.default-role=ROLE_USER

# Kết nối database
spring.jpa.hibernate.ddl-auto=update
spring.datasource.url=jdbc:mysql://localhost:3306/miniblog
spring.datasource.username=root
spring.datasource.password=Admin123@
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.show-sql=true

- Chạy ứng dụng Spring Boot:
   - Cài đặt Maven: Download Maven (https://dlcdn.apache.org/maven/maven-4/4.0.0-rc-4/binaries/apache-maven-4.0.0-rc-4-bin.zip)
   - Kiểm tra cài đặt: mvn -v
   - Di chuyển vào thư mục dự án: cd D:\**\MiniBog
   - Chạy ứng dụng: mvn spring-boot:run

- Frontend
   - URL chạy client: http://localhost:5173
   - Các bước:
      - Cài đặt dependencies: npm install
      - Khởi động client: npm run dev

- Các chức năng chính
   - Đăng nhập bằng token (JWT).
   - Tạo, sửa, xóa bài viết (chỉ được phép thao tác trên bài viết của chính mình).
   - Hệ thống đăng ký và phân quyền chi tiết (mỗi vai trò có thể có nhiều quyền).
   - Hỗ trợ phân trang và tìm kiếm bài viết.

Đăng nhập test:
  - Client:
      + email : test1@gmail.com
        password : Admin123@
  - Admin:
      + email: admin@gmail.com
      password: Admin123@
