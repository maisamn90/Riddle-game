                 _____                                __     __         _       __                  __     
                / ___/ _____ _____ ____ _ ____ ___   / /_   / /___     | |     / /____   _____ ____/ /_____
                \__ \ / ___// ___// __ `// __ `__ \ / __ \ / // _ \    | | /| / // __ \ / ___// __  // ___/
               ___/ // /__ / /   / /_/ // / / / / // /_/ // //  __/    | |/ |/ // /_/ // /   / /_/ /(__  ) 
              /____/ \___//_/    \__,_//_/ /_/ /_//_.___//_/ \___/     |__/|__/ \____//_/    \__,_//____/  
                                                                                                           
                                                                                                           
                                                                                                           
                                                                                             
# Python practicals Mini Project - Scramble Words

Scramble words is a word riddle game based on Anagram words that are remade by rearranging their letters.

## Heroku
This game hosted on heroku server in the following link:
[scramblewords.herokuapp.com](https://scramblewords.herokuapp.com/)


## Technologies and Packages
This game coded with python3 as Object oriented language with JavaScript and JQuery frame work

### Packages
Used the package manager [pip] to install packages. All required packages are available in requirements.txt

```bash
astroid==1.6.6
awscli==1.16.206
botocore==1.12.196
colorama==0.3.9
Django==2.0.2
docutils==0.14
Flask==1.1.1
ikp3db==1.1.4
isort==4.3.21
itsdangerous==1.1.0
jedi==0.11.1
Jinja2==2.10.1
jmespath==0.9.4
lazy-object-proxy==1.4.1
mccabe==0.6.1
numpy==1.17.0
parso==0.1.1
pbr==5.4.1
pyasn1==0.4.5
pylint==1.8.1
pylint-django==0.8.0
pylint-flask==0.5
pylint-plugin-utils==0.5
python-dateutil==2.8.0
pytz==2019.1
PyYAML==5.1
rsa==3.4.2
s3transfer==0.2.1
six==1.12.0
stevedore==1.30.1
urllib3==1.25.3
virtualenv==16.2.0
virtualenv-clone==0.5.3
virtualenvwrapper==4.8.4
Werkzeug==0.15.5
wrapt==1.11.2

```

## Planning:
I planed to create this game first as a console game with python 3 using AWS cloud9. This made build clear under standing about the riddle structure and the packages i need.
Flask used to connect the game with the front end using JavaScript.
   
## Logic:
* Get the user name and save it in a file user_info.txt
* Start the game with generating random three litters words chosen from file created which have all possible anagram three letters words.
* Mixing the word and letters to eliminate the possibility of showing the user a correct word.
* let the user inter his answer and check the word as the following:

   >a - check if the word is a correct word by finding it inside the words dictionary.
   >b - check the word if its matching the chosen letters 
   >c - since the game asking the user for tow answers i have to check if 
   the answer is duplicated
   >d - If both answers are correct will move to the next level (4letters)
   >e - If the answer incorrect user has one more chance to enter another 
   answer.
   >f - if both answers incorrect the game will be over and the user score 
   will saved in scores file.

## Features:
> The game is 7 levels the letters will increase by one in each level.
instructions will appears to the users wile playing with score and chances counter. 
User Correct words answers will appears down the text box.
Users top scores will show in Top score link.


## Acknowledgements
I received instructions for this project from Abhay Barthwal
