
showSpinner();
 
     //Call Web service 

var urlstr = "http://162.144.253.91/chamsMobileWS/api.svc/";
var urlstr_custom = "http://162.144.253.91/nse_MobileWS/api.svc/";

$.jStorage.set("url", "http://162.144.253.91/nseMembership/");
$.jStorage.set("chat_channel", "nseprivate");
$.jStorage.set("orgid", "1");



//load titles list
    $.ajax({
        url: urlstr + "titles", type: "GET",
        success: function (data) {

            $("#titleList").append("<option value='999999'>Select Title</option>");

            $.each(data, function (index, element) {

                $("#titleList").append("<option value='" + element.id + "'>" + element.name + "</option>");

            });

            
            hideSpinner();
        }, error: function (xhr) {

        
        }
    });


    //load employment list
    $.ajax({
        url: urlstr + "employmentstatus", type: "GET",
        success: function (data) {

            $.each(data, function (index, element) {

                $("#employmentList").append("<option value='" + element.id + "'>" + element.name + "</option>");

            });


            hideSpinner();
        }, error: function (xhr) {

             
        }
    });


    //load educationlevel list
    $.ajax({
        url: urlstr + "educationlevels", type: "GET",
        success: function (data) {

            $.each(data, function (index, element) {

                $("#EducationLevelList").append("<option value='" + element.id + "'>" + element.name + "</option>");

            });


            hideSpinner();
        }, error: function (xhr) {

           
        }
    });



    //load residence list
    $.ajax({
        url: urlstr + "residencestatus", type: "GET",
        success: function (data) {

            $.each(data, function (index, element) {

                $("#residenceList").append("<option value='" + element.id + "'>" + element.name + "</option>");

            });


            hideSpinner();
        }, error: function (xhr) {
 
        }
    });




    //load marital status list
    $.ajax({
        url: urlstr + "maritalstatus", type: "GET",
        success: function (data) {

            $.each(data, function (index, element) {

                $("#maritalstatusList").append("<option value='" + element.id + "'>" + element.name + "</option>");

            });


            hideSpinner();
        }, error: function (xhr) {

             
        }
    });




    //load religion list
    $.ajax({
        url: urlstr + "religions", type: "GET",
        success: function (data) {

            $.each(data, function (index, element) {

                $("#religionList").append("<option value='" + element.id + "'>" + element.name + "</option>");

            });


            hideSpinner();
        }, error: function (xhr) {

            
        }
    });





    //load relationship list
    $.ajax({
        url: urlstr + "relationships", type: "GET",
        success: function (data) {

            $.each(data, function (index, element) {

                $("#relationshipList").append("<option value='" + element.id + "'>" + element.name + "</option>");

            });


            hideSpinner();
        }, error: function (xhr) {

            
        }
    });




    //load states list
    $.ajax({
        url: urlstr + "states", type: "GET",
        success: function (data) {

            $("#StateList1").append("<option value='999999'>Select State</option>");
            $("#StateList2").append("<option value='999999'>Select State</option>");

            $.each(data, function (index, element) {

                $("#StateList1").append("<option value='" + element.id + "'>" + element.name + "</option>");
                $("#StateList2").append("<option value='" + element.id + "'>" + element.name + "</option>");

            });


            hideSpinner();
        }, error: function (xhr) {

            
        }
    });



//on stalelist selected
    $("#StateList1").on("change", function () {

        showSpinner();

        $.ajax({
            url: urlstr + "lgas/" + $("#StateList1").val(), type: "GET",
            success: function (data) {

                $("#LGAList1 option").remove();
             

                $.each(data, function (index, element) {

                    $("#LGAList1").append("<option value='" + element.id + "'>" + element.name + "</option>");
                    
                });


                hideSpinner();
            }, error: function (xhr) {

                showMessage("Internet Connection Error");

                return;
            }
        });


    });


    $("#StateList2").on("change", function () {

        showSpinner();

        $.ajax({
            url: urlstr + "lgas/" + $("#StateList2").val(), type: "GET",
            success: function (data) {

                $("#LGAList2 option").remove();

                $.each(data, function (index, element) {

                    $("#LGAList2").append("<option value='" + element.id + "'>" + element.name + "</option>");

                });


                hideSpinner();
            }, error: function (xhr) {

                showMessage("Internet Connection Error");

                return;
            }
        });









    });



    

