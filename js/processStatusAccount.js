// Kiểm tra xem cookie có tồn tại hay không
function checkCookie(cookieName) {
    return document.cookie.indexOf(cookieName + '=') !== -1;
}

// Xóa cookie có tên 'user'
function deleteCookie() {
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // Điều này sẽ đặt thời gian hết hạn của cookie về quá khứ để nó tự động bị xóa
    // 'path=/' đảm bảo rằng cookie sẽ được xóa trên toàn bộ trang web
}

$(document).ready(function () {
    $(document).on('click', '.account-wrapper', function () {
        if (!checkCookie('user')) {
            console.log('không có cookie')
            alert('Chưa đăng nhập, đăng nhập ngay!');
            window.location.href = "http://localhost/gymz/login.php";
            // Redirect hoặc thực hiện các thao tác khác sau khi xóa cookie
            // window.location.href = "logout.php"; // Ví dụ: chuyển hướng đến trang logout.php
        } else {
            alert('Đã đăng nhập rồi');
            window.location.href = "http://localhost/gymz/navigation/information_account.html"
        }
    });
    $('.content-inner.logout').on('click', function () {
        deleteCookie();
        // Kiểm tra xem cookie đã được xóa thành công hay không
        if (!checkCookie('user')) {
            alert('Đăng xuất thành công! hihi');
            console.log('đã xoá cookie')
            // Redirect hoặc thực hiện các thao tác khác sau khi xóa cookie
            // window.location.href = "logout.php"; // Ví dụ: chuyển hướng đến trang logout.php
        } else {
            alert('Đăng xuất không thành công!');
        }
    });
});