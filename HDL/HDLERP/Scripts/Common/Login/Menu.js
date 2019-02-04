
var mnManager = {
    
    getMenu: function (moduleId) {
        var objMenuList = "";
        
        var pathName = window.location.pathname;
        var pageName = pathName.substring(pathName.lastIndexOf('/') + 1);
        var serviceURL = "../Menu/SelectMenuByUserPermission/";
        

        
        var jsonParam = "";// "moduleId=" + moduleId;
        AjaxManager.GetJsonResult(serviceURL, jsonParam, false, false, onSuccess, onFailed);
        function onSuccess(jsonData) {
          
            objMenuList = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }

        return objMenuList;
    },
    
    //getCurrentUser: function () {

    //    var jsonParam = '';
    //    var pathName = window.location.pathname;
    //    var pageName = pathName.substring(pathName.lastIndexOf('/') + 1);
    //    var serviceURL = "../Home/GetCurrentUser";
    //    AjaxManager.GetJsonResult(serviceURL, jsonParam, false, false, onSuccess, onFailed);
    //    function onSuccess(jsonData) {

    //        CurrentUser = jsonData;
    //        if (CurrentUser != undefined) {
    //            var userName = "Welcome: " + CurrentUser.USRNAME;

    //            $("#lblWelcome").html(userName);
    //            //if (CurrentUser.FullLogoPath != null) {
    //            //    $("#headerLogo").attr('style', 'background-image: url("' + CurrentUser.FullLogoPath + '") !important');
    //            //}
    //        }
    //    }
    //    function onFailed(error) {

    //        window.alert(error.statusText);
    //    }
    //},
    
    Logoff: function () {
        var serviceURL = "../Home/Logoff";
        window.location.href = serviceURL;
    },
 
};



var mnHelper = {
    GetMenuInformation: function() {
        var objMenuList = mnManager.getMenu(1);
        mnHelper.populateMenus(objMenuList);
        //mnManager.getCurrentUser(true);
        UserLoginManager.getCurrentUser();
        //mnHelper.showOrHideMenu();
        mnHelper.CreateQuickLink(objMenuList);
    },

    youLogedInAs: function() {
        var jsonParam = '';

        var serviceURL = "../Home/GetUserTypeByUserId";

        AjaxManager.GetJsonResult(serviceURL, jsonParam, false, false, onSuccess, onFailed);

//AjaxManager.SendJson(serviceURL, jsonParam, onSuccess, onFailed);
        function onSuccess(jsonData) {

            var logedInAs = "";
            var groupName = "";
            if (jsonData != undefined) {
                for (var i = 0; i < jsonData.length; i++) {
                    groupName += " " + jsonData[i].GroupName + " &";
                }
                var splitlogedInAs = groupName.slice(0, -1);
                logedInAs = "| You loged in as " + splitlogedInAs;
                $("#lblLogedinAs").html(logedInAs);

            }

        }

        function onFailed(error) {
            window.alert(error.statusText);
        }
    },


  
    populateMenus: function(menus) {
        var dynamicmenuArray = [];
        var chiledMenuArray = [];

        var menulink = "";

      
        //for (var i = 0; i < menus.length; i++) {
        //    if (menus[i].ParentMenu == null || menus[i].ParentMenu == 0) {
              
        //        menulink += "<li>";
        //        if (menus[i].MenuPath == null || menus[i].MenuPath == "") {
        //            menulink += '<a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" href="#">' + menus[i].MenuName + '<span class="caret"></span> </a>';
        //        } else if (menus[i].MenuPath != null && menus[i].ParentMenu == 0) {
        //            menulink += '<a  role="button" aria-haspopup="true" aria-expanded="false" href="' + menus[i].MenuPath + '">' + menus[i].MenuName + '</a>';
        //        }
        //        else {
        //            menulink += '<a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" href="' + menus[i].MenuPath + '">' + menus[i].MenuName + '</a>';
        //        }
        //        menulink += mnHelper.addchiledMenu(menus[i], menus[i].MenuId, menus, "dropdown-submenu");//dropdown-submenu

        //        menulink += "</li>";


        //    }
        //}


        for (var i = 0; i < menus.length; i++) {
            if (menus[i].ParentMenu == null || menus[i].ParentMenu == 0) {
                menulink += "<li class='has-sub'>";
                if (menus[i].MenuPath == null || menus[i].MenuPath == "") {
                    menulink += '<a  class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" href="#">' + menus[i].MenuName + '</a>';
                } else if (menus[i].MenuPath != null && menus[i].ParentMenu == 0) {
                    //menulink += '<a role="button" aria-haspopup="true" aria-expanded="false" href="' + menus[i].MenuPath + '">' + menus[i].MenuName + '</a>';
                    menulink += '<a role="button" aria-haspopup="true" aria-expanded="false" href="' + menus[i].MenuPath + '"><img src="../Images/hg3.png" width="50px" height="20px" style="vertical-align: middle;"></a>';
                }
                else {
                    menulink += '<a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"  href="' + menus[i].MenuPath + '">' + menus[i].MenuName + '</a>';
                }
                menulink += mnHelper.addchiledMenu(menus[i], menus[i].MenuId, menus, "has-sub dropdown-submenu");//dropdown-submenu

                menulink += "</li>";


            }
        }
        var menu = $("#kendoMenu").kendoMenu().data("kendoMenu");
        menu.append(menulink);
        $("#kendoMenu").kendoMenu();
        $("#kendoMenu").removeClass("k-header").removeClass("k-widget");
    },
  

    addchiledMenu: function (objMenuOrginal, menuId, objMenuList,cls) {
        var menulink = '<ul class="submenu">';
        var added = false;
        for (var j = 0; j < objMenuList.length; j++) {
            if (objMenuList[j].ParentMenu == menuId) {
                menulink += '<li class="'+cls+'">';
                if (objMenuList[j].MenuPath == null) {
                    menulink += objMenuList[j].MenuName;
                }
                else {
                    menulink += "<a href='" + objMenuList[j].MenuPath + "'>" + objMenuList[j].MenuName + "</a>";
                }
                menulink += mnHelper.addchiledMenu(objMenuList[j], objMenuList[j].MenuId, objMenuList, "");
                menulink += "</li>";
                added = true;
            }
        }
        menulink += '</ul>';
        if (added == false) {
            menulink = "";
        }

        return menulink;
    },

    CreateQuickLink: function (menus) {
        var quickLink = "";
        for (var i = 0; i < menus.length; i++) {
            if (menus[i].ToDo == 1) {
                quickLink += "<li class='quicklinkbtn'>";
                quickLink += '<a  role="button" style=" color:#ffffff;  font-size: 1.5em;"  href="' + menus[i].MenuPath + '">' + menus[i].MenuName + '</a>';
                quickLink += "</li>";
            }
        }
        $("#quickLinkUl").append(quickLink);
    }
   
};