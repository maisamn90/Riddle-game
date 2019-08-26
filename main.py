import random
from words import list_dec
import itertools
import pdb

# def start_game():
#     # check_user_input()

def save_user_score(user_name, score):
    print("Write")
    with open("data/users_score.txt", "a") as users_file:
        user_name = user_name.replace("Howdy ", "")
        user_name = user_name.replace(" ","_")
        users_file.write(user_name + " " + str(score) + "\n")
        
 

def get_user_info():
    user_name = input("Please Inter your full name: ")
    return user_name

# def get_user_answer():
#     user_input = ("Create 2 word from these characters")
#     return user_input
    
def pick_random_word(file_name):
    print("here to pick random")
    randomly_selected_word = ""
    with open(file_name, "r") as opened_file:
        words_list = opened_file.readlines()
        randomly_selected_word = random.choice(words_list)
        randomly_selected_word = randomly_selected_word.replace("\n", "")
    # print ("randomly_selected_word",randomly_selected_word)
    randomly_selected_word = scramble_word(randomly_selected_word)
    randomly_selected_word = ''.join(randomly_selected_word)
    return randomly_selected_word

def check_word_exist(word):
    with open("data/new_words.txt", "r") as opened_file:
        words_list = opened_file.readlines()
        neat_words_list= []
        for i in words_list:
            neat_words_list.append(i.rstrip())
        if word in neat_words_list:
            # print("neat_words_list " , neat_words_list)
            # print("check_word_exist True " + word)
            return True
    
        else:
            return False
        

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
    print(level, selected_word, "level")
    return selected_word        

# pick_random_word("three_letters_meaning_words.json")

def scramble_word(selected_word):
    selected_word = list(itertools.permutations(selected_word))
    for word in selected_word:
        if ''.join(word) + "\n" not in list_dec():
            return word
            

def check_user_input(user_answer_num, user_answer, scramble_selected_word, chances_counter, user_answers_list, user_name):
    score = 0
    # chances_counter = 2
    # if(game_over == "true"):
    #     save_user_score(user_name, len(user_answers_list))
    if user_answer_num == "0":
        if chances_counter != 0:
            print("user_answer= ", user_answer, "scramble_selected_word", scramble_selected_word )
            if check_word_exist(user_answer) == True and sorted(user_answer) == sorted(scramble_selected_word) :
                print(sorted(user_answer) == sorted(scramble_selected_word), "sorted(user_answer) == sorted(scramble_selected_word) ")
                print("222", scramble_selected_word)
                # answer_num +=1
                score +=1
                # correct_answers.append(user_answer)
                # first_answer = user_answer
                # print("correct", "first_answer" , first_answer)
                result = True
                # break
            elif sorted(user_answer) != sorted(scramble_selected_word):
                result = False
            else:
                if chances_counter != 0:
                    # chances_counter -=1
                    # print ("your asnswer is not correct you have {} chances: ".format(chances_counter + 1))
                    # user_answer = input("Try Again  - {}: ".format(scramble_selected_word))
                    if not check_word_exist(user_answer):
                        # if chances_counter == 0:
                        print("Game over your score is {} ".format(score))
                        # save_user_score(user_name, score)
                        result = False
                        # if game_over == "true":
                        #     save_user_score(user_name, len(user_answers_list))
                        # break
                    else:
                        # answer_num +=1
                        score +=1
                        # first_answer = user_answer
                        # correct_answers.append(user_answer)
                        print("correct")
                        result = True
                        # break
        print (result)
        return result
    if user_answer_num == "1":
        # user_answer = input ("Create the second word from these characters -  {}: ".format(scramble_selected_word))
        # print("first_answer", first_answer)
        if user_answer in user_answers_list or check_word_exist(user_answer) == False or sorted(user_answer) != sorted(scramble_selected_word):
            # chances_counter -=1
            print("chances_counter",chances_counter)
            # print("You cant repeat the same word")
            if chances_counter != 0:
                # chances_counter -=1
                print ("your asnswer is not correct you have {} chances: ".format(chances_counter))
                # user_answer = input("Try Again  - {}: ".format(scramble_selected_word))
                # print(correct_answers, "correct_answers")
                if user_answer in user_answers_list or check_word_exist(user_answer) == False or sorted(user_answer) != sorted(scramble_selected_word) :
                    print("chances_counter2" , chances_counter)
                    # if chances_counter == 0:
                    print("test test and test", chances_counter)
                    print("Game over your score is {} ".format(score))
                    # save_user_score(user_name, score)
                    # break
                    result = False
                    # print(type(game_over), "resullllllttttt")
                    # if game_over == "true":
                        # save_user_score(user_name, len(user_answers_list))
                else:
                    # answer_num +=1
                    score +=1
                    # first_answer = user_answer
                    print("correct")
                    # break
                    result = True
                # correct_answers = []
                return result  
        elif check_word_exist(user_answer) and sorted(user_answer) == sorted(scramble_selected_word):
            # answer_num +=1
            score +=1
            print("your answer is correct your score is {}".format(score))
            return True
    
    # else:
    #     save_user_score(user_name, len(user_answers_list))
    #     return False
                
    

    
# start_game()

# print(check_word_exist(1, "are"))
