<?php
include 'config.php';
include 'database.php';

// Truy vấn để lấy tin nhắn cuối cùng của mỗi ConversationID
$sql = "SELECT * FROM message ORDER BY ConversationID, MessageID DESC";
$result = $conn->query($sql);

$lastMessages = array();

if ($result->num_rows > 0) {
    $previousConversationID = null;
    while ($row = $result->fetch_assoc()) {
        $conversationID = $row['ConversationID'];
        $messageText = $row['MessageText'];

        // Kiểm tra nếu ConversationID khác với ConversationID trước đó
        if ($conversationID !== $previousConversationID) {
            // Thêm tin nhắn cuối cùng vào mảng
            $lastMessages[] = array(
                'ConversationID' => $conversationID,
                'LastMessageText' => $messageText
            );
            // Cập nhật ConversationID trước đó
            $previousConversationID = $conversationID;
        }
    }
    // Trả về dữ liệu dưới dạng JSON
    header('Content-Type: application/json');
    echo json_encode($lastMessages);
} else {
    // Không có tin nhắn nào trong cơ sở dữ liệu
    header('Content-Type: application/json');
    echo json_encode(array('error' => 'Không tìm thấy tin nhắn.'));
}

$conn->close();
?>
