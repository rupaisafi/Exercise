

$(document).ready(function () {
    $("#btnLogIn").click(function() {
        UserLoginManager.LogInToSystem();
    });
    $("#txtpassword").keypress(function (event) {
        if (event.keyCode == 13) {
            UserLoginManager.LogInToSystem();
        }
    });

    $("#txtLoginId").keypress(function (event) {
        if (event.keyCode == 13) {
            UserLoginManager.LogInToSystem();
        }
    });

    $("#btnLogOff").click(function () {
        LogOffManager.LogOff();
    });
});