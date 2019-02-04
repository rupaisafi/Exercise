var CurrentUser=[];

var UserLoginManager = {
    LogInToSystem: function () {
       // CurrentUser = null;

        var logonId = $("#txtLoginId").val();
        var pass = $("#txtpassword").val();

        //if (logonId == "") {
        //    alert("Please enter Login ID!");
        //    $("#txtLoginId").focus();
        //    return;
        //}
        //if (pass == "") {
        //    alert("Please enter Password!");
        //    $("#txtpassword").focus();
        //    return;
        //}

        var validator = $("#divUserLogin").kendoValidator().data("kendoValidator"),
           status = $(".status");

        if (validator.validate()) {
            // $.blockUI({ message: $('#divBlockMessage') });
            // var pathName = window.location.pathname;
            // var pageName = pathName.substring(pathName.lastIndexOf('/') + 1);
            var jsonParam = 'loginId=' + logonId + '&password=' + pass;
            var serviceURL = "../Home/ValidateUserLogin";
            AjaxManager.SendJson(serviceURL, jsonParam, onSuccess, onFailed);
        }
        function onSuccess(jsonData) {
            $.unblockUI();
            if (jsonData == "Failed") {

                AjaxManager.MsgBox('error', 'center', 'Login Failed', 'Wrong UserId or Password ! Try again.',
                    [{
                        addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                            $noty.close();
                            $("#txtpassword").focus();
                        }
                    }]);
             
            }
            else if (jsonData == "INACTIVE") {
                AjaxManager.MsgBox('error', 'center', 'Account Is Locked', 'Account is not active! \nPlease ask administrator to activate your account first then try to login.',
                    [{
                        addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                            $noty.close();
                            $("#txtpassword").focus();
                        }
                    }]);
            }
            else if (jsonData == "EXPIRED") {
                AjaxManager.MsgBox('warning', 'center', 'Password have been expired:', 'Your Password have been expired! \nYou have to either change your password or ask administrator to reset your password.',
                   [{
                       addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                           $noty.close();
                           window.location.href = "../Home/ResetPassword";
                       }
                   }]);

            }
            else if (jsonData == "LicExpired") {
                AjaxManager.MsgBox('warning', 'center', 'license have been expired:', 'Your license have been expired! \nPlease contact with the vendor to renew \nor email at support@ccse.com',
                   [{
                       addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                           $noty.close();
                           $("#txtpassword").focus();
                       }
                   }]);
            }
            else if (jsonData == "CHANGE") {
                AjaxManager.MsgBox('success', 'center', 'Chnage Password:', 'Login successful but need to change Password.',
                  [{
                      addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                          $noty.close();
                          window.location.href = "../Home/ChangePassword";
                      }
                  }]);
            }
            else if (jsonData == "CHANGESHORT" || jsonData == "CHANGELEAVE") {
                AjaxManager.MsgBox('success', 'center', 'Chnage Password:', 'Login successful but need to change Password.',
                  [{
                      addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                          $noty.close();
                          window.location.href = "../Home/ChangePassword";
                      }
                  }]);
            }
            else if (jsonData == "CHANGESuccess") {

                AjaxManager.MsgBox('success', 'center', 'Chnage Password:', 'Login successful but need to change Password.',
                 [{
                     addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                         $noty.close();
                         window.location.href = "../Home/ChangePassword";
                     }
                 }]);

            }
            else if (jsonData == "LATE") {
                AjaxManager.MsgBox('success', 'center', 'LATE:', 'You are LATE today! Please log your movement.',
                 [{
                     addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                         $noty.close();
                      
                     }
                 }]);


            }
            else if (jsonData == "NOTPERMITTED") {
                AjaxManager.MsgBox('warning', 'center', 'Warning:', 'You have no permission to Login! Please Contact With MIS',
                 [{
                     addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                         $noty.close();
                        
                     }
                 }]);

            }
            else if (jsonData == "LEAVE") {
                AjaxManager.MsgBox('success', 'center', 'Apply Leave:', 'You are too LATE today!. You don,t have any Short leave also. Please log your movement or Apply leave',
                 [{
                     addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                         $noty.close();
                     
                     }
                 }]);
            }
            else if (jsonData == "Success") {
              
                window.location.href = "../Dashboard/Dashboard";
            }
            else {

                AjaxManager.MsgBox('error', 'center', 'Login Failed', jsonData,
                     [{
                         addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                             $noty.close();
                             $("#txtpassword").focus();
                         }
                     }]);
            }
        }
        function onFailed(error) {
            AjaxManager.MsgBox('error', 'center', 'Login Failed', error,
                     [{
                         addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                             $noty.close();
                             $("#txtpassword").focus();
                         }
                     }]);
        }

    },
    resetPassword: function () {
        var loginId = $('#txtLoginIdForResetPassword').val();
        var oldpass = $('#txtoldPass').val();
        var password = $('#txtnewPass').val();
        var confirmpass = $('#txtResetConfirmPass').val();

        if (loginId == "") {
            alert("Login ID cannot be blank!");
            $('#txtLoginId').focus();
            return false;
        }

        if (oldpass == password) {
            alert("New password must have to be different from old password!");
            $('#txtnewPass').val('');
            $('#txtResetConfirmPass').val('');
            $('#txtnewPass').focus();
            return false;
        }

        if (password != confirmpass) {
            alert("Password does not match");
            $('#txtResetConfirmPass').val('');
            $('#txtconfirmPass').focus();
            return false;
        }

        var jsonParam = "loginId=" + loginId + "&oldpassword=" + oldpass + "&newpassword=" + confirmpass;
        var serviceURL = "../Home/ResetUserPassword";
        AjaxManager.SendJson(serviceURL, jsonParam, onSuccess, onFailed);
        function onSuccess(jsonData) {

            if (jsonData == "Success") {
                AjaxManager.MsgBox('success', 'center', 'Reset Successfull', 'Password reset successfully, Thank you!',
                    [{
                        addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                            $noty.close();
                            window.location.href = "../Home/Login";
                        }
                    }]);
            }
            else {
                AjaxManager.MsgBox('error', 'center', 'Failed', jsonData,
                       [{
                           addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                               $noty.close();
                           }
                       }]);
            }
        }
        function onFailed(error) {
            AjaxManager.MsgBox('error', 'center', 'Failed', error,
                        [{
                            addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                                $noty.close();
                            }
                        }]);
        }
    },

    ChangePassword: function () {
        var password = $('#txtnewPass').val();
        var confirmpass = $('#txtconfirmPass').val();

        if (password != confirmpass) {
            alert("Password doesnot match");
            $('#txtconfirmPass').val('');
            $('#txtconfirmPass').focus();
            return false;
        }

        var jsonParam = "password=" + password;
        var serviceURL = "../Home/ChangePassword";
        AjaxManager.SendJson(serviceURL, jsonParam, onSuccess, onFailed);
        function onSuccess(jsonData) {
            if (jsonData == "Success") {


                AjaxManager.MsgBox('success', 'center', 'Success:', 'Password Change Successfully',
                    [{
                        addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                            $noty.close();
                            var url = "../Home/Login";
                            window.location.href = url;
                        }
                    }]);



            }
            else {
                AjaxManager.MsgBox('error', 'center', 'Failed', jsonData,
                        [{
                            addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                                $noty.close();
                            }
                        }]);
            }
        }
        function onFailed(error) {
            AjaxManager.MsgBox('error', 'center', 'Failed', error,
                        [{
                            addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                                $noty.close();
                            }
                        }]);
        }
    },

    getCurrentUser: function () {
       
        var jsonParam = '';
        var pathName = window.location.pathname;
        var pageName = pathName.substring(pathName.lastIndexOf('/') + 1);
        var serviceURL = "../Home/GetCurrentUser";
        AjaxManager.GetJsonResult(serviceURL, jsonParam, false, false, onSuccess, onFailed);
        function onSuccess(jsonData) {
         
            CurrentUser = jsonData;
            if (CurrentUser != undefined) {
                var userName = "Welcome: " + CurrentUser.USERNAME;
             
                $("#lblWelcome").html(userName);
                //if (CurrentUser.FullLogoPath != null) {
                //    $("#headerLogo").attr('style', 'background-image: url("' + CurrentUser.FullLogoPath + '") !important');
                //}
            }
        }
        function onFailed(error) {
          
            window.alert(error.statusText);
        }
    },
};

var UserLoginHelper = {

};