var PhotoUploadManager = {
    GetMemberPicture: function () {
        var jsonParam = "";
        var serviceUrl = "../EmployeeBasic/GetPersonalProfilePicture/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            if (jsonData != "") {
                $("#imgEmpPhoto").attr('src', "");
                $("#imgEmpPhoto").attr('src', jsonData);
            } else {
                $("#imgEmpPhoto").attr('src', "");
            }
        }
        function onFailed(error) {
            $("#imgEmpPhoto").attr('src', error.responseText);
        }
    },
};

var PhotoUploadHelper = {
    InitPhotoUpload:function() {
        PhotoUploadHelper.profilePictureUpload();
    },

    profilePictureUpload: function() {
        $("#imgEmpPhoto").attr('src', "");

        $("#files").kendoUpload({
            upload: onUpload,
            multiple: false,
            success: onSuccess,
            error: onError,
            select: onSelect,
            async: {
                saveUrl: "../EmployeeBasic/ProfilePictureSave",
                removeUrl: "../EmployeeBasic/ProfilePictureRemove",
                autoUpload: true
            },
            localization: {
                select: "Browse Picture",

            }
        });

        function onUpload(e) {

            // Array with information about the uploaded files
            var files = e.files;
            if (files[0].size > 3175000) {
                alert("File must be less than 3MB");
                e.preventDefault();
                return;
            }

            //// Check the extension of each file and abort the upload if it is not .jpg
            $.each(files, function () {
                if ((this.extension != ".jpg") && (this.extension != ".png") && (this.extension != ".gif") && (this.extension != ".JPG") && (this.extension != ".PNG") && (this.extension != ".GIF")) {
                    alert("Only .jpg/.png files can be uploaded as Company logo.");
                    e.preventDefault();
                }
            });
        }
        function onSuccess(e) {

            // Array with information about the uploaded files

            var files = e.files;
            if (e.operation == "upload") {
                PhotoUploadManager.GetMemberPicture();
            }
            if (e.operation == "remove") {
                $("#imgMemberPhoto").attr('src', "");
                // MemberDetailsManager.GetMemberPicture();
            }
        }
        function onError(e) {

            // Array with information about the uploaded files
            var files = e.files;

            if (e.operation == "upload") {
                alert("Failed to uploaded " + files.length + " files");
            }
        }
        function onSelect(e) {
            // Array with information about the uploaded files

        }
    },

}