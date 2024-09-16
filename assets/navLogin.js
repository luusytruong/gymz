const content = document.querySelector('#messageDiv span');

setTimeout(function(event){
    content.textContent = "sau 4s";
    setTimeout(function(event){
        content.textContent = "sau 3s";
        setTimeout(function(event){
            content.textContent = "sau 2s";
            setTimeout(function(event){
                content.textContent = "sau 1s";
                setTimeout(function(event){
                    window.location.href = "./login.php";
                }, 1000);
            }, 1000);
        }, 1000);
    }, 1000);
}, 1000);