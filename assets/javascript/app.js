  $ (document).ready(function() {

    //Question Array
    var Questions = [{
        
        question: "Ferrari 125 S was made in the Year?",
        answerList: ["1947", "1955", "1967", "1946"],
        answer: 1
    }, {
        
        question: "Lamborghini 350 GT was made in the Year?",
        answerList: ["1954", "1968", "1964", "1955"],
        answer: 3
    }, {
    
        question: "W.O. Bentley was made in the Year?",
        answerList: ["1919", "1019", "1918", "1819"],
        answer: 1
    }, {
    
        question: "Rolls Royce 10 was made in the Year?",
        answerList: ["1804", "1904", "1704", "2004"],
        answer: 2
    }]
       

    //Win or Lose
    var correctAns = 0;
    var wrongAns = 0;

    //from loop
    var currentQ = 0;

    //input from user
    var unanswered = 0;
    var answered = 0;
    var userSelect = 0;

    //timer variables
    var sec = 0;
    var time = 0;

    //messages for new screen after answer result 
    var messages = {
        correct: "You are a Car Genius",
        incorrect: "Wrong Answer!",
        endTime: "Time is Up!",
        finished: "Game Over"
    }


    //Starting the game function
    function startGame() {
        //clear html
        $('#final').empty();
        $('#correctAnswers').empty();
        $('#wrongAnswers').empty();
        $('#unanswered').empty();
        //clear counter
        currentQ = 0;
        correctAns = 0;
        wrongAns = 0;
        unanswered = 0;
        //first question 
        newQ()
    }

    function countDown() {
        
        sec = 10;
        $('#timer').html('<h3> Time Left: ' + sec + '</h3>');
        answered = true;
        //sets timer to go down
        time = setInterval(showCountdDown, 1000);
    }


    function showCountdDown() {
        sec--;
        $('#timer').html('<h3>Time Left: ' + sec + '</h3>');
        //timer runs out
        if (sec < 1) {
            clearInterval(time);
            answered = false;
            answerPage()
        }
    }


    //New Question function 
    function newQ() {
        $('#messages').empty();
        $('#Answer').empty();
        answered = true;

        $('#question').html('<h2>' + Questions[currentQ].question + '</h2>');
        for (var i = 0; i < 4; i++) {
            var choices = $('<div>');
            choices.text(Questions[currentQ].answerList[i]);
            choices.attr({ 'data-index': i });
            choices.addClass('thisChoice');
            $('#answerList').append(choices);
        }
        //timer
        countDown();

        $('.thisChoice').on('click', function () {
            userSelect = $(this).data('index');
            clearInterval(time);
            answerPage()
        });
    }

    //Answer Page
    function answerPage() {
        //Clears question page
        $('#currentQ').empty();
        $('.thisChoice').empty();
        $('#question').empty();

        //holds the place for answer
        var rightAnswerText = Questions[currentQ].answerList[Questions[currentQ].answer];
        //correct answer place in array
        var rightAnswerIndex = Questions[currentQ].answer;

       
        //if player chooses the right answer 
        if ((userSelect == rightAnswerIndex) && (answered == true)) {
            correctAns++;
            $('#messages').html(messages.correct);
            //if player chooses wrong answer
        } else if ((userSelect != rightAnswerIndex) && (answered == true)) {
            wrongAns++;
            $('#messages').html(messages.incorrect);
            //correct answer displays
            $('#Answer').html('The correct answer was: ' + rightAnswerText);
        } else {
            //if player does not choose one before the timer runs out
            unanswered++;
            $('#messages').html(messages.endTime);
            $('#Answer').html('The correct answer was: ' + rightAnswerText);
            answered = true;
        }
        //once the last question is complete display scoreboard
        if (currentQ == (Questions.length - 1)) {
            setTimeout(scoreBoard, 1000)
        } else {
            //otherwise, display next question 
            currentQ++;
            setTimeout(newQ, 2000);
        }
    }
    function scoreBoard() {
        //clear the timer, and Answer 
        $('#timer').empty();
        $('#messages').empty();
        $('#Answer').empty();

        //display message 
        $('#final').html(messages.finished);
        //final counter results
        $('#Answer').html("Correct Answers: " + correctAns);
        $('#wrongAnswers').html("Wrong Answers: " + wrongAns);
        $('#unanswered').html("Unanswered: " + unanswered);
       
    }


    //start button 
    $('#startBtn').on('click', function () {
        $(this).hide();
        startGame();
    });
    

});
