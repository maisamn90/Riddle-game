$(document).ready(function() {
    $('#user_info_modal').modal('show')
    $("#userinfo-btn").attr("disabled", true)
});

$("#username").on("change",function() {
    var name = $("#username").val();
    if (name != "") {
        console.log(name);
        $("#userinfo-btn").removeAttr("disabled");
    }
    else {
        $("#userinfo-btn").attr("disabled", true)
    }
});

$("#start_game").on("click",function(){
    $("#start_game").addClass("hide");
    $(".instruction").removeClass("hide");
    $(".scrambled-Letters").removeClass("hide");
    $("#user_input").removeAttr("disabled");
    
})

function user_answers(user_input) {
   var user_answers_list=[]
   user_answers_list.append(user_input)
   
   return user_answers_list
}

function get_user_level(){
    var user_level = 1
    var user_answers_list = user_answers(user_level)
    if (user_answers_list.length() == 0){
        return user_level
    }
    else{
        var list_len = user_answers_list.length()
        if (list_len %2 > 0 ){
            user_level = Math.round(list_len/2)
            return user_level
        }
        else{
           user_level =  (list_len/2) + 1
           return user_level
        }
    }
}

// $("#userinfo-btn").click(function() {
//     // var name = $("#username").val();
//     // console.log("here");
//     get_user_info();
//     // $(".username-display").text("Howdy " + name);
//     // $("#user_info_modal").modal('hide');
//     // $("#user_info_form").submit();
    
// });


