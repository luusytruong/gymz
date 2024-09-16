$(document).ready(function() {
    $('.form-login').on('submit', function(e) {
        e.preventDefault();

        var email = $('#email').val();
        var password = $('#password').val();

        if (!email || !password) {
            alert('Vui lòng nhập đủ thông tin');
        } else {
            $.ajax({
                type: 'POST',
                url: 'process_login.php',
                data: {
                    username: email,
                    password: password
                },
                success: function(response) {
                    $('body').append(response);
                    // window.location.href = "index.html";
                    var user = getCookie("user");
                    if (user) {
                        alert('Bạn đã đăng nhập thành công');
                        window.location.href = "index.html";
                    } else {
                        alert('Email/Số điện thoại hoặc mật khẩu không chính xác');
                    }
                }
            });
        }
    });
    // Kiểm tra xem người dùng đã đăng nhập hay chưa
    var user = getCookie("user");
    if (user) {
        alert('Bạn đã đăng nhập rồi');
        window.location.href = "index.html";
    }

    // Hàm để lấy cookie
    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    };
});
