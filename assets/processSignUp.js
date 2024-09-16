$(document).ready(function() {
    $("#signupForm").submit(function(event) {
        event.preventDefault();

        var password = $("#password").val();
        var confirmPassword = $("#confirm-password").val();

        if (password !== confirmPassword) {
            alert("Mật khẩu không khớp!");
            return;
        }

        $.ajax({
            type: "POST",
            url: "process_signup.php",
            data: $(this).serialize(),
            success: function(response) {
                if (response === "Đăng ký thành công.") {
                    alert(response);
                    window.location.href = "login.php";
                } else {
                    alert(response);
                }
            }
        });
    });
});
