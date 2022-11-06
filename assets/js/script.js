
var quiz_in_progress = false;
var timer_count_display_area = document.querySelector("#timer_count");
var timer_count_current_value = 0;
var main_page_container = document.querySelector(".main_page_container");
var quiz_introduction_screen = document.querySelector(".quiz_introduction_screen");
var quiz_question_screen = document.querySelector(".quiz_question_screen");
var start_quiz_button = document.querySelector("#start_quiz_button");
//var question_answer_button = document.querySelectorAll(".button");
var question_answer_1_button = document.querySelector("#question_answer_1_button");
var question_answer_2_button = document.querySelector("#question_answer_2_button");
var question_answer_3_button = document.querySelector("#question_answer_3_button");
var question_answer_4_button = document.querySelector("#question_answer_4_button");
var question_answer_is_selected = false;
var question_status_text = document.querySelector(".footer_question_status_text");
var view_high_score_link = document.querySelector(".header_score_link");

// Display the introduction screen.
display_quiz_introduction_screen();

// Start the necessary event listener processes.
start_quiz_button.addEventListener("click", start_countdown_timer);
//
question_answer_1_button.addEventListener("click", function (event) {
    if (question_answer_is_selected = "false") {
        question_answer_is_selected = true;
        window.alert("button: " + event.currentTarget.textContent);
        window.alert("Process the quiz question answer status");
        process_quiz_question_information();
    }
    else {
        //
    }
});
//
question_answer_2_button.addEventListener("click", function (event) {
    if (question_answer_is_selected = "false") {
        question_answer_is_selected = true;
        window.alert("button: " + event.currentTarget.textContent);
        window.alert("Process the quiz question answer status");
        process_quiz_question_information();
    }
    else {
        //
    }
});
//
question_answer_3_button.addEventListener("click", function (event) {
    if (question_answer_is_selected = "false") {
        question_answer_is_selected = true;
        window.alert("button: " + event.currentTarget.textContent);
        window.alert("Process the quiz question answer status");
        process_quiz_question_information();
    }
    else {
        //
    }
});
//
question_answer_4_button.addEventListener("click", function (event) {
    if (question_answer_is_selected = "false") {
        question_answer_is_selected = true;
        window.alert("button: " + event.currentTarget.textContent);
        window.alert("Process the quiz question answer status");
        process_quiz_question_information();
    }
    else {
        //
    }
});
//
view_high_score_link.addEventListener("click", function () {
    if (quiz_in_progress == false) {
        view_high_score_link.style.visibility = "hidden";
        display_high_scores();
    }
    else {
        window.alert("Wait until after the quiz.");
    }
});

function start_countdown_timer() {
    timer_count_current_value = 10;
    quiz_in_progress = true;
    display_quiz_question_screen();
    // Set the timer interval variable.
    var timer_countdown_interval = setInterval(function() {
        timer_count_current_value = timer_count_current_value - 1;
        timer_count_display_area.innerHTML = timer_count_current_value;
        if(timer_count_current_value > 0) {
            process_quiz_question_information();
        }
        else {
        // Stop the timer and end the quiz.
            clearInterval(timer_countdown_interval);
            quiz_in_progress = false;
            timer_count_current_value = 0;
            window.alert("Prompt for the entry of high score information.");
            process_high_scores();
        }
    }, 1000);
}

function display_quiz_introduction_screen() {
    view_high_score_link.style.visibility = "visible";
    question_status_text.style.visibility = "hidden";
    question_status_text.style.textAlign = "center";
    //question_status_text.innerHTML = "START THE QUIZ!";
    quiz_introduction_screen.style.visibility = "visible";
    quiz_introduction_screen.style.height = "auto";
    quiz_question_screen.style.visibility = "hidden";
    quiz_question_screen.style.height = "1px";
    timer_count_display_area.innerHTML = "**";
    quiz_in_progress = false;
}

function display_quiz_question_screen() {
    quiz_introduction_screen.style.visibility = "hidden";
    quiz_introduction_screen.style.height = "1px";
    quiz_question_screen.style.visibility = "visible";
    quiz_question_screen.style.height = "auto";
    question_status_text.style.visibility = "visible";
    question_status_text.style.textAlign = "left";
    question_status_text.innerHTML = "";
    question_answer_is_selected = false;
}

function process_quiz_question_information() {
    //Keep in mind that incorrect answers will penalize your score/time by 10 seconds!
    question_status_text.style.visibility = "visible";
    question_status_text.style.textAlign = "left";
    question_status_text.innerHTML = "question answer status (\"Correct!\" or \"Wrong!\")";
    if (timer_count_current_value == 1) {
        window.alert("Display the correct question status text and display the next question or the end screen.");
    }
    question_answer_is_selected = true;
}

function process_high_scores() {
    view_high_score_link.style.visibility = "visible";
    question_status_text.style.visibility = "visible";
    question_status_text.style.textAlign = "left";
    question_status_text.innerHTML = "Time is Done!";
    timer_count_current_value = "**";
    question_answer_is_selected = false;
    window.alert("Time is Done!" + "\n\n" + "Process/Display/Load/Save high score information.");
    display_quiz_introduction_screen();
}

function display_high_scores() {
    view_high_score_link.style.visibility = "hidden";
    question_status_text.style.visibility = "hidden";
    window.alert("Display/Load/Save high score information.");
    view_high_score_link.style.visibility = "visible";
}
















