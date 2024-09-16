<?php
// Thông tin kết nối cơ sở dữ liệu
$servername = "localhost"; // Tên máy chủ MySQL, thường là localhost
$username = "admin"; // Tên người dùng MySQL của bạn
$password = "none"; // Mật khẩu của bạn
$database = "gymz_db"; // Tên cơ sở dữ liệu bạn muốn kết nối

// Tạo kết nối đến MySQL
$conn = new mysqli($servername, $username, $password, $database);

// Kiểm tra kết nối
if ($conn->connect_error) {
    die("Kết nối database thất bại: " . $conn->connect_error);
}

// Thiết lập bộ mã Unicode (UTF-8) để đảm bảo hiển thị đúng cho các ký tự đặc biệt
$conn->set_charset("utf8");

// Nếu cần thêm các cấu hình khác, bạn có thể thêm vào đây
?>