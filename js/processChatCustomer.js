$(document).ready(function () {
    // Hàm lấy giá trị từ cookie
    function getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();
    }
    // Kiểm tra cookie khi trang được tải
    if (!getCookie('user')) {
        alert('Bạn cần đăng nhập để sử dụng chức năng này.');
        window.location.href = '../login.php'; // Chuyển hướng đến trang đăng nhập
    } else {

        var userCookieValue = getCookie('user'); // Lấy giá trị của cookie 'user'
        console.log('Giá trị của cookie "user":', userCookieValue); // In giá trị của cookie 'user' ra console

        // Sử dụng giá trị cookie 'user' tại đây
        // Ví dụ: gán giá trị cookie vào biến mới
        var currentConversationID = 'csv' + userCookieValue;
        console.log('userAccountID:', currentConversationID); // In giá trị của biến mới ra console


        // Gọi phương thức để lấy tin nhắn từ server và hiển thị
        getMessages();

        // Các chức năng khác trong document.ready
        // ...
        // Ẩn tất cả tin nhắn có trong message-list
        $('.message-list .message').hide();

        // Thêm class active vào button-send khi có nội dung trong input-text
        $('.input-text').on('input', function () {
            if ($(this).val().trim() !== '') {
                $('.button-send').addClass('active');
            } else {
                $('.button-send').removeClass('active');
            }
        });

        // Xử lý sự kiện gửi tin nhắn
        $('.input-text').on('keydown', function (event) {
            if (event.keyCode === 13 && $(this).val().trim() !== '') {
                sendMessage();
            }
        });

        $('.button-send').on('click', function () {
            if ($(this).hasClass('active')) {
                sendMessage();
            }
        });

        // Hàm gửi tin nhắn
        function sendMessage() {
            var messageContent = $('.input-text').val().trim();
            var accountID = getCookie('user'); // Lấy accountID từ cookie

            // Kiểm tra nội dung tin nhắn trước khi gửi
            if (messageContent !== '') {
                // Xác định conversationID và role (ví dụ)
                var conversationID = 'csv' + accountID; // Giả sử conversationID được tạo từ accountID
                var messageClass = 'customer'; // Giả sử đây là vai trò của tin nhắn

                // Tạo đoạn mã HTML của tin nhắn
                var messageHTML = '<div class="message-list ' + conversationID + '">' +
                    '<div class="message ' + messageClass + '">' +
                    '<p class="message-content">' + messageContent + '</p>' +
                    '</div>' +
                    '</div>';

                // Hiển thị tin nhắn trên giao diện
                $('.box-middel').append(messageHTML);

                // // Hiển thị tin nhắn lên message-list trước khi gửi
                // var messageClass = 'customer'; // Assume tin nhắn được gửi từ người dùng
                // var messageHTML = '<div class="message ' + messageClass + '">' +
                //     '<p class="message-content">' + messageContent + '</p>' +
                //     '</div>';
                // $('.message-list').append(messageHTML);

                // Gửi yêu cầu đến send_message.php
                $.ajax({
                    url: 'http://localhost/gymz/process_message.php',
                    method: 'POST',
                    data: {
                        accountID: accountID,
                        personID: '', // Cần xác định cách lấy personID từ accountID
                        role: '', // Cần xác định cách lấy role từ accountID
                        messagetext: messageContent
                    },
                    success: function (response) {
                        console.log(response); // Xử lý phản hồi từ server nếu cần
                        $('.input-text').val(''); // Xóa nội dung trong input-text sau khi gửi tin nhắn thành công
                        $('.button-send').removeClass('active'); // Loại bỏ class active sau khi gửi tin nhắn
                        getMessages(); // Gọi lại phương thức để cập nhật tin nhắn
                    },
                    error: function (xhr, status, error) {
                        console.log(error); // Xử lý lỗi nếu có
                    }
                });
            }
        }




        // Phương thức để lấy tin nhắn từ server và hiển thị
        function getMessages() {
            $.ajax({
                url: 'http://localhost/gymz/get_messages.php', // Đường dẫn tới API endpoint trên server
                method: 'GET',
                success: function (response) {
                    // Xóa tin nhắn cũ trong message-list
                    $('.box-middel').empty();

                    // Hiển thị tin nhắn trên giao diện
                    response.forEach(function (message) {


                        var messageClass = message.role === 'admin' ? 'admin' : 'customer';
                        var messageContent = '<div class="message ' + messageClass + '">' +
                            '<p class="message-content">' + message.messageText + '</p>' +
                            '</div>';
                        $('.message-list').append(messageContent);


                        var conversationID = message.ConversationID;
                        var messageClass = message.role === 'admin' ? 'admin' : 'customer';
                        var messageHTML = '<div class="message-list ' + conversationID + '">' +
                            '<div class="message ' + messageClass + '">' +
                            '<p class="message-content">' + message.messageText + '</p>' +
                            '</div>' +
                            '</div>';

                        // Hiển thị tin nhắn trên giao diện
                        $('.box-middel').append(messageHTML);


                        var conversationID = message.ConversationID;
                        var role = message.role === 'admin' ? 'admin' : 'customer';
                        var messageContent = message.messageText;

                        // Tạo hoặc lấy danh sách tin nhắn của conversationID
                        var messageList = $('.box-middel').find('.message-list.' + conversationID);
                        if (messageList.length === 0) {
                            // Nếu danh sách chưa tồn tại, tạo mới và thêm vào box-middel
                            messageList = $('<div class="message-list ' + conversationID + '"></div>');
                            $('.box-middel').append(messageList);
                        }

                        // Tạo tin nhắn và thêm vào danh sách tin nhắn của conversationID
                        var messageHTML = '<div class="message ' + role + '">' +
                            '<p class="message-content">' + messageContent + '</p>' +
                            '</div>';
                        messageList.append(messageHTML);


                    });
                },
                error: function (xhr, status, error) {
                    console.log(error); // Xử lý lỗi nếu có
                }
            });
        }
        // setInterval(getMessages, 2500);

        // tạo 1 conversationID của khách hàng trước tiên. 
        // sau đó so sánh với conversationID trong file json mà get_message.php trả về:
        // nếu mà trùng conversationID thì sẽ lấy dòng dữ liệu đó để hiển thị ra. 
        // nếu không trùng xoá hết!


        function getMessages() {
            $.ajax({
                url: 'http://localhost/gymz/get_messages.php',
                method: 'GET',
                success: function (response) {
                    // Lấy danh sách ConversationID hiện tại
                    // var currentConversationID = 'csv' + getCookie('user');
                    console.log('đã tồn tại rùi nè: ', currentConversationID);
                    // Xóa tin nhắn cũ trong message-list
                    $('.box-middel').empty();
        
                    // Hiển thị tin nhắn trên giao diện
                    response.forEach(function (message) {
                        var conversationID = message.ConversationID;
                        var role = message.role === 'admin' ? 'admin' : 'customer';
                        var messageContent = message.messageText;
        
                        // Kiểm tra nếu ConversationID của tin nhắn khớp với currentConversationID
                        if (conversationID === currentConversationID) {
                            // Tạo hoặc lấy danh sách tin nhắn của conversationID
                            var messageList = $('.box-middel').find('.message-list.' + conversationID);
                            if (messageList.length === 0) {
                                // Nếu danh sách chưa tồn tại, tạo mới và thêm vào box-middel
                                messageList = $('<div class="message-list ' + conversationID + '"></div>');
                                $('.box-middel').append(messageList);
                            }
        
                            // Tạo tin nhắn và thêm vào danh sách tin nhắn của conversationID
                            var messageHTML = '<div class="message ' + role + '">' +
                                '<p class="message-content">' + messageContent + '</p>' +
                                '</div>';
                            messageList.append(messageHTML);
                        }
                    });
                },
                error: function (xhr, status, error) {
                    console.log(error); // Xử lý lỗi nếu có
                }
            });
        }


    }
});