<?php
$servername = 'localhost';
$username = 'admin';
$password = 'none';
$dbname = 'gymz_db';

$conn = new mysqli( $servername, $username, $password, $dbname );

if ( $conn->connect_error ) {
    die( 'Kết nối không thành công: ' . $conn->connect_error );
}

if ( $_SERVER[ 'REQUEST_METHOD' ] === 'POST' ) {
    $fullname = $_POST[ 'fullname' ];
    $dateOfBirth = $_POST[ 'date' ];
    $email = $_POST[ 'email' ];
    $phoneNumber = $_POST[ 'phone' ];
    $password = $_POST[ 'password' ];

    if ( !empty( $fullname ) && !empty( $email ) && !empty( $phoneNumber ) && !empty( $password ) ) {
        $sql = "SELECT * FROM person WHERE Email = '$email' OR PhoneNumber = '$phoneNumber'";
        $result = $conn->query( $sql );

        if ( $result->num_rows > 0 ) {
            echo 'Email hoặc số điện thoại đã tồn tại. Vui lòng nhập lại.';
        } else {
            $sql = 'SELECT PersonID FROM person ORDER BY PersonID DESC LIMIT 1';
            $result = $conn->query( $sql );
            if ( $result->num_rows > 0 ) {
                $lastPersonID = $result->fetch_assoc()[ 'PersonID' ];
                $lastNumber = intval( substr( $lastPersonID, 2 ) );
                $newNumber = $lastNumber + 1;
                $personID = 'ps' . str_pad( ( string )$newNumber, 3, '0', STR_PAD_LEFT );
            } else {
                $personID = 'ps001';
            }

            $sql = 'SELECT AccountID FROM account ORDER BY AccountID DESC LIMIT 1';
            $result = $conn->query( $sql );
            if ( $result->num_rows > 0 ) {
                $lastAccountID = $result->fetch_assoc()[ 'AccountID' ];
                $lastNumber = intval( substr( $lastAccountID, 3 ) );
                $newNumber = $lastNumber + 1;
                $accountID = 'acc' . str_pad( ( string )$newNumber, 3, '0', STR_PAD_LEFT );
            } else {
                $accountID = 'acc001';
            }
            // Tạo ConversationID
            $conversationID = 'csv' . $accountID;
            $messageText = 'Xin chào Anh/Chị, em là nhân viên tư vấn khách hàng, mình có quan tâm đến sản phẩm/dịch vụ của bên em, để lại tin nhắn em sẽ tư vấn ạ.';
            $sql = "INSERT INTO person (PersonID, FullName, DateOfBirth, PhoneNumber, Email) VALUES ('$personID', '$fullname', '$dateOfBirth', '$phoneNumber', '$email')";
            if ( $conn->query( $sql ) === TRUE ) {
                $sql = "INSERT INTO account (AccountID, Password, Role, PersonID) VALUES ('$accountID', '$password', 'customer', '$personID')";
                if ( $conn->query( $sql ) === TRUE ) {
                    $sql = "INSERT INTO message (ConversationID, AccountID, Role, PersonID, MessageText) VALUES ('$conversationID', 'acc001', 'admin', 'ps001', '$messageText')";
                    if ( $conn->query( $sql ) === TRUE ) {
                        echo 'Đăng ký thành công.';
                    } else {
                        echo 'Lỗi: ' . $sql . '<br>' . $conn->error;
                    }
                } else {
                    echo 'Lỗi: ' . $sql . '<br>' . $conn->error;
                }
            } else {
                echo 'Lỗi: ' . $sql . '<br>' . $conn->error;
            }

        }
    } else {
        echo 'Vui lòng nhập đầy đủ thông tin.';
    }
}
?>
