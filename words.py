import itertools
import random
import string
import json

# read all words from a file and put it in a list 
def list_dec():
    with open("data/new_words.txt", "r") as file_json:
        json_data_list = file_json.readlines()
    return json_data_list

# sorting words in different file depending on letters number 
def sort_words():
    # three_letters_words_list = []
    # four_letters_words_list = []
    # five_letters_words_list = []
    # six_letters_words_list = []
    # seven_letters_words_list = []
    eight_letters_words_list= []
    # nine_letters_words_list = []
    dec_list = list_dec()
    for actual_words in dec_list:
        actual_words = actual_words.replace("\n", "")
        if len(actual_words) == 8:
            eight_letters_words_list.append(actual_words)
        # elif len(words) == 4:
        #     four_letters_words_list.append(words)
        # elif len(words) == 5:
        #     five_letters_words_list.append(words)
        # elif len(words) == 6:
        #     six_letters_words_list.append(words)
        # elif len(words) == 7:
        #     seven_letters_words_list.append(words)
        # elif len(words) == 8:
        #     eight_letters_words_list.append(words)
        # elif len(words) == 9:
        #     nine_letters_words_list.append(words)
    
    for words in eight_letters_words_list:
        # print(words, three_letters_words_list, "whaaat")
        meaningful_list = []
        word_list = []
        words = words.replace("\n", "")
        all_posipole_words = list(itertools.permutations(words))
        for each_words in all_posipole_words:
            word_list.append(''.join(each_words))
        if word_list:
            for every_word in word_list:
                if every_word in eight_letters_words_list:
                    meaningful_list.append(every_word)
                    meaningful_list = list(set(meaningful_list))
                    
        if len(meaningful_list) >= 3:
            print(meaningful_list, "meaningful_list")
            print("here")
            with open("data/eight_letters_meaning_words.json", "a") as file_json:
                file_json.write(words + "\n")
    return True
  
# sort_words()