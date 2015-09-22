
$.mobile.page.prototype.options.domCache = true;

 
//onload methods
 

$(document).on("pageshow", "#home", function () {
     
    //check if user session is still on
    if ($.jStorage.get("name") != null) {

    $.mobile.changePage("#newsfeeds", { transition: 'slide' });
    }


    //check for saved registrations
    if ($.jStorage.get("complete") == "0") {

        $.mobile.changePage("#saved", { transition: 'slide' });
    }


    

    //check if voice is enabled
    if ($.jStorage.get("voice") == "1") {
        $("#chkvoice").attr("checked", true);

    } else {
        $("#chkvoice").attr("checked", false);

    }

    $("#btnEnroll").trigger('create');
    $("#btnRetrieve_").trigger('create');



    



});





 

$(document).on("pageshow", "#biodata", function () {
     
    //set date pickers
       
    var picker5 = $("#DateOfBirth", this);
    picker5.mobipick();
    picker5.on("change", function () {
        var date = $(this).val();

        // formatted date					
        var dateObject = $(this).mobipick("option", "date");
    });


    //play sound

    if ($.jStorage.get("voice") == "1") {
        $("#btnVoiceBiodata").show();

    } else {


        $("#btnVoiceBiodata").hide();
    }




});


$(document).on("pageshow", "#personal", function () {


    //play sound

    if ($.jStorage.get("voice") == "1") {
        $("#btnVoicePersonal").show();

    } else {


        $("#btnVoicePersonal").hide();
    }




});
 

$(document).on("pageshow", "#parent", function () {


    //play sound

    if ($.jStorage.get("voice") == "1") {
        $("#btnVoiceParent").show();

    } else {


        $("#btnVoiceParent").hide();
    }




});


$(document).on("pageshow", "#nextofkin", function () {


    //play sound

    if ($.jStorage.get("voice") == "1") {
        $("#btnVoiceNextOfKin").show();

    } else {


        $("#btnVoiceNextOfKin").hide();
    }




});


$(document).on("pageshow", "#address", function () {


    //play sound

    if ($.jStorage.get("voice") == "1") {
        $("#btnVoiceAddress").show();

    } else {


        $("#btnVoiceAddress").hide();
    }




});


$(document).on("pageshow", "#education", function () {


    //play sound

    if ($.jStorage.get("voice") == "1") {
        $("#btnVoiceEducation").show();

    } else {


        $("#btnVoiceEducation").hide();
    }




});

$(document).on("pageshow", "#success", function () {


    $("#enrollid").html("Your Enrollment ID is " + $.jStorage.get("enrollmentId"));




});






$(document).on("pageshow", "#newsfeeds", function () {



    showSpinner();

    $("#nprofile").text($.jStorage.get("name"));
    $("#nprofilepic").hide();
    $("#nprofilediv").css("background", "url(" + $.jStorage.get("url") + "photo/" + $.jStorage.get("biodataid") + ".jpg" + ")");
    $("#npanel").trigger("updatelayout");


    //open panel on swipe
    $(document).on("swipeleft swiperight", "#newsfeeds", function (e) {
            if ($(".ui-page-active").jqmData("panel") !== "open") {
              if (e.type === "swiperight") {
                $("#npanel").panel("open");
            }
        }
    });

    $.ajax({
        url: urlstr_custom + "newsfeeds", type: "GET",
        success: function (data) {

            if (data == "") {
                document.getElementById("lblalert").innerHTML = "<br/><br/><span class='ui-bar ui-bar-b'> No news feed available</span>";

                return;
            }

            $("#NewsFeedsList").empty();

            $.each(data, function (index, element) {
               
                $("#NewsFeedsList").append("<li><a href='#' onclick='getNewsFeed(" + element.id + ");'><h1>" + element.title + "</h1><p>" + element.date + "</p></a></li>");

                     

            });
            $("#NewsFeedsList").listview('refresh');

            hideSpinner();
        }, error: function (xhr) {

            showMessage("Internet Connection Error " );

            return;
        }
    });

   



});

function htmlDecode(html) {
    var a = document.createElement('a'); a.innerHTML = html;
    return a.textContent;
};

function getNewsFeed(id)
{
    showSpinner();

    $.ajax({
        url: urlstr_custom + "newsfeed/" + id, type: "GET",
        success: function (data) {


            $.each(data, function (index, element) {

                $.jStorage.set("tempFeedText", htmlDecode(element.text));
                $.jStorage.set("tempFeedTitle", element.title);

               


            });


            hideSpinner();

            $.mobile.changePage("#newsfeed");

        }, error: function (xhr) {

            showMessage("Internet Connection Error " + xhr.statusText);

            return;
        }
    });
   

}

 

$(document).on("pageshow", "#newsfeed", function () {

    

    $("#lbltext").html($.jStorage.get("tempFeedText"));

    $("#lbltitle").text($.jStorage.get("tempFeedTitle"));



    $("#nnprofile").text($.jStorage.get("name"));
    $("#nnprofilepic").hide();
    $("#nnprofilediv").css("background", "url(" + $.jStorage.get("url") + "photo/" + $.jStorage.get("biodataid") + ".jpg" + ")");
    $("#nnpanel").trigger("updatelayout");

    //open panel on swipe
    $(document).on("swipeleft swiperight", "#newsfeed", function (e) {
        if ($(".ui-page-active").jqmData("panel") !== "open") {
            if (e.type === "swiperight") {
                $("#nnpanel").panel("open");
            }
        }
    });
});


$(document).on("pageshow", "#payments", function () {

    showSpinner();

    $("#pprofile").text($.jStorage.get("name"));
    $("#pprofilepic").hide();
    $("#pprofilediv").css("background", "url(" + $.jStorage.get("url") + "photo/" + $.jStorage.get("biodataid") + ".jpg" + ")");
    $("#ppanel").trigger("updatelayout");
   

    //open panel on swipe
    $(document).on("swipeleft swiperight", "#payments", function (e) {
        if ($(".ui-page-active").jqmData("panel") !== "open") {
            if (e.type === "swiperight") {
                $("#ppanel").panel("open");
            }
        }
    });

    $.ajax({
        url: urlstr_custom + "payments/" + $.jStorage.get("userid"), type: "GET",
        success: function (data) {
            

            if ( data  == "") { 
                document.getElementById("plblalert").innerHTML = "<br/><br/><span class='ui-bar ui-bar-b'> No Payments history</span>";
                hideSpinner();
                return;
            }


            $("#PaymentsList").empty();

            $.each(data, function (index, element) {


               
                $("#PaymentsList").append("<li><a href='#'><img src='images/payment.png' /><h1>" + element.title + "</h1><p>"  + element.status +  "</p></a></li>");



            });
            $("#PaymentsList").listview('refresh');

            hideSpinner();
        }, error: function (xhr) {

        //    showMessage("Internet Connection Error " + xhr.statusText);

            return;
        }
    });



});

$(document).on("pageshow", "#feedback", function () {

 

    $("#fprofile").text($.jStorage.get("name"));
    $("#fprofilepic").hide();
    $("#fprofilediv").css("background", "url(" + $.jStorage.get("url") + "photo/" + $.jStorage.get("biodataid") + ".jpg" + ")");
    $("#fpanel").trigger("updatelayout");

    //open panel on swipe
    $(document).on("swipeleft swiperight", "#feedback", function (e) {
        if ($(".ui-page-active").jqmData("panel") !== "open") {
            if (e.type === "swiperight") {
                $("#fpanel").panel("open");
            }
        }
    });
});



$(document).on("pageshow", "#chat", function () {

   
    $("#cprofile").text($.jStorage.get("name"));
    $("#cprofilepic").hide();
    $("#cprofilediv").css("background", "url(" + $.jStorage.get("url") + "photo/" + $.jStorage.get("biodataid") + ".jpg" + ")");
    $("#cpanel").trigger("updatelayout");


    //open panel on swipe
    $(document).on("swipeleft swiperight", "#chat", function (e) {
        if ($(".ui-page-active").jqmData("panel") !== "open") {
            if (e.type === "swiperight") {
                $("#cpanel").panel("open");
            }
        }
    });

 

});

function StartChat(biodataid,name)
{
     

                $.jStorage.set("tempChatPartnerBiodataId", biodataid);
                $.jStorage.set("tempChatPartnerName", " You and " + decodeURIComponent(name));
     
                $.mobile.changePage("#ChatPage");
     
}



$(document).on("pageshow", "#ChatPage", function () {

     
    document.getElementById("lblmsgs").innerHTML = "";   //clear chat


    $("#chatPartner").text($.jStorage.get("tempChatPartnerName"));
    $("#ccprofile").text($.jStorage.get("name"));
    $("#ccprofilepic").hide();
    $("#ccprofilediv").css("background", "url(" + $.jStorage.get("url") + "photo/" + $.jStorage.get("biodataid") + ".jpg" + ")");
    $("#ccpanel").trigger("updatelayout");


    //open panel on swipe
    $(document).on("swipeleft swiperight", "#ChatPage", function (e) {
        if ($(".ui-page-active").jqmData("panel") !== "open") {
            if (e.type === "swiperight") {
                $("#ccpanel").panel("open");
            }
        }
    });
    
  
    
          
    pubnub = PUBNUB.init({
        publish_key: 'pub-c-f00954b1-b098-4691-b2e4-9ad2416530ec',
        subscribe_key: 'sub-c-1108556e-d3c8-11e4-8323-02ee2ddab7fe',
        uuid: $.jStorage.get("name") + "-" + $.jStorage.get("biodataid")
    })


   pubnub.subscribe({
    channel: $.jStorage.get("chat_channel"),
    message: function (message) {
                
        var respObj = JSON.parse(JSON.stringify(message));


        //if (respObj.from == $.jStorage.get("biodataid") && respObj.to == $.jStorage.get("tempChatPartnerBiodataId")) {

        //    document.getElementById("lblmsgs").innerHTML += "<br/><br/><div     class='lbubble' >" + respObj.message + "</div><br/><br/><br/> ";
        //}

        if (respObj.to == $.jStorage.get("biodataid") && respObj.from == $.jStorage.get("tempChatPartnerBiodataId")) {

            document.getElementById("lblmsgs").innerHTML += "<br/><br/><div     class='rbubble' >" + respObj.message + "<br/><i><small>" + timeSince(Date.parse(respObj.date)) + "</small></i></div><br/><br/><br/> ";

        }



                    
        $("#chatPanel").scrollTop($("#chatPanel")[0].scrollHeight  );

       
        
      //  playAudio("/sounds/notify.mp3"); //playsound
                     
                     
                     
    } 
})
   

     

//get chat history
history();

          

$("#btnChat").on("click", function () {

   
    pub();

})



function pub() {


    //validate text
    if (document.getElementById("txtmsg").value.length == 0) {
        return;
    }
   
     
    var msg = "<table border='0'><tr valign='middle'><td><img style='padding:5px;' src='images/" + $.jStorage.get("name").toString().substring(0, 1).toLowerCase() + ".png' width='40px' /></td><td> <b>" + $.jStorage.get("name") + ":</b> " + document.getElementById("txtmsg").value + "</td></tr></table>";
    var msg2 = "<table border='0'><tr valign='middle'><td><img style='padding:5px;' src='images/" + $.jStorage.get("name").toString().substring(0, 1).toLowerCase() + ".png' width='40px' /></td><td> <b>" + $.jStorage.get("name") + ":</b> " + document.getElementById("txtmsg").value + "<br/><i><small>" + timeSince(new Date()) + "</small></i></td></tr></table>";
    document.getElementById("lblmsgs").innerHTML += "<br/><br/><div     class='lbubble' >" + msg2 + "</div><br/><br/><br/> ";

    document.getElementById("txtmsg").value = "";


        pubnub.publish({
            channel: $.jStorage.get("chat_channel"),
            message: {
                from: $.jStorage.get("biodataid"),
                to: $.jStorage.get("tempChatPartnerBiodataId"),
                message: msg,
                date: new Date()
            },
            callback: function (m) {

              

            }
        })

     
}


function history() {
    showSpinner();
    

    //Load History and Store 
    pubnub.history({
        channel: $.jStorage.get("chat_channel"),
        count: 100,
        callback: function (m) {

            hideSpinner();

            var res = m;
            var msg = m[0];

             
            for (var y = 0; y < msg.length; y++)
            {


                var respObj = JSON.parse(JSON.stringify(msg[y]));

                if (respObj.from == $.jStorage.get("biodataid") && respObj.to == $.jStorage.get("tempChatPartnerBiodataId")) {

                    document.getElementById("lblmsgs").innerHTML += "<br/><br/><div     class='lbubble' >" + respObj.message + "<br/><i><small>" + timeSince(Date.parse(respObj.date)) + "</small></i></div><br/><br/><br/> ";
                }

                if (respObj.to == $.jStorage.get("biodataid") && respObj.from == $.jStorage.get("tempChatPartnerBiodataId")) {

                    document.getElementById("lblmsgs").innerHTML += "<br/><br/><div     class='rbubble' >" + respObj.message + "<br/><i><small>" + timeSince(Date.parse(respObj.date)) + "</small></i></div><br/><br/><br/> ";

                }



            }

        }
    });

           
            
}
     
});

 
//Voice buttons

$("#chkvoice").on("change", function () {

    if (this.checked)
    {

        $.jStorage.set("voice", "1");

    }
    else
    {
        $.jStorage.set("voice", "0");
        
    }
});

 
 $("#btnVoiceBiodata").click(function () {
     showSpinner();
     playAudio("http://translate.google.com/translate_tts?ie=UTF-8&tl=en&q=" + "Fill in your Biographic Information.");

 });


 $("#btnVoicePersonal").click(function () {
     showSpinner();
     playAudio("http://translate.google.com/translate_tts?ie=UTF-8&tl=en&q=" + "Fill in your Personal Information.");

 });


 $("#btnVoiceParent").click(function () {
     showSpinner();
     playAudio("http://translate.google.com/translate_tts?ie=UTF-8&tl=en&q=" + "Fill in your Parent's Information.");

 });

 $("#btnVoiceNextOfKin").click(function () {
     showSpinner();
     playAudio("http://translate.google.com/translate_tts?ie=UTF-8&tl=en&q=" + "Fill in your Next of Kin Information.");

 });


 $("#btnVoiceAddress").click(function () {
     showSpinner();
     playAudio("http://translate.google.com/translate_tts?ie=UTF-8&tl=en&q=" + "Fill in your Residential address Information.");

 });

 $("#btnVoiceEducation").click(function () {
     showSpinner();
     playAudio("http://translate.google.com/translate_tts?ie=UTF-8&tl=en&q=" + "Fill in your latest level of Educational qualification.");

 });

//End of Voice Buttons


 function SignOut() {
     $.jStorage.deleteKey("name");
     $.jStorage.deleteKey("biodataid");
     $.jStorage.deleteKey("email");
     $.jStorage.deleteKey("phone");
     $.jStorage.deleteKey("userid");

     navigator.app.exitApp();

 }

 $("#btnSignIn").on("click", function () {
     showSpinner();
 

     $.ajax({
         url: urlstr_custom + "login/?username=" + $("#txtUsername").val() + "&password=" + $("#txtPassword").val(), type: "GET",
         success: function (data) {

              

             $.each(data, function (index, element) {

                 if (element.status == "0") {


                     hideSpinner();

          

                     showMessage("Wrong Login details. Try again.");
                     return;

                 } else {

                     $.jStorage.set("name", element.name);
                     $.jStorage.set("biodataid", element.biodataid);
                     $.jStorage.set("email", element.email);
                     $.jStorage.set("phone", element.phone);
                     $.jStorage.set("userid", element.userid);

 



                     //load chat users
                     $.ajax({
                         url: urlstr_custom + "usersforchat/" + $.jStorage.get("biodataid"), type: "GET",
                         success: function (data) {

                             $.jStorage.set("chatUsers", data);

                         }, error: function (xhr) {

                              
                         }
                     });



                     $.mobile.changePage("#newsfeeds");

                 }
             });


             hideSpinner();
         }, error: function (xhr) {

             showMessage("Internet Connection Error " + xhr.statusText);

             return;
         }
     });

 });

 $("#btnSendFeedBack").on("click", function () {
     showSpinner();
 
     $.ajax({
         url: urlstr_custom + "feedback/?name=" + $.jStorage.get("name")  + "&comment=" + $("#txtComment").val(), type: "GET", 
         success: function (data) {



             $.each(data, function (index, element) {


                 showMessage(element.status);
                 $("#txtComment").att("value","");

             });


             hideSpinner();
             
         }, error: function (xhr) {

             showMessage("Internet Connection Error " + xhr.statusText);

             return;
         }
     });



 });


 $("#btnRetrieve").on("click", function () {

     showSpinner();


     $.ajax({
         url: urlstr + "retrievedata/" + $("#txtEnrollmentId").val(), type: "GET",
         success: function (data) {

              
             $.each(data, function (index, element) {

                 if (element.photo == null) {

                     showMessage("This ID does not exist. Try again.");
                     return;

                 } else {

                     $("#qrcode").attr("src", "data:image/jpeg;base64," + element.qrcode);
                     $("#rphoto").attr("src", "data:image/jpeg;base64," + element.photo);

                 }
             });


             hideSpinner();
         }, error: function (xhr) {

             showMessage("Internet Connection Error");

             return;
         }
     });



 });


  
 $("#btnBiodata").on("click", function () {


     //validate controls
     var surname = $("#txtSurname").val();
     var firstname = $("#txtFirstname").val();
     var middlename = $("#txtMiddlename").val();
     var dob = $("#DateOfBirth").val();

     var biodata;
     if (surname.length > 0 && firstname.length > 0 && dob.length > 0 && $("#LGAList1").val() > 0 && $("#LGAList2").val() > 0) {

         biodata = $("#titleList").val() + "|" + surname + "|" + firstname + "|" + middlename + "|" + $("#txtMaidenName").val() + "|" +
             dob + "|" + $("#LGAList1").val() + "|" + $("#LGAList2").val() + "|" + $("#txtTownOfResidence").val();

         //set biodata value
             $.jStorage.set("biodata", biodata);
            
         $.mobile.changePage("#personal", { transition: 'slide' });

     } else {


         showMessage("Please enter your Surname, Firstname, Date of Birth and LGAs.");
     }


 });


 $("#btnPersonal").on("click", function () {


     //validate controls
     var email= $("#txtEmail").val();
     var phone = $("#txtPhone").val();
      
     var personal;
     if (email.length > 0 && phone.length > 0 ) {

         personal = $("#GenderList").val() + "|" + $("#religionList").val() + "|" + $("#txtHeight").val() + "|" + $("#CountryList").val() + "|" + $("#txtEmail").val() + "|" +
             $("#txtPhone").val() + "|" + $("#txtDisability").val() + "|" + $("#txtPhysical").val() + "|" + $("#employmentList").val() + "|" +
             $("#residenceList").val() + "|" + $("#maritalstatusList").val() ;

         //set personal value
         $.jStorage.set("personal", personal);

         $.mobile.changePage("#parent", { transition: 'slide' });

     } else {


         showMessage("Please enter your Email and Phone Number.");
     }

 });



 $("#btnParent").on("click", function () {

     //validate controls
     var fsurname = $("#txtFatherSurname").val();
     var ffirstname = $("#txtFatherFirstname").val();
     var msurname = $("#txtMotherSurname").val();
     var mfirstname = $("#txtMotherFirstname").val();

     var parent;
     if (fsurname.length > 0 && ffirstname.length > 0 && msurname.length > 0 && ffirstname.length > 0) {

         parent = fsurname + "|" + ffirstname + "|" + $("#txtFatherMiddlename").val() + "|" + msurname + "|" + mfirstname + "|" +
             $("#txtMotherMiddlename").val() ;

         //set personal value
         $.jStorage.set("parent", parent);

         $.mobile.changePage("#nextofkin", { transition: 'slide' });

     } else {


         showMessage("Please enter at least Father/Mother Surname and Firstnames.");
     }

 });



 $("#btnNextOfKin").on("click", function () {

     //validate controls
     var surnamenk = $("#txtSurnamenk").val();
     var firstnamenk = $("#txtFirstnamenk").val();

     var nextofkin;
     if (surnamenk.length > 0 && firstnamenk.length > 0) {

         nextofkin = surnamenk + "|" + firstnamenk + "|" + $("#txtMiddlenamenk").val() + "|" + $("#relationshipList").val() + "|" + $("#txtAddress1nk").val() + "|" +
             $("#txtAddress2nk").val();

         //set next of kin value
         $.jStorage.set("nextofkin", nextofkin);

         $.mobile.changePage("#address", { transition: 'slide' });

     } else {


         showMessage("Please enter your Surname and Firstname.");
     }

 });



 $("#btnAddress").on("click", function () {

     //validate controls
     var address1 = $("#txtAddress1").val();
     
     var address;
     if (address1.length > 0) {

         address = address1 + "|" + $("#txtAddress2").val();

         //set personal value
         $.jStorage.set("address", address);

         $.mobile.changePage("#education", { transition: 'slide' });

     } else {


         showMessage("Please enter your residential address.");
     }

 });


 $("#btnEducation").on("click", function () {

     //validate controls
     var school = $("#txtSchool").val();
     var course = $("#txtCourse").val();
     var grade = $("#txtGrade").val();

     var education;
     if (school.length > 0 && course.length > 0 && grade.length > 0) {

         education = $("#EducationLevelList").val() + "|" + $("#txtGrade").val() + "|" + $("#txtCourse").val() + "|" + $("#txtSchool").val() + "|" + $("#txtYearObtained").val();

         //set education value
         $.jStorage.set("education", education);

         $.mobile.changePage("#photo", { transition: 'slide' });

     } else {


         showMessage("Please enter your School,Course and Grade.");
     }

 });



 $("#btnSuccess").on("click", function () {

     navigator.app.exitApp();

 });



 $("#btnFailure").on("click", function () {

     navigator.app.exitApp();

 });


 $("#btnComplete").on("click", function () {

     showSpinner();

     var base64 = $("#base64str").val();

     

     if (base64.length > 0) {

         //set photo value
         $.jStorage.set("photo", base64);


         //Call Web service

         var _json = {};
         _json.orgid = $.jStorage.get("orgid");
         _json.biodata = $.jStorage.get("biodata");
         _json.personal = $.jStorage.get("personal");
         _json.parent = $.jStorage.get("parent");
         _json.nextofkin = $.jStorage.get("nextofkin");
         _json.address = $.jStorage.get("address");
         _json.education = $.jStorage.get("education");
         _json.photo = $.jStorage.get("photo");

        
              
             $.ajax({
                 url: urlstr + "enroll", type: "POST", data: JSON.stringify(_json),contentType: "application/json; charset=utf-8",dataType: "json",
                 success: function (data) {

                     var resp;
                     var id;
                     $.each(data, function (index, element) {

                         resp = element.response;
                         id = element.id;
                     });

                     if (resp == "1") {


                         //set to 1 upon successful enrollment
                         $.jStorage.set("complete", "1");
                         $.jStorage.set("enrollmentId", id);
                         $.mobile.changePage("#success", { transition: 'slide' });
                         hideSpinner();
                         

                     }
                     else
                     {
                         //set to 0 
                         $.jStorage.set("complete", "0");
                         $.mobile.changePage("#failure", { transition: 'slide' });
                         hideSpinner();
                     }

                 }, error: function (xhr) {


                     //set to 1 upon successful enrollment
                     $.jStorage.set("complete", "0");
                     $.mobile.changePage("#failure", { transition: 'slide' });

                     hideSpinner();

                 }
             });





     } else {

         showMessage("Please capture or select a photo");
         return



     }

   
 });




 $("#btnPushToServer").on("click", function () {

 
     showSpinner();


         //Call Web service

         var _json = {};
         _json.orgid = $.jStorage.get("orgid");
         _json.biodata = $.jStorage.get("biodata");
         _json.personal = $.jStorage.get("personal");
         _json.parent = $.jStorage.get("parent");
         _json.nextofkin = $.jStorage.get("nextofkin");
         _json.address = $.jStorage.get("address");
         _json.education = $.jStorage.get("education");
         _json.photo = $.jStorage.get("photo");



         $.ajax({
             url: urlstr + "enroll", type: "POST", data: JSON.stringify(_json), contentType: "application/json; charset=utf-8", dataType: "json",
             success: function (data) {
 

                 var resp;
                 var id;
                 $.each(data, function (index, element) {

                     resp = element.response;
                     id = element.id;
                 });


                  

                 if (resp == "1") {


                     //set to 1 upon successful enrollment
                     $.jStorage.set("complete", "1");
                     $.jStorage.set("enrollmentId", id);
                     $.mobile.changePage("#success", { transition: 'slide' });
                     hideSpinner();


                 }
                 else {
                     //set to 0 
                     $.jStorage.set("complete", "0");
                     $.mobile.changePage("#failure", { transition: 'slide' });
                     hideSpinner();
                 }



             }, error: function (xhr) {

                  

                 //set to 1 upon successful enrollment
                 $.jStorage.set("complete", "0");
                 $.mobile.changePage("#failure", { transition: 'slide' });
                 hideSpinner();


             }
         });


     

 });


 
 
 $("#btnMembers").on("click", function(){


     showSpinner();


     //update with live data
     $.ajax({
         url: urlstr_custom + "searchmembers/?firstname=" + $("#sFirstname").val() + "&lastname=" + $("#sLastname").val(), type: "GET",
         success: function (data) {


             $("#MembersList").empty();

             $.each(data, function (index, element) {


                 $("#MembersList").append("<li><a href='tel:" + encodeURIComponent(element.Phone) + "'><img class='lazy' data-original='" + element.Photo + "' width='100'  /><h1>" + element.Name + "</h1><p>" + element.Branch + " Branch<br/>" + element.Division + " Division<br/>" + element.Phone + "<br/>" + element.Email
                     + "</p>"
                     + "</a></li>");


             });

             $("img.lazy").lazyload();

             $("#MembersList").listview('refresh');
             hideSpinner();

         }, error: function (xhr) {

              showMessage("Internet Connection Error " + xhr.statusText);
             hideSpinner();
             return;
         }
     });

 });

 $("#btnMembersChat").on("click", function () {


     showSpinner();


     //update with live data
     $.ajax({
         url: urlstr_custom + "searchmembers/?firstname=" + $("#cFirstname").val() + "&lastname=" + $("#cLastname").val(), type: "GET",
         success: function (data) {


             $("#ChatList").empty();

             $.each(data, function (index, element) {


                 $("#ChatList").append("<li><a href='#' onclick= StartChat('" + element.biodataid + "','" + encodeURIComponent(element.Name) + "');><img class='lazy' data-original='" + element.Photo + "' width='100'  /><h1>" + element.Name + "</h1><p>Tap to chat</p></a></li>");



             });

             $("img.lazy").lazyload();

             $("#ChatList").listview('refresh');
             hideSpinner();

         }, error: function (xhr) {

             showMessage("Internet Connection Error " + xhr.statusText);
             hideSpinner();
             return;
         }
     });

 });

     
     //getparameter by Name
     function getParameterByName(name) {

         var match = RegExp('[?&]' + name + '=([^&]*)')
                         .exec($.mobile.activePage[0].baseURI);

         return match && decodeURIComponent(match[1].replace(/\+/g, ' '));

     }


    



//show/hide spinner
     function showSpinner() {


         $.mobile.loading("show", {
             textVisible: true,
             theme: "a",
             html: "<div align='center'><img src='spinner.gif' align='center' width='30%' /></div>"
         });
     }

     function hideSpinner() {

         $.mobile.loading("hide");
     }


     


   



     //show message
     function showMessage(msg) {

         $.fn.jAlert({
             'title': 'Information',
             'message': msg,
             'theme': 'success'
         });

         hideSpinner();
     }

     //play audio
     function playAudio(url) {
         // Play the audio file at url
         var my_media = new Media(url,
             // success callback
             function () {
                 hideSpinner();
             },
             // error callback
             function (err) {
                 console.log("playAudio():Audio Error: " + err);
             }
         );
         // Play audio
         my_media.play();



     }

 

     function timeSince(date) {

         var seconds = Math.floor((new Date() - date) / 1000);

         var interval = Math.floor(seconds / 31536000);

         if (interval > 1) {
             return interval + " years";
         }
         interval = Math.floor(seconds / 2592000);
         if (interval > 1) {
             return interval + " months";
         }
         interval = Math.floor(seconds / 86400);
         if (interval > 1) {
             return interval + " days";
         }
         interval = Math.floor(seconds / 3600);
         if (interval > 1) {
             return interval + " hours";
         }
         interval = Math.floor(seconds / 60);
         if (interval > 1) {
             return interval + " minutes";
         }
         return Math.floor(seconds) + " seconds";
     }