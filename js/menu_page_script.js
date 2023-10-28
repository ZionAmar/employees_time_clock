document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.getElementById("loginButton");
    const loginForm = document.querySelector(".login-form");
    const loginDiv = document.getElementById("login");
    const galleryDiv = document.getElementById("gallery");

    loginButton.addEventListener("click", function () {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (username && password ) {
            loginDiv.style.display = "none";
            galleryDiv.style.display = "grid";
        } else {
            alert("שם משתמש או סיסמה אינם נכונים. נסה שוב.");
        }
    });
});
function updateTime() {
    document.getElementById("title").innerHTML="ניהול העסק שלי";
}
updateTime();