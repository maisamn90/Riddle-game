$(document).ready(function() {
    $('#user_info_modal').modal('show')
    $("#userinfo-btn").attr("disabled", true)
    $("#submit").attr("disabled", true)
});

$("#username").on("change", function() {
    var name = $("#username").val();
    if (name != "") {
        console.log(name);
        $("#userinfo-btn").removeAttr("disabled");
    }
    else {
        $("#userinfo-btn").attr("disabled", true)
    }
});

$("#start_game").on("click", function() {
    $("#start_game").addClass("hide");
    $(".instruction").removeClass("hide");
    $(".scrambled-Letters").removeClass("hide");
    $("#user_input").removeAttr("disabled");
    $("#user_input").focus();
    $(".badge").remove()

});

$("#user_input").on("change", function() {
    var user_input = $("#user_input").val();
    if (user_input != "") {
        $("#submit").removeAttr("disabled");
    }
    else {
        $("#submit").attr("disabled", true)
    }
});



function user_answers(user_input) {
    var user_answers_list = []
    user_answers_list.append(user_input)

    return user_answers_list
}


// $("#userinfo-btn").click(function() {
//     // var name = $("#username").val();
//     // console.log("here");
//     get_user_info();
//     // $(".username-display").text("Howdy " + name);
//     // $("#user_info_modal").modal('hide');
//     // $("#user_info_form").submit();

// });
