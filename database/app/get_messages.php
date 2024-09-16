<?php
include 'config.php';
include 'database.php';

// Truy vấn dữ liệu từ bảng chat_messages
$sql = "SELECT * FROM chat_messages ORDER BY id DESC"; // Sắp xếp theo ID giảm dần để hiển thị tin nhắn mới nhất trên đầu
$result = $conn->query($sql);

// Kiểm tra và xử lý kết quả truy vấn
if ($result->num_rows > 0) {
    $messages = array();
    while ($row = $result->fetch_assoc()) {
        $messages[] = $row;
    }
} else {
    // Nếu không có tin nhắn, tạo một tin nhắn chào mừng
    $welcomeMessage = "Xin chào Anh/Chị, em là Nhân viên tư vấn 
                        khách hàng của Công ty GYMZ, em có thể 
                        giúp gì được cho mình ạ!";
    $sql = "INSERT INTO chat_messages (sender_name, message_content) VALUES ('Admin', '$welcomeMessage')";
    if ($conn->query($sql) === TRUE) {
        $messages = array(array("sender_name" => "Admin", "message_content" => $welcomeMessage));
    } else {
        echo "Lỗi: " . $sql . "<br>" . $conn->error;
    }
}

// Trả về kết quả dưới dạng JSON
echo json_encode($messages);

$conn->close();
?>
