import os
from flask import Flask, render_template, request, flash, jsonify
import json
from main import *

app = Flask(__name__)
@app.route('/', methods=["GET","POST"])
def index():
    # if request.method == "GET":
        # file = open("user_info.txt", "a")
        # file.write("name:{}\n".format(request.form['username']))
        # file.close()
    return render_template("index.html")

@app.route('/user', methods=["GET","POST"])
def display_user():
    my_arg = request.args
    user = my_arg['username']
    print(user, "test name")
    file = open("user_info.txt", "a")
    file.write("name:{}\n".format(user))
    file.close()
    return jsonify(user)
    
@app.route('/userlevel', methods=["GET","POST"])
def show_selected_word():
    selected_word_riddle = ""
    my_arg = request.args
    user_level = my_arg['userlevel']
    print (user_level)
    selected_riddle_word = create_riddle(user_level)
    print ("selected_riddle_word ",selected_riddle_word)
    return  jsonify(selected_riddle_word)

@app.route('/answer', methods=["GET","POST"])
def check_user_answer():
    my_arg2 = request.args
    # print("my_arg2",my_arg2)
    user_answer_num = my_arg2['answer_num']
    user_answer = my_arg2['user_input']
    new_user_level = my_arg2['userlevel']
    scramble_selected_word = my_arg2['scrambled_Letters']
    chances_counter = my_arg2['chances_counter']
    user_answers_list = my_arg2['user_answers_list']
    user_name = my_arg2['user_name']
    answer_result = check_user_input(user_answer_num, user_answer, scramble_selected_word, chances_counter, user_answers_list, user_name)
    return  jsonify(answer_result)

@app.route('/game_over', methods=["GET","POST"])
def print_score():
    my_arg3 = request.args
    game_is_over = my_arg3['game_is_over']
    user_name = my_arg3['user_name']
    score = my_arg3['user_answers_list']
    save_user_score(user_name, score)
    print(my_arg3, "my_arg3")
    return  jsonify(game_is_over)

@app.route('/top_ten')
def top_ten():
    scores = {}
    all_scores = {}
    my_list= []
    with open("data/users_score.txt", "r") as scores_file:
        for line in scores_file:
            my_list.append(line.split())
            my_list = sorted(my_list)
            for key, val in my_list:
                scores[i[0]] = i[1]
                # if [i[0]] in scores and i[1]:
            # if val    
            # scores[key] = val
            # all_scores = scores
            # print(scores, "scores") 
            # print(all_scores, "scores") 
            # print(my_list)
    print(scores, "scores")
    
    return scores

if __name__ == '__main__':
    app.run(host=os.environ.get('IP'),
            port=int(os.environ.get('PORT')),
            debug=True)