// Đảm bảo rằng jQuery đã được tải
if (typeof jQuery == 'undefined') {
    console.log('jQuery is not loaded. Please include jQuery library.');
} else {
    // let currentConversationID = '';
    // Mã JavaScript của bạn sẽ được thực thi ở đây
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
            window.location.href = './login.php'; // Chuyển hướng đến trang đăng nhập
        } else {


            var userCookieValue = getCookie('user'); // Lấy giá trị của cookie 'user'
            // console.log('Giá trị của cookie "user":', userCookieValue); // In giá trị của cookie 'user' ra console

            //gọi hàm hiển thị user
            displayUser();
            // Gọi phương thức để lấy tin nhắn từ server và hiển thị
            // getMessages();
            // var currentConversationID = 'csv' + accountID;
            // console.log('userAccountID:', currentConversationID); 
            // Các chức năng khác trong document.ready

            // Ẩn tất cả tin nhắn có trong message-list
            $('.message-list .message').hide();

            $('.input-text').on('input', function () {
                if ($(this).val().trim() !== '') {
                    $('.button-send').addClass('active');
                } else {
                    $('.button-send').removeClass('active');
                }
            });

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
        }




        // // Ẩn tất cả các message-list ban đầu
        // $('.message-list').css('display', 'none');


        // Gán sự kiện click cho nút show-more sau khi nó đã được tạo
        $('.show-more').on('click', function (event) {
            event.stopPropagation(); // Ngăn chặn sự kiện click từ show-more lan toả lên các phần tử khác

            // Ẩn tất cả các more trước khi hiển thị more của conversation hiện tại
            $('.more').hide();

            // Hiển thị hoặc ẩn more tùy thuộc vào trạng thái hiện tại
            var more = $(this).siblings('.more');
            if (more.css('display') === 'none') {
                more.show();
            } else {
                more.hide();
            }

            // Xóa class active từ conversation hiện tại và thêm vào conversation của show-more được click
            $('.conversation').removeClass('active');
            $(this).closest('.conversation').addClass('active');
        });

        // Sử dụng delegate để xử lý sự kiện click cho các conversation mới
        $('.msg-list').on('click', '.conversation', function () {
            // Xóa class active từ tất cả các conversation
            $('.conversation').removeClass('active');
            // Thêm class active cho conversation được click
            $(this).addClass('active');

            // Lấy currentConversationID từ class của conversation được click
            var conversationClasses = $(this).attr('class').split(' ');
            window.currentConversationID = conversationClasses.find(cls => cls.startsWith('csv'));
            window.currentPersonID = conversationClasses.find(cls => cls.startsWith('ps'));
            // console.log('');
            console.log(window.currentConversationID);
            console.log(window.currentPersonID);
            displayNameUser();
            // console.log('');

            // Hiển thị message-list tương ứng với currentConversationID
            $('.message-list.' + window.currentConversationID).css('display', 'flex');

            // Ẩn các message-list khác
            $('.message-list').not('.' + window.currentConversationID).css('display', 'none');
        });

        function displayNameUser() {
            $.ajax({
                url: 'http://localhost/gymz/get_person.php',
                method: 'GET',
                success: function (response) {
                    response.forEach(function (personData) {
                        var personID = personData.personID;
                        var fullName = personData.fullname;

                        console.log('assss');
                        console.log(personID);
                        console.log(window.currentPersonID);

                        if (personID === window.currentPersonID) {
                            var recipientInfoHTML =
                                '<div class="recipient">' +
                                '<div class="repcipient-img">' +
                                '<img src="./img/icon/avatar.png" alt="">' +
                                '</div>' +
                                '<div class="repcipient-info">' +
                                '<div class="repcipient-fullname">' + fullName + '</div>' +
                                '<div class="repcipient-status">Đang hoạt động</div>' +
                                '</div>' +
                                '</div>';
                            $('.box-top').empty();
                            $('.box-top').append(recipientInfoHTML);
                        }

                    });

                    // Gán sự kiện click cho nút show-more sau khi nó đã được tạo
                    $('.show-more').on('click', function (event) {
                        event.stopPropagation(); // Ngăn chặn sự kiện click từ show-more lan toả lên các phần tử khác

                        // Ẩn tất cả các more trước khi hiển thị more của conversation hiện tại
                        $('.more').hide();

                        // Hiển thị hoặc ẩn more tùy thuộc vào trạng thái hiện tại
                        var more = $(this).siblings('.more');
                        if (more.css('display') === 'none') {
                            more.show();
                        } else {
                            more.hide();
                        }

                        // Xóa class active từ conversation hiện tại và thêm vào conversation của show-more được click
                        $('.conversation').removeClass('active');
                        $(this).closest('.conversation').addClass('active');
                    });
                }
            })
        }

        // Phương thức hiển thị người nhận tin
        function displayUser() {
            $.ajax({
                url: 'http://localhost/gymz/get_person.php',
                method: 'GET',
                success: function (response) {
                    response.forEach(function (personData) {
                        var personID = personData.personID;
                        var fullName = personData.fullname;
                        let accountID = "acc" + personID.slice(2);

                        window.ConversationID = "csv" + accountID;
                        window.fullname = personData.fullname;
                        window.personID = personData.personID;

                        console.log("PersonID: " + personID);
                        console.log("FullName: " + fullname);
                        console.log("AccountID: " + accountID);
                        console.log("ConversationID: " + ConversationID);
                        console.log("");
                        console.log("");

                        // Kiểm tra xem conversation đã tồn tại chưa
                        var conversation = $('.msg-list').find('.conversation.' + ConversationID);
                        if (conversation.length === 0) {
                            // Nếu chưa tồn tại, tạo mới và thêm vào danh sách tin nhắn
                            var userChatHTML =
                                '<div class="conversation ' + ConversationID + ' ' + personID + '">' +
                                '<div class="user-chat">' +
                                '<img class="user-img" src="./img/icon/avatar.png" alt="">' +
                                '<div class="user-wrapper">' +
                                '<div class="fullname">' + fullname + '</div>' +
                                '<div class="last-msg"></div>' + // Để sử dụng cho tin nhắn cuối cùng
                                '</div>' +
                                '</div>' +
                                '<button class="show-more">' +
                                '<ion-icon name="ellipsis-horizontal-sharp"></ion-icon>' +
                                '</button>' +
                                '<div class="more">' +
                                '<div class="delete-chat">' +
                                '<ion-icon name="trash-sharp"></ion-icon>' +
                                '</div>' +
                                '</div>' +
                                '</div>';

                            // Thêm HTML vào danh sách tin nhắn
                            $('.msg-list').append(userChatHTML);
                        } else {
                            // Nếu conversation đã tồn tại, gắn giá trị fullName vào class fullname
                            conversation.find('.fullname').text(fullName);

                            // Thêm phần HTML vào class user-chat của conversation
                            var userChatHTML =
                                '<img class="user-img" src="./img/icon/avatar.png" alt="">' +
                                '<div class="user-wrapper">' +
                                '<div class="fullname">' + fullName + '</div>' +
                                '<div class="last-msg"></div>' + // Để sử dụng cho tin nhắn cuối cùng
                                '</div>' +
                                '<button class="show-more">' +
                                '<ion-icon name="ellipsis-horizontal-sharp"></ion-icon>' +
                                '</button>' +
                                '<div class="more">' +
                                '<div class="delete-chat">' +
                                '<ion-icon name="trash-sharp"></ion-icon>' +
                                '</div>' +
                                '</div>';

                            conversation.find('.user-chat').append(userChatHTML);
                        }

                    });
                    getLastMessage();
                    getMessages();
                },
                error: function (xhr, status, error) {
                    console.log(error);
                }
            });
        }

        // Hàm lấy tin nhắn cuối cùng trong cuộc trò chuyện
        function getLastMessage() {
            var ConversationID = window.ConversationID; // Lấy ConversationID từ biến global

            $.ajax({
                url: 'http://localhost/gymz/get_lastmsg.php',
                method: 'GET',
                success: function (response) {
                    response.forEach(function (conversation) {
                        var conversationID = conversation.ConversationID;
                        var lastMessage = conversation.LastMessageText;

                        // console.log("Last message " + conversationID + ": " + lastMessage);

                        // Nối giá trị lastMessage vào class last-msg của phần tử tương ứng
                        $('.conversation.' + conversationID + ' .last-msg').text(lastMessage);
                    });
                },
                error: function (xhr, status, error) {
                    console.log(error);
                }
            });
        }


        // Phương thức để lấy tin nhắn từ server và hiển thị
        function getMessages() {
            $.ajax({
                url: 'http://localhost/gymz/get_messages.php', // Đường dẫn tới API endpoint trên server
                method: 'GET',
                success: function (response) {
                    // $('.message-list').empty();
                    // Lặp qua từng tin nhắn trong response
                    response.forEach(function (message) {

                        var conversationID = message.conversationID;
                        var accountID = message.accountID;
                        var personID = message.personID;
                        var role = message.role;
                        var messageText = message.messageText;

                        //
                        // var currentConversationID = 'csv' + accountID;

                        // console.log('conversationID: ' + conversationID);
                        // console.log('accountID: ' + accountID);
                        // console.log('personID: ' + personID);
                        // console.log('role: ' + role);
                        // console.log('messageText: ' + messageText);
                        // console.log('');
                        // console.log('');

                        // Tạo hoặc lấy danh sách tin nhắn của conversationID
                        var messageList = $('.box-middel').find('.message-list.' + conversationID);
                        if (messageList.length === 0) {
                            // Nếu danh sách chưa tồn tại, tạo mới và thêm vào box-middel
                            messageList = $('<div class="message-list ' + conversationID + '"></div>');
                            $('.box-middel').append(messageList);
                        }
                        // Tạo tin nhắn và thêm vào danh sách tin nhắn của conversationID
                        var messageHTML = '<div class="message ' + role + '">' +
                            '<p class="message-content">' + messageText + '</p>' +
                            '</div>';
                        messageList.append(messageHTML);
                        // Kiểm tra xem conversation đã được tạo chưa
                        var conversation = $('.msg-list').find('.conversation.' + conversationID);
                        if (conversation.length === 0) {
                            // Nếu chưa, tạo mới conversation và append vào msg-list
                            conversation = $('<div class="conversation ' + conversationID + '"></div>');
                            $('.msg-list').append(conversation);
                        } else {
                            // Conversation đã tồn tại, chỉ cần cập nhật tin nhắn cuối cùng
                            var lastMsg = conversation.find('.last-msg');
                            lastMsg.text(messageText);

                        }
                    });
                    getLastMessage();
                },
                error: function (xhr, status, error) {
                    console.log(error); // Xử lý lỗi nếu có khi lấy tin nhắn
                }
            });
        }


        // Hàm gửi tin nhắn
        function sendMessage() {
            var messageContent = $('.input-text').val().trim();
            var accountID = getCookie('user'); // Lấy accountID từ cookie

            // Kiểm tra nội dung tin nhắn trước khi gửi
            if (messageContent !== '') {
                // Xác định conversationID và role (ví dụ)

                var conversationID = window.currentConversationID; // Giả sử conversationID được tạo từ accountID
                var messageClass = 'admin'; // Giả sử đây là vai trò của tin nhắn

                console.log('giá trị đã gửi lên server: ', conversationID);

                // Hiển thị tin nhắn lên message-list trước khi gửi

                var messageClass = 'admin'; // Assume tin nhắn được gửi từ người dùng
                var messageHTML =
                    // '<div class="message-list ' + conversationID + '">' +
                    '<div class="message ' + messageClass + '">' +
                    '<p class="message-content">' + messageContent + '</p>' +
                    '</div>';

                $('.message-list.' + conversationID).empty();
                $('.message-list').append(messageHTML);

                // Gửi yêu cầu đến send_message.php

                $.ajax({
                    url: 'http://localhost/gymz/process_message.php',
                    method: 'POST',
                    data: {
                        conversationID: conversationID,
                        accountID: accountID,
                        personID: '', // Cần xác định cách lấy personID từ accountID
                        role: '', // Cần xác định cách lấy role từ accountID
                        messagetext: messageContent
                    },
                    success: function (response) {
                        console.log(response); // Xử lý phản hồi từ server nếu cần
                        $('.input-text').val(''); // Xóa nội dung trong input-text sau khi gửi tin nhắn thành công
                        $('.button-send').removeClass('active'); // Loại bỏ class active sau khi gửi tin nhắn
                        // getMessages(); // Gọi lại phương thức để cập nhật tin nhắn
                    },
                    error: function (xhr, status, error) {
                        console.log(error); // Xử lý lỗi nếu có
                    }
                });
                getMessages();
            }
        }


    });
}