$("#start").on("click", function(){
    $("#start").remove();
    game.loadQuestion();
}) 

$(document).on('click','.answer-button',function(e){
    game.clicked(e);
})
$(document).on('click','#reset',function(){
    game.reset();
})
var questions = [{
    question: "Who's the starting running back for the Minnesota Vikings?",
    answers: ["Latavius Murray", "Adrian Peterson", "Dalvin Cook", "Jerick McKinnon"],
    correctAnswer: "Dalvin Cook",
    image: "assets/images/Dalvin.gif"
}, {
    question: "Who has the most points in NBA history?",
    answers: ["Kareem Abdul-Jabbar", "Kobe Bryant", "LeBron James", "Michael Jordan"],
    correctAnswer: "Kareem Abdul-Jabbar",
    image: "assets/images/Kareem.gif"
},
    {
    question: "How many calories are in a Big Mac?",
    answers: ["494","563","785","982"],
    correctAnswer: "563",
    image: "assets/images/BigMac.gif"
},
    {
    question: "What is the most common blood type?",
    answers: ["O-Positive", "B-Negative", "AB-Positive", "A-Negative"],
    correctAnswer: "O-Positive",
    image: "assets/images/Blood.gif"
},
    {
    question: "What is the highest grossing Disney movie ever?",
    answers: ["The Lion King", "Finding Nemo", "Frozen", "Toy Story"],
    correctAnswer: "Frozen",
    image:"assets/images/Frozen.gif"
},
    {
    question: "Who is the highest paid athlete?",
    answers: ["LeBron James", "Russell Wilson", "Christiano Ronaldo", "Lionel Messi"],
    correctAnswer: "Lionel Messi",
    image:"assets/images/Messi.gif"
}];

var game = {
    questions:questions,
    currentQuestion:0,
    counter:30,
    correct:0,
    incorrect:0,
    unanswered:0,
    countdown: function(){
        game.counter--;
        $("#counter").html(game.counter);
        if (game.counter<=0) {
            console.log("TIME UP");
            game.timeUp();
        }
    },
    loadQuestion: function(){
        timer = setInterval(game.countdown,1000);
        $('#subwrapper').html("<h2>TIME REMAINING <span id ='counter'>30</span> Seconds</h2>");
        $("#subwrapper").append("<h2>"+questions[game.currentQuestion].question+"</h2>");
        for (var i=0;i<questions[game.currentQuestion].answers.length;i++){
            $("#subwrapper").append('<button class = "answer-button"id="button-'+i+'" data-name="'+questions[game.currentQuestion].answers[i]+'">'+questions[game.currentQuestion].answers[i]+'</button>');
        }
    },
    nextQuestion: function(){
        game.counter = 30;
        $("#counter").html(game.counter);
        game.currentQuestion++;
        game.loadQuestion();
    },
    timeUp: function(){
        clearInterval(timer);
        game.unanswered++;
        $("#subwrapper").html("<h2>OUT OF TIME!</h2>");
        $("#subwrapper").append('<h3>The Correct Answer Was: '+questions[game.currentQuestion].correctAnswer+'</h3>');
        if (game.currentQuestion==questions.length-1){
            setTimeout(game.results,3*1000);
        }else {
            setTimeout(game.nextQuestion,3*1000);
        }
    },
    results: function(){
        clearInterval(timer);
        $("#subwrapper").html("<h2>ALL DONE!</h2>");
        $("#subwrapper").append("<h3>Correct: "+game.correct+"</h3>");
        $("#subwrapper").append("<h3>Incorrect: "+game.incorrect+"</h3>");
        $("#subwrapper").append("<h3>Unanswered: "+game.unanswered+"</h3>");
        $("#subwrapper").append("<button id='reset'>RESET</button>");

    },
    clicked: function(e){
        clearInterval(timer);
        if($(e.target).data("name")==questions[game.currentQuestion].correctAnswer){
            game.answeredCorrectly();
        }else{
            game.answeredIncorrectly();
        }

    },
    answeredCorrectly: function(){
        console.log("You got it");
        clearInterval(timer);
        game.correct++;
        $("#subwrapper").html("<h2>YOU GOT IT RIGHT!</h2>");
        if (game.currentQuestion==questions.length-1){
            setTimeout(game.results,3*1000);
        }else {
            setTimeout(game.nextQuestion,3*1000);
        }

    },
    answeredIncorrectly: function(){
        console.log("Wrong!");
        clearInterval(timer);
        game.incorrect++;
        $("#subwrapper").html("<h2>YOU GOT IT WRONG!</h2>");
        $("#subwrapper").append('<h3>The Correct Answer Was: '+questions[game.currentQuestion].correctAnswer+'</h3>');
        if (game.currentQuestion==questions.length-1){
            setTimeout(game.results,3*1000);
        }else {
            setTimeout(game.nextQuestion,3*1000);
        }
    },
    reset: function(){
        game.currentQuestion=0;
        game.counter=0;
        game.correct=0;
        game.incorrect=0;
        game.unanswered=0;
        game.loadQuestion();

    }
}


