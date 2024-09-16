<?php

include 'config.php';
include 'database.php';

// Kiểm tra xem có dữ liệu trong bảng message không
$sql_check = 'SELECT COUNT(*) as count FROM message';
$result_check = $conn->query( $sql_check );
$row_check = $result_check->fetch_assoc();
$messageCount = intval( $row_check[ 'count' ] );


$sql = 'SELECT MessageID, ConversationID, PersonID, AccountID, Role, MessageText FROM message ORDER BY MessageID desc';

$result = $conn->query( $sql );

$messages = array();
if ( $result->num_rows > 0 ) {
    // Lặp qua các dòng dữ liệu để lấy thông tin tin nhắn
    while ( $row = $result->fetch_assoc() ) {
        $messages[] = array(
            'conversationID' => $row[ 'ConversationID' ],
            'personID' => $row[ 'PersonID' ],
            'accountID' => $row[ 'AccountID' ],
            'role' => $row[ 'Role' ],
            'messageText' => $row[ 'MessageText' ]
        );
    }
}

header( 'Content-Type: application/json' );
echo json_encode( $messages );

$conn->close();
?>
