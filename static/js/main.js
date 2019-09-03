

// modale appears in page load
$(document).ready(function() {
    $('#user_info_modal').modal('show')
    $("#userinfo-btn").attr("disabled", true)
    $("#submit").attr("disabled", true)
});

// Make enter key and a submit button for user input text
var user_input = document.getElementById("user_input");
user_input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        if (document.getElementById("submit").hasAttribute("disabled")) {

        }
        else {
            document.getElementById("submit").click();
        }
    }
});

// Make enter key and a save user info modal
var username = document.getElementById("username");
username.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        if (document.getElementById("userinfo-btn").hasAttribute("disabled")) {

        }
        else {
            document.getElementById("userinfo-btn").click();
        }
    }
});



// disable and enable save button in user info modal
$("#username").on("change", function() {
    var name = $("#username").val();
    if (name != "") {
        console.log(name);
        $("#userinfo-btn").removeAttr("disabled");
    }
    else {
        $("#userinfo-btn").attr("disabled", true);
    }
});

// Start game teamplate design function
$("#start_game").on("click", function() {
    $("#start_game").addClass("hide");
    $(".instruction").removeClass("hide");
    $(".scrambled-Letters").removeClass("hide");
    $("#user_input").removeAttr("disabled");
    $("#user_input").focus();
    $(".badge").remove();

});

// disable and enable submit button in input answer
$("#user_input").on("change", function() {
    var user_input = $("#user_input").val();
    if (user_input != "") {
        $("#submit").removeAttr("disabled");
    }
    else {
        $("#submit").attr("disabled", true);
    }
});

// save correct user answer in a list
function user_answers(user_input) {
    var user_answers_list = [];
    user_answers_list.append(user_input);
    return user_answers_list;
}
