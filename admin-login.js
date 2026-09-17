function adminLogin() {

    let password = document.getElementById("admin-password").value;
    let message = document.getElementById("login-message");

    let adminPassword = "Bharat@123";

    if (password === adminPassword) {

        message.innerText = "Login successful!";

        setTimeout(function() {
            window.location.href = "admin.html";
        }, 500);

    } else {

        message.innerText = "Incorrect password. Access denied.";

    }
}