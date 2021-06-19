let score = 0;
let questions = [
{
    prompt: "1. It has four basic concepts: encapsulation, abstraction, inheritance and polymorphism.\n\
     \n(a) Object Oriented Programming \n(b) Loop \n(c) Element",

    answer: "a"
},

{
    prompt: "2. This technique meaning 'many forms and shapes' allows programmers to render multiple HTML elements depending on the type of object.\n\
     \n(a) Inheritance \n(b) Encapsulation \n (c) Polymorphism",
    
    answer: "c"
},


{
    prompt: "3. Using this concept, programmers can extend the functionality of the code's existing classes to eliminate repetitive code.\n\
    \n(a) Abstraction \n(b) Loop \n(c) Inheritance",
     
    answer: "c"
},
{
    prompt: "4. Abstraction is like an extension of encapsulation because it hides certain properties and methods from the outside code to make the interface of the objects simpler.\n\
    \n(a) Encapsulation \n(b) Abstraction \n(c) Destruction",

    answer: "b"

},

{
    prompt: "5.The different objects inside of each program will try to communicate with each other automatically. \n\
     \n(a) Logic \n(b) Encapsulation \n(c) Obsession",

     answer: "b"
},

];

for(let i = 0; i < questions.length; i++){
    let response = window.prompt(questions[i].prompt);
    if(response === questions[i].answer){
        score++;
        alert("You got correct answer!");
    }else{
        alert("you got wrong answer!");
    }
}

alert("Your score is: " + score + " out of " + questions.length);