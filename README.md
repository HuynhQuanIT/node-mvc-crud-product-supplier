# Product & Supplier Management System

Hệ thống quản lý sản phẩm và nhà cung cấp được xây dựng với Node.js, MongoDB, và Mongoose theo kiến trúc MVC.

## Tính năng

### Quản lý Nhà cung cấp (Suppliers)
- ✅ Xem danh sách nhà cung cấp
- ✅ Thêm nhà cung cấp mới
- ✅ Chỉnh sửa thông tin nhà cung cấp
- ✅ Xem chi tiết nhà cung cấp và sản phẩm liên quan
- ✅ Xóa nhà cung cấp (chỉ khi không có sản phẩm)

### Quản lý Sản phẩm (Products)
- ✅ Xem danh sách sản phẩm
- ✅ Thêm sản phẩm mới
- ✅ Chỉnh sửa thông tin sản phẩm
- ✅ Xem chi tiết sản phẩm và nhà cung cấp
- ✅ Xóa sản phẩm

## Cấu trúc dự án

```
node-mvc-crud-product-supplier/
├── app.js                      # File chính của ứng dụng
├── package.json               # Dependencies và scripts
├── .env                       # Cấu hình môi trường
├── seed.js                    # Script tạo dữ liệu mẫu
├── models/
│   ├── Supplier.js           # Model nhà cung cấp
│   └── Product.js            # Model sản phẩm
├── controllers/
│   ├── supplierController.js # Controller nhà cung cấp
│   └── productController.js  # Controller sản phẩm
├── routes/
│   ├── supplierRoutes.js     # Routes nhà cung cấp
│   └── productRoutes.js      # Routes sản phẩm
├── views/
│   ├── partials/
│   │   ├── header.ejs        # Header template
│   │   └── footer.ejs        # Footer template
│   ├── suppliers/
│   │   ├── index.ejs         # Danh sách nhà cung cấp
│   │   ├── new.ejs           # Form thêm nhà cung cấp
│   │   ├── edit.ejs          # Form chỉnh sửa nhà cung cấp
│   │   └── show.ejs          # Chi tiết nhà cung cấp
│   ├── products/
│   │   ├── index.ejs         # Danh sách sản phẩm
│   │   ├── new.ejs           # Form thêm sản phẩm
│   │   ├── edit.ejs          # Form chỉnh sửa sản phẩm
│   │   └── show.ejs          # Chi tiết sản phẩm
│   ├── index.ejs             # Trang chủ
│   ├── 404.ejs               # Trang lỗi 404
│   └── error.ejs             # Trang lỗi server
└── public/
    ├── css/
    │   └── style.css         # CSS styling
    └── js/
        └── main.js           # JavaScript client-side
```

## Mô hình dữ liệu

### Supplier (Nhà cung cấp)
- `name`: Tên nhà cung cấp (required, max 100 ký tự)
- `address`: Địa chỉ (required, max 200 ký tự)
- `phone`: Số điện thoại (required, regex validation)
- `createdAt`: Thời gian tạo (auto)
- `updatedAt`: Thời gian cập nhật (auto)

### Product (Sản phẩm)
- `name`: Tên sản phẩm (required, max 100 ký tự)
- `price`: Giá (required, >= 0)
- `quantity`: Số lượng (required, >= 0)
- `supplierId`: ID nhà cung cấp (required, reference to Supplier)
- `createdAt`: Thời gian tạo (auto)
- `updatedAt`: Thời gian cập nhật (auto)

## Cài đặt và chạy

### 1. Cài đặt dependencies
```bash
npm install
```

### 2. Cấu hình môi trường
File `.env` đã được tạo với cấu hình mặc định:
```
MONGO_URI=mongodb://localhost:27017/product_supplier_db
PORT=3000
NODE_ENV=development
```

### 3. Khởi động MongoDB
Đảm bảo MongoDB đang chạy trên máy local hoặc cập nhật MONGO_URI trong file .env

### 4. Tạo dữ liệu mẫu (tùy chọn)
```bash
npm run seed
```

### 5. Chạy ứng dụng

#### Development mode (với nodemon)
```bash
npm run dev
```

#### Production mode
```bash
npm start
```

### 6. Truy cập ứng dụng
Mở trình duyệt và truy cập: `http://localhost:3000`

## API Endpoints

### Suppliers
- `GET /suppliers` - Danh sách nhà cung cấp
- `GET /suppliers/new` - Form thêm nhà cung cấp
- `POST /suppliers` - Tạo nhà cung cấp mới
- `GET /suppliers/:id` - Chi tiết nhà cung cấp
- `GET /suppliers/:id/edit` - Form chỉnh sửa nhà cung cấp
- `PUT /suppliers/:id` - Cập nhật nhà cung cấp
- `DELETE /suppliers/:id` - Xóa nhà cung cấp

### Products
- `GET /products` - Danh sách sản phẩm
- `GET /products/new` - Form thêm sản phẩm
- `POST /products` - Tạo sản phẩm mới
- `GET /products/:id` - Chi tiết sản phẩm
- `GET /products/:id/edit` - Form chỉnh sửa sản phẩm
- `PUT /products/:id` - Cập nhật sản phẩm
- `DELETE /products/:id` - Xóa sản phẩm

## Công nghệ sử dụng

- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose ODM
- **Template Engine**: EJS
- **Frontend**: Bootstrap 5, Custom CSS/JS
- **Development**: Nodemon, dotenv

## Tính năng nổi bật

- ✅ Kiến trúc MVC rõ ràng
- ✅ Validation dữ liệu đầy đủ
- ✅ Giao diện responsive với Bootstrap 5
- ✅ Error handling và logging
- ✅ RESTful API design
- ✅ Form validation client-side và server-side
- ✅ Populate relationships giữa Product và Supplier
- ✅ Seed data script để test nhanh
- ✅ Environment configuration
- ✅ Method override cho PUT/DELETE

## Scripts có sẵn

- `npm start` - Chạy production server
- `npm run dev` - Chạy development server với nodemon
- `npm run seed` - Tạo dữ liệu mẫu

## Lưu ý

1. Đảm bảo MongoDB đang chạy trước khi khởi động ứng dụng
2. Port mặc định là 3000, có thể thay đổi trong file .env
3. Không thể xóa nhà cung cấp nếu có sản phẩm liên quan
4. Tất cả form đều có validation cả client-side và server-side

## Tác giả

Dự án được phát triển theo yêu cầu kiến trúc MVC với Node.js, MongoDB và Mongoose.