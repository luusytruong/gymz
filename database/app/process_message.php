<?php
include 'config.php';
include 'database.php';

if (isset($_GET['message_content']) && isset($_GET['sender_name'])) {
    $messageContent = $_GET['message_content'];
    $messageContent = mysqli_real_escape_string($conn, $messageContent);
    $senderName = $_GET['sender_name'];

    $sql = "INSERT INTO chat_messages (sender_name, message_content) VALUES ('$senderName', '$messageContent')";

    if ($conn->query($sql) === TRUE) {
        echo "Tin nhắn đã được gửi thành công!";
    } else {
        echo "Lỗi: " . $sql . "<br>" . $conn->error;
    }
} else {
    echo "Không có dữ liệu gửi lên!";
}

$conn->close();
?>
