import random
from words import list_dec
import itertools
import pdb

#Save user names and scores in user scores file
def save_user_score(user_name, score):
    print("Write")
    with open("data/users_score.txt", "a") as users_file:
        user_name = user_name.replace("Howdy ", "")
        user_name = user_name.replace(" ","_")
        users_file.write(user_name + "\n" + str(score) + "\n")

#Save user name in a user info file    
def get_user_info():
    user_name = input("Please Inter your full name: ")
    return user_name

#choose the randm word from a file 
def pick_random_word(file_name):
    randomly_selected_word = ""
    with open(file_name, "r") as opened_file:
        words_list = opened_file.readlines()
        randomly_selected_word = random.choice(words_list)
        randomly_selected_word = randomly_selected_word.replace("\n", "")
    randomly_selected_word = scramble_word(randomly_selected_word)
    randomly_selected_word = ''.join(randomly_selected_word)
    return randomly_selected_word

#to check if the word exist
def check_word_exist(word):
    with open("data/new_words.txt", "r") as opened_file:
        words_list = opened_file.readlines()
        neat_words_list= []
        for i in words_list:
            neat_words_list.append(i.rstrip())
        if word in neat_words_list:
            return True
    
        else:
            return False
        
#to choose the file of words lenght
def create_riddle(level):
    selected_word =""
    if level == "1":
        selected_word = pick_random_word("data/three_letters_meaning_words.json")
    elif level == "2":
        selected_word = pick_random_word("data/four_letters_meaning_words.json")
    elif level == "3":
        selected_word = pick_random_word("data/five_letters_meaning_words.json")
    elif level == "4":
        selected_word = pick_random_word("data/six_letters_meaning_words.json")
    elif level == "5":
        selected_word = pick_random_word("data/seven_letters_meaning_words.json")
    elif level == "6":
        selected_word = pick_random_word("data/eight_letters_meaning_words.json")
    elif level == "7":
        selected_word = pick_random_word("data/nine_letters_meaning_words.json")
    return selected_word        

#to scramble the choosen word befor show it the the user
def scramble_word(selected_word):
    selected_word = list(itertools.permutations(selected_word))
    for word in selected_word:
        if ''.join(word) + "\n" not in list_dec():
            return word
            
#check the user answers 
def check_user_input(user_answer_num, user_answer, scramble_selected_word, chances_counter, user_answers_list, user_name):
    score = 0
    if user_answer_num == "0":
        if chances_counter != 0:
            if check_word_exist(user_answer) == True and sorted(user_answer) == sorted(scramble_selected_word) :
                score +=1
                result = True
            elif sorted(user_answer) != sorted(scramble_selected_word):
                result = False
            else:
                if chances_counter != 0:
                    if not check_word_exist(user_answer):
                        result = False
                    else:
                        score +=1
                        result = True
        return result
    if user_answer_num == "1":
        if user_answer in user_answers_list or check_word_exist(user_answer) == False or sorted(user_answer) != sorted(scramble_selected_word):
            if chances_counter != 0:
                if user_answer in user_answers_list or check_word_exist(user_answer) == False or sorted(user_answer) != sorted(scramble_selected_word) :
                    result = False
                else:
                    score +=1
                    result = True
                return result  
        elif check_word_exist(user_answer) and sorted(user_answer) == sorted(scramble_selected_word):
            score +=1
            return True
