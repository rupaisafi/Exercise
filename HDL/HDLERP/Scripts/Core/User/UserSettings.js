$(document).ready(function() {
  
    smsCommonHelper.GenerateUserCombo("cmbUser");
    UserSummaryHelper.InitUserSummary();
  
    UserDetailsHelper.InitUserDetails();
    $("#cmbModuleName").kendoComboBox();

    menuPermissionSummaryHelper.InitMenuPermissionSummary();
})