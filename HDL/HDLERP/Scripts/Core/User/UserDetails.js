
var UserDetailsManager = {
    SaveUserPermission: function () {
        var validator = $("#divUserDetails").kendoValidator().data("kendoValidator"),
         status = $(".status");

        if (validator.validate()) {
            var userObject = UserDetailsHelper.CreateUserObj();
            var usrObj = JSON.stringify(userObject);
            var objUserMenuList = JSON.stringify(gbSelectiveMenuArray);
            var objRemovedMenuList = JSON.stringify(gbRemovedMenuArray);
            var jsonParam = 'usrObj:' + usrObj + ',objUserMenuList:' + objUserMenuList + ',objRemovedMenuList:' + objRemovedMenuList;
            var serviceUrl = "../User/SaveUserPermission/";
            AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);
        } else {
            var tabToActivate = $("#tab1");
            $("#tabstrip").kendoTabStrip().data("kendoTabStrip").activateTab(tabToActivate);
        }

        function onSuccess(jsonData) {
            if (jsonData == "Success") {
                var conversationId = $("#hdnUserId").val();
                var message = "";
                if (conversationId == "0") {
                    message = "Saved Successfully";
                } else {
                    message = "Updated Successfully";
                }
                AjaxManager.MsgBox('success', 'center', 'Success:', message,
                    [{
                        addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                            $noty.close();
                            gbSelectiveMenuArray = [];
                            gbRemovedMenuArray = [];
                            $("#gridMenuPermission").data("kendoGrid").dataSource.read();
                            $("#grdUserSummary").data("kendoGrid").dataSource.read();
                        }
                    }]);
            }
            else if (jsonData == "Exists") {

                AjaxManager.MsgBox('warning', 'center', 'Already Exists:', 'Already Exist !',
                      [{
                          addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                              $noty.close();
                          }
                      }]);
            }
            else {
                AjaxManager.MsgBox('error', 'center', 'Error', jsonData,
                        [{
                            addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                                $noty.close();
                            }
                        }]);
            }
        }

        function onFailed(error) {
            AjaxManager.MsgBox('error', 'center', 'Error', error.statusText,
                        [{
                            addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                                $noty.close();
                            }
                        }]);
        }
    },
};

var UserDetailsHelper = {

    InitUserDetails: function () {
        UserDetailsHelper.createTab();
        HdlCommonHelper.GenerateUserTypeCombo("cmbUserType");

        $("#btnSaveUser").click(function () {
            UserDetailsManager.SaveUserPermission();
        });

        $("#btnClear").click(function () {
            UserDetailsHelper.ClearForm();
        });
    },

    createTab: function () {
        $("#tabstrip").kendoTabStrip({});
    },

    CreateUserObj: function () {

        var obj = new Object();
        // obj.UserId = $("#hdnUserId").val();
        obj.EmpId = $("#txtUserId").val();
        obj.UserName = $("#txtUserName").val();
        obj.UsrPass = $("#txtNewPassword").val();
        obj.UsrDesig = $("#txtDesig").val();
        obj.UserType = $("#cmbUserType").data("kendoComboBox").value();
        return obj;
    },
    ClearForm: function () {
        gbSelectiveMenuArray = [];
        gbRemovedMenuArray = [];
        $("#txtUserId").val("");
        $("#txtUserName").val("");
        $("#txtDesig").val("");
        $("#txtNewPassword").val("");
        $("#cmbUserType").data("kendoComboBox").value("");

        $("#gridMenuPermission").data("kendoGrid").dataSource.read();
        $("#gridMenuPermission tbody input:checkbox").removeAttr("checked", this.checked);
        $("#divUserDetails > form").kendoValidator();
        $("#divUserDetails").find("span.k-tooltip-validation").hide();
        var status = $(".status");
        status.text("").removeClass("invalid");
    }
}