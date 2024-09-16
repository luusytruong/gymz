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
            
            // setInterval(() => {
            //     console.log('giá trị của id cuộc trò chuyện hiện tại: ', window.currentConversationID);
            // }, 5000);
    
            // Gọi phương thức để lấy tin nhắn từ server và hiển thị
            getMessages();
            // var currentConversationID = 'csv' + accountID;
            // console.log('userAccountID:', currentConversationID); 
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
        }


        setInterval(() => {
            let currentConversationID = window.currentConversationID;
            console.log('giá trị của id cuộc trò chuyện hiện tại: ', currentConversationID);
        }, 1000);

        
        // Hàm gửi tin nhắn
        function sendMessage() {
            var messageContent = $('.input-text').val().trim();
            var accountID = getCookie('user'); // Lấy accountID từ cookie

            // Kiểm tra nội dung tin nhắn trước khi gửi
            if (messageContent !== '') {
                // Xác định conversationID và role (ví dụ)
                let currentConversationID = window.currentConversationID;
                var conversationID = currentConversationID; // Giả sử conversationID được tạo từ accountID
                var messageClass = 'admin'; // Giả sử đây là vai trò của tin nhắn

                console.log('giá trị đã gửi lên server: ', conversationID);

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
                        getMessages(); // Gọi lại phương thức để cập nhật tin nhắn
                    },
                    error: function (xhr, status, error) {
                        console.log(error); // Xử lý lỗi nếu có
                    }
                });
            }
        }
        function getMessages() {
            $.ajax({
                url: 'http://localhost/gymz/get_messages.php', // Đường dẫn tới API endpoint trên server
                method: 'GET',
                success: function (response) {
                    // Lặp qua từng tin nhắn trong response
                    response.forEach(function (message) {

                        var conversationID = message.conversationID;
                        var accountID = message.accountID;
                        var personID = message.personID;
                        var role = message.role;
                        var messageText = message.messageText;



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

                            // Lấy thông tin person từ bảng person bằng personID
                            $.ajax({
                                url: 'http://localhost/gymz/get_person.php', // Đường dẫn tới API endpoint lấy thông tin person
                                method: 'GET',
                                data: { personID: personID },
                                success: function (personInfo) {
                                    var fullName = personInfo.FullName;

                                    // Tạo giao diện conversation với thông tin person và tin nhắn cuối cùng
                                    var userChatHTML = '<div class="user-chat">' +
                                        '<img class="user-img" src="./img/icon/avatar.png" alt="">' +
                                        '<div class="user-wrapper">' +
                                        '<div class="fullname">' + fullName + '</div>' +
                                        '<div class="last-msg">' + messageText + '</div>' +
                                        '</div>' +
                                        '</div>' +
                                        '<button class="show-more">' +
                                        '<ion-icon name="ellipsis-horizontal-sharp"></ion-icon>' +
                                        '</button>' +
                                        '<div class="more">' +
                                        '<div class="delete-chat">' +
                                        '<ion-icon name="trash-sharp"></ion-icon>' +
                                        '</div>' +
                                        '</div>';
                                    conversation.append(userChatHTML);
                                },
                                error: function (xhr, status, error) {
                                    console.log(error); // Xử lý lỗi nếu có khi lấy thông tin person
                                }
                            });
                        } else {
                            // Conversation đã tồn tại, chỉ cần cập nhật tin nhắn cuối cùng
                            var lastMsg = conversation.find('.last-msg');
                            lastMsg.text(messageText);
                        }
                    });

                    // Thêm sự kiện click vào document để ẩn more khi click bên ngoài conversation
                    $(document).on('click', function () {
                        $('.more').hide();
                    });
                },
                error: function (xhr, status, error) {
                    console.log(error); // Xử lý lỗi nếu có khi lấy tin nhắn
                }
            });
        }

        // Ẩn tất cả các message-list ban đầu
        $('.message-list').css('display', 'none');


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
        $('.msg-list').on('click', '.conversation', function() {
            // Xóa class active từ tất cả các conversation
            $('.conversation').removeClass('active');
            // Thêm class active cho conversation được click
            $(this).addClass('active');

            // Lấy currentConversationID từ class của conversation được click
            var conversationClasses = $(this).attr('class').split(' ');
            window.currentConversationID = conversationClasses.find(cls => cls.startsWith('csv'));
            console.log('Class của conversation vừa click:', window.currentConversationID);

            // Hiển thị message-list tương ứng với currentConversationID
            $('.message-list.' + window.currentConversationID).css('display', 'flex');

            // Ẩn các message-list khác
            $('.message-list').not('.' + window.currentConversationID).css('display', 'none');
        });


        // Phương thức để lấy tin nhắn từ server và hiển thị
        // function getMessages() {
        //     $.ajax({
        //         url: 'http://localhost/gymz/get_messages.php', // Đường dẫn tới API endpoint trên server
        //         method: 'GET',
        //         success: function (response) {
        //             // Lặp qua từng tin nhắn trong response
        //             response.forEach(function (message) {

        //                 var conversationID = message.conversationID;
        //                 var accountID = message.accountID;
        //                 var personID = message.personID;
        //                 var role = message.role;
        //                 var messageText = message.messageText;

        //                 //
        //                 var currentConversationID = 'csv' + accountID;
        //                 console.log(currentConversationID);

        //                 // Tạo hoặc lấy danh sách tin nhắn của conversationID
        //                 var messageList = $('.box-middel').find('.message-list.' + conversationID);
        //                 if (messageList.length === 0) {
        //                     // Nếu danh sách chưa tồn tại, tạo mới và thêm vào box-middel
        //                     messageList = $('<div class="message-list ' + conversationID + '"></div>');
        //                     $('.box-middel').append(messageList);
        //                 }

        //                 // Tạo tin nhắn và thêm vào danh sách tin nhắn của conversationID
        //                 var messageHTML = '<div class="message ' + role + '">' +
        //                     '<p class="message-content">' + messageText + '</p>' +
        //                     '</div>';
        //                 messageList.append(messageHTML);


        //                 // Kiểm tra xem conversation đã được tạo chưa
        //                 var conversation = $('.msg-list').find('.conversation.' + conversationID);
        //                 if (conversation.length === 0) {
        //                     // Nếu chưa, tạo mới conversation và append vào msg-list
        //                     conversation = $('<div class="conversation ' + conversationID + '"></div>');
        //                     $('.msg-list').append(conversation);

        //                     // Lấy thông tin person từ bảng person bằng personID
        //                     $.ajax({
        //                         url: 'http://localhost/gymz/get_person.php', // Đường dẫn tới API endpoint lấy thông tin person
        //                         method: 'GET',
        //                         data: { personID: personID },
        //                         success: function (personInfo) {
        //                             var fullName = personInfo.FullName;

        //                             // Tạo giao diện conversation với thông tin person và tin nhắn cuối cùng
        //                             var userChatHTML = '<div class="user-chat">' +
        //                                 '<img class="user-img" src="./img/icon/avatar.png" alt="">' +
        //                                 '<div class="user-wrapper">' +
        //                                 '<div class="fullname">' + fullName + '</div>' +
        //                                 '<div class="last-msg">' + messageText + '</div>' +
        //                                 '</div>' +
        //                                 '</div>' +
        //                                 '<button class="show-more">' +
        //                                 '<ion-icon name="ellipsis-horizontal-sharp"></ion-icon>' +
        //                                 '</button>' +
        //                                 '<div class="more">' +
        //                                 '<div class="delete-chat">' +
        //                                 '<ion-icon name="trash-sharp"></ion-icon>' +
        //                                 '</div>' +
        //                                 '</div>';
        //                             conversation.append(userChatHTML);
        //                             console.log('22222')
        //                         },
        //                         error: function (xhr, status, error) {
        //                             console.log(error); // Xử lý lỗi nếu có khi lấy thông tin person
        //                         }
        //                     });
        //                 } else {
        //                     // Conversation đã tồn tại, chỉ cần cập nhật tin nhắn cuối cùng
        //                     var lastMsg = conversation.find('.last-msg');
        //                     lastMsg.text(messageText);
        //                 }
        //             });

        //         },
        //         error: function (xhr, status, error) {
        //             console.log(error); // Xử lý lỗi nếu có khi lấy tin nhắn
        //         }
        //     });
        // }
        // // setInterval(getMessages, 2500);
        // // Sử dụng delegate để xử lý sự kiện click cho các conversation mới
        // $('.msg-list').on('click', '.conversation', function () {
        //     // Xử lý khi click vào conversation
        //     // Ví dụ: đánh dấu conversation đã chọn
        //     $('.conversation').removeClass('active');
        //     $(this).addClass('active');
        // });
        // setTimeout(function hiha(){
        //     // Lấy danh sách tất cả các conversation
        //     const conversations = document.querySelectorAll('.conversation');

        //     // Kiểm tra xem có conversation nào không
        //     if (conversations.length > 0) {
        //         // Mặc định chọn conversation đầu tiên và thêm class active
        //         let activeConversation = conversations[0];
        //         // activeConversation.classList.add('active');

        //         // Lặp qua từng conversation để thêm sự kiện click vào show-more
        //         conversations.forEach(conversation => {
        //             const showMoreBtn = conversation.querySelector('.show-more');
        //             const more = conversation.querySelector('.more');

        //             // Thêm sự kiện click vào show-more
        //             showMoreBtn.addEventListener('click', function (event) {
        //                 event.stopPropagation(); // Ngăn chặn sự kiện click từ show-more lan toả lên các phần tử khác

        //                 // Ẩn tất cả các more trước khi hiển thị more của conversation hiện tại
        //                 conversations.forEach(conv => {
        //                     if (conv !== conversation) {
        //                         conv.querySelector('.more').style.display = 'none';
        //                     }
        //                 });

        //                 // Hiển thị hoặc ẩn more tùy thuộc vào trạng thái hiện tại
        //                 if (more.style.display === 'none' || more.style.display === '') {
        //                     more.style.display = 'block';
        //                 } else {
        //                     more.style.display = 'none';
        //                 }

        //                 // Xóa class active từ conversation hiện tại và thêm vào conversation được click
        //                 activeConversation.classList.remove('active');
        //                 conversation.classList.add('active');
        //                 activeConversation = conversation; // Cập nhật conversation hiện tại là conversation được click
        //             });

        //             // Thêm sự kiện click vào conversation để thêm class active và xóa class active từ conversation hiện tại
        //             conversation.addEventListener('click', function () {
        //                 activeConversation.classList.remove('active');
        //                 conversation.classList.add('active');
        //                 activeConversation = conversation;
        //             });
        //         });

        //         // Thêm sự kiện click vào document để ẩn more khi click bên ngoài conversation
        //         document.addEventListener('click', function () {
        //             conversations.forEach(conv => {
        //                 conv.querySelector('.more').style.display = 'none';
        //             });
        //         });

        //         // Chặn sự kiện click từ more lan toả lên các phần tử khác
        //         document.querySelector('.more').addEventListener('click', function (event) {
        //             event.stopPropagation();
        //         });
        //     } else {
        //         console.log('Không có conversation nào được tìm thấy.');
        //     }
        //     console.log('load danh sách tin nhắn hoàn tất')

        // }, 1000);

    });
}



