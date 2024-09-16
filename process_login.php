<?php
// Kết nối đến cơ sở dữ liệu
include 'config.php';
include 'database.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["username"];
    $password = $_POST["password"];

    // Kiểm tra dữ liệu đầu vào
    if (empty($email) || empty($password)) {
        echo "<script>alert('Vui lòng nhập đủ thông tin');</script>";
    } else {
        // Truy xuất dữ liệu từ cơ sở dữ liệu
        $sql = "SELECT * FROM account INNER JOIN person ON account.PersonID = person.PersonID WHERE person.Email = ? OR person.PhoneNumber = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ss", $email, $email);
        $stmt->execute();
        $result = $stmt->get_result();
        $user = $result->fetch_assoc();

        // Kiểm tra mật khẩu
        
        if ($user && $password == $user['Password']) {
            // Lưu người dùng vào cookie                    1 ngày * 30 ngày = 30 ngày
            setcookie("user", $user['AccountID'], time() + (86400 * 30), "/"); // 86400 = 1 day
            // echo "<script>alert('Đăng nhập thành công');</script>";
        } else {
            // echo "<script>alert('Email/Số điện thoại hoặc mật khẩu không chính xác');</script>";
        }
    }
}

$conn->close();
?>
