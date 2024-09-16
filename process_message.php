<?php
// Kết nối đến cơ sở dữ liệu
include 'config.php'; // File chứa thông tin kết nối đến database
include 'database.php'; // File chứa các hàm thực hiện truy vấn SQL

// Kiểm tra xem request là POST hay không
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Lấy dữ liệu từ request
    $conversationID = $_POST["conversationID"];
    $accountID = $_POST["accountID"];
    $messageText = $_POST["messagetext"];

    // Kiểm tra dữ liệu đầu vào
    if (empty($accountID) || empty($messageText)) {
        echo "Vui lòng nhập đầy đủ thông tin.";
        exit;
    }

    // Lấy personID và role từ bảng account
    $personID = '';
    $role = '';
    $sql = "SELECT PersonID, Role FROM account WHERE AccountID = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $accountID);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $personID = $row["PersonID"];
        $role = $row["Role"];
    } else {
        echo "Không tìm thấy thông tin tài khoản.";
        exit;
    }
    
    // Tạo ConversationID
    // $conversationID = 'csv' . $accountID;
    // Thêm tin nhắn vào bảng message
    $sql_insert = "INSERT INTO message (ConversationID ,PersonID, AccountID, Role, MessageText) VALUES (?, ?, ?, ?, ?)";
    $stmt_insert = $conn->prepare($sql_insert);
    $stmt_insert->bind_param("sssss", $conversationID, $personID, $accountID, $role, $messageText);
    if ($stmt_insert->execute()) {
        echo "Đã lưu trên database";
    } else {
        echo "Lỗi khi gửi tin nhắn: " . $stmt_insert->error;
    }

    // Đóng kết nối
    $stmt_insert->close();
    $stmt->close();
} else {
    echo "Yêu cầu không hợp lệ.";
}

// Đóng kết nối
$conn->close();
?>
