var user_answers_list = [];
var user_level = 0;
var chances_counter = 2;

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

// get user info API to save username in a file 
function get_user_info1() {
    var username = $("#username").val();
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            $("#user_info_modal").modal('hide');
            $(".username-display").text("Howdy " + this.responseText.replace('\"', '').replace('\"', ''));
        }
    };
    xhttp.open("POST", "https://22a0c7cc7de548dd8a6b0c192910260d.vfs.cloud9.us-east-1.amazonaws.com/user" + "?username=" + username, true);
    xhttp.send();
}


// API to get level and choose the riddle accordingly 
function get_user_level() {
    if (user_answers_list.length == 0) {
        user_level = 1;
        return user_level;
    }
    else {
        var list_len = user_answers_list.length;
        if (list_len % 2 > 0) {
            user_level = Math.round(list_len / 2);
            return user_level;
        }
        else {
            user_level = (list_len / 2) + 1;
            return user_level;
        }
    }
}

// API get the randomly selected word according the level number 
function get_selected_word() {
    var user_level = get_user_level();
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var word = this.responseText;
            $(".scrambled-Letters").text(word.replace(/["']/g, ""));
        }
    };
    xhttp.open("POST", "https://22a0c7cc7de548dd8a6b0c192910260d.vfs.cloud9.us-east-1.amazonaws.com/userlevel" + "?userlevel=" + user_level, true);
    xhttp.send();
}

// API to get the if user loses the game according the chance counter and save the score 
function game_over(chances_counter) {
    var user_name = $(".username-display").text();
    var game_is_over = false;
    if (chances_counter == 0) {
        game_is_over = true;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {

            if (this.readyState == 4 && this.status == 200) {
                var response_game = (this.responseText);
            }
        };
        xhttp.open("POST", "https://22a0c7cc7de548dd8a6b0c192910260d.vfs.cloud9.us-east-1.amazonaws.com/game_over" + "?game_is_over=" + game_is_over + "&user_answers_list=" + user_answers_list.length + "&user_name=" + user_name, true);
        xhttp.send();
    }
}

// API to get if user win the game and show edit the template accordingly
function game_wining(user_answers_list) {
    var user_name = $(".username-display").text();
    if (user_answers_list.length == 14) {
        $(".instruction").text("Congratulations You Win" + " your score is ( " + user_answers_list.length + " )").css("font-size", "2rem");
        $(".instruction").css("margin-bottom", "0");
        $(".scrambled-Letters").addClass("hide")
        $("#user_input").addClass("hide");
        $("#submit").addClass("hide");
        $(".tag-words").addClass("hide");
        $(".game-body").append("<p class='text-center score-link '><strong><a href='{{ url_for('top_ten') }}'> Check your score</a></strong></p>");
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var response_game = (this.responseText);
            }
        };
        xhttp.open("POST", "https://22a0c7cc7de548dd8a6b0c192910260d.vfs.cloud9.us-east-1.amazonaws.com/game_winner" + "?&user_answers_list=" + user_answers_list.length + "&user_name=" + user_name, true);
        xhttp.send();
    }
}


// API check user answer 
function check_user_answer() {

    $(".instruction").text("Get Tow correct words from the following exact Letters").css("color", "#5d5d5d");
    var user_name = $(".username-display").text();
    var user_input = $("#user_input").val();
    var xhttp = new XMLHttpRequest();
    if (user_input == "") {
        get_selected_word();
    }
    else {
        $("#submit").removeAttr("disabled");
        var scrambled_Letters = $(".scrambled-Letters").text();
        var answer_num = 0;
        if (user_answers_list.length % 2 == 0) {
            answer_num = 0;
        }
        else { answer_num = 1; }

        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var answer_resullt = this.responseText;
                if (answer_num == 0) {
                    if (answer_resullt.replace('\n', '') == "true") {
                        user_answers_list.push(user_input);
                        $(".instruction").text("Great !! Add the second word now. " + "your score is ( " + user_answers_list.length + " )").css("color", "green");
                        $("#user_input").val("").focus();
                        $(".tag-words").append("<span class='badge badge-pill badge-dark'>" + user_input + "</span>");
                        game_wining(user_answers_list);
                    }
                    else {
                        chances_counter -= 1;
                        user_input = "";
                        $("#user_input").val("").focus();

                        if (chances_counter == 1) {
                            $(".instruction").text("Answer is not corret " + "your score is " + user_answers_list.length + "you have (" + chances_counter + ") chance(s)").css("color", "orange");
                            game_over(chances_counter);
                        }

                        if (chances_counter == 0) {
                            $(".instruction").text("Game over" + " your score is ( " + user_answers_list.length + " ) you have (" + chances_counter + ") chance(s)").css("color", "red");
                            game_over(chances_counter);
                            $("#start_game").removeClass("hide");
                            $(".instruction").css("margin-bottom", "12px");
                            $(".scrambled-Letters").addClass("hide");
                            $("#user_input").attr("disabled");
                            user_answers_list = [];
                            $("#user_input").val("").focus();
                            chances_counter = 2;
                        }
                    }
                }
                if (answer_num == 1) {
                    if (answer_resullt.replace('\n', '') == "false") {
                        chances_counter -= 1;
                        user_input = "";
                        $("#user_input").val("").focus();
                        if (chances_counter == 1) {
                            $(".instruction").text("Answer is not corret " + "your score is " + user_answers_list.length + "you have (" + chances_counter + ") chance(s)").css("color", "orange");
                            game_over(chances_counter);
                        }
                        if (chances_counter == 0) {
                            $(".instruction").text("Game over" + " your score is ( " + user_answers_list.length + " ) you have (" + chances_counter + ") chance(s)").css("color", "red");
                            game_over(chances_counter);
                            $("#start_game").removeClass("hide");
                            $(".instruction").css("margin-bottom", "12px");
                            $(".scrambled-Letters").addClass("hide");
                            $("#user_input").attr("disabled");
                            user_answers_list = [];
                            $("#user_input").val("").focus();
                            chances_counter = 2;
                        }
                    }
                    else {
                        user_answers_list.push(user_input);
                        $(".instruction").text("Correct " + "your score is( " + user_answers_list.length + " )").css("color", "green");
                        $("#user_input").val("").focus();
                        get_selected_word();
                        $(".tag-words").append("<span class='badge badge-pill badge-dark'>" + user_input + "</span>");
                        game_wining(user_answers_list);
                    }

                }
            }
        };
    }
    xhttp.open("POST", "https://22a0c7cc7de548dd8a6b0c192910260d.vfs.cloud9.us-east-1.amazonaws.com/answer" + "?answer_num=" + answer_num + "&user_input=" + user_input + "&userlevel=" + user_level + "&scrambled_Letters=" + scrambled_Letters + "&chances_counter=" + chances_counter + "&user_answers_list=" + user_answers_list + "&user_name=" + user_name, true);
    xhttp.send();
}

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
