<?php
include '/database/config.php';
include '/database/database.php';
// Xử lý yêu cầu kiểm tra dữ liệu từ client-side JavaScript
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Lấy dữ liệu từ form
    $fullname = $_POST['fullname'];
    $dateOfBirth = $_POST['date'];
    $email = $_POST['email'];
    $phoneNumber = $_POST['phone'];
    $password = $_POST['password'];

    // Kiểm tra dữ liệu và thực hiện các xử lý cần thiết
    // if (!empty($fullname) && !empty($dateOfBirth) && !empty($email) && !empty($phoneNumber) && !empty($password)) {
    if (!empty($fullname) && !empty($email) && !empty($phoneNumber) && !empty($password)) {
        // Xử lý thêm dữ liệu vào cơ sở dữ liệu
        // Sau khi thêm dữ liệu thành công, trả về phản hồi cho client-side JavaScript
        
        echo "success";
    } else {
        // Trả về thông báo lỗi nếu dữ liệu không hợp lệ
        echo "Vui lòng nhập đầy đủ thông tin.";
    }
}
?>
