<!DOCTYPE html>
<html lang="en">

<head>
    <link rel="icon" href="./img/icon/logo.png" type="image/x-icon">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
        rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="./assets/styles.css">
    <title>GYMZ - Login</title>
</head>

<body>
    <div class="container">
        <div class="container-wrapper">
            <form action="process_signup.php" method="POST" id="signupForm" class="form-signup">
                <h2>Đăng ký</h2>
                <div id="messageDiv">
                    Đăng ký thành công đến
                    <a href="login.php">
                        Đăng nhập
                    </a>
                    <span>
                        sau 5s
                    </span>
                </div>
                <div class="form-group">
                    <label for="fullname">Họ tên</label>
                    <input type="text" id="fullname" name="fullname" placeholder=" " required>
                </div>
                <div class="form-group">
                    <label for="date">Ngày sinh</label>
                    <input type="date" id="date" name="date" placeholder=" ">
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="text" id="email" name="email" placeholder=" ">
                </div>
                <div class="form-group">
                    <label for="phone">Số điện thoại</label>
                    <input type="text" id="phone" name="phone" placeholder=" " required>
                </div>
                <div class="form-group">
                    <label for="password">Mật Khẩu</label>
                    <div class="password-wrapper">
                        <input type="text" id="password" name="password" placeholder="Nhập mật khẩu" required>
                        <button class="show-password">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
                <div class="form-group">
                    <label for="password">Nhập lại mật Khẩu</label>
                    <div class="password-wrapper">
                        <input type="text" id="confirm-password" name="password" placeholder="Nhập mật khẩu"
                            required>
                        <button class="show-password">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
                <div id="passwordError"></div>
                <input href="login.php" type="submit" value="Đăng ký">
                <div class="have-account">
                    Bạn đã có tài khoản?
                    <a href="login.php">
                        Đăng nhập
                    </a>
                </div>
            </form>
        </div>
    </div>
    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
    <script src="./assets/signupEvent.js"></script>
    <!-- <script src="./assets/navLogin.js"></script> -->
</body>

</html>