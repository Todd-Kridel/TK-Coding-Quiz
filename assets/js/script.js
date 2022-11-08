//
// GLOBAL VARIABLES
//
var quiz_in_progress = false;
var timer_count_display_area = document.querySelector("#timer_count");
var timer_count_current_value = 0;
var time_score_of_last_answer = 0;
var timer_countdown_interval = null;
var main_page_container = document.querySelector(".main_page_container");
var quiz_introduction_screen = document.querySelector(".quiz_introduction_screen");
var quiz_question_screen = document.querySelector(".quiz_question_screen");
var start_quiz_button = document.querySelector("#start_quiz_button");
//var question_answer_button = document.querySelectorAll(".button");
var question_text = document.querySelector("#question_text");
var question_answer_1_button = document.querySelector("#question_answer_1_button");
var question_answer_2_button = document.querySelector("#question_answer_2_button");
var question_answer_3_button = document.querySelector("#question_answer_3_button");
var question_answer_4_button = document.querySelector("#question_answer_4_button");
var question_answer_is_selected = false;
var question_status_text = document.querySelector(".footer_question_status_text");
var view_high_score_link = document.querySelector(".header_score_link");
var completion_screen = document.querySelector(".completion_screen");
var final_score = document.querySelector("#final_score");
var initials_entry_field = document.querySelector("#initials_entry_field");
var save_score_button = document.querySelector("#save_score_button");
var high_scores_screen = document.querySelector(".high_scores_screen");
var high_scores_history_field = document.querySelector("#high_scores_history_field");
var high_scores_local_storage_record_amount = 0;
var go_back_button = document.querySelector("#go_back_button");
var clear_scores_button = document.querySelector("#clear_scores_button");
// ( More global variables are at below. )
///////////////////////////////////////////////////////////////////////////////////////
//
// Answer Processing; Store the answer information in a multi-dimensional array of
// answer-information objects...that correspond to the title/detail/button layout of
// the quiz question screen and the layout of the button event handler functions.
//
///////////////////////////////////////////////////////////////////////////////////////
//
// Coding Quiz Challenge
// Try to answer the following code-related questions within the time limit.
// Keep in mind that incorrect answers will penalize your score/time by 10 seconds!
//
// Question #1
// Commonly used data types DO Not Include:
// 1. strings
// 2. booleans
// 3. alerts
// 4. numbers
//
// Question #2
// The condition in an if/else statement is enclosed with ______.
// 1. quotes
// 2. curly brackets
// 3. parenthesis
// 4. square brackets
//
// Question #3
// Arrays in JavaScript can be used to store ______.
// 1. numbers and strings
// 2. other arrays
// 3. booleans
// 4. all of the above
//
// Question #4
// String values must be enclosed within ______ when being assigned to variables.
// 1. commas
// 2. curly brackets
// 3. quotes
// 4. parenthesis
//
// Question #5
// A very useful tool used during development and debugging for printing content to the debugger is:
// 1. JavaScript
// 2. terminal/bash
// 3. for loops
// 4. console.log
//
///////////////////////////////////////////////////////////////////////////////////////
//
// MORE GLOBAL VARIABLES
var current_question_number = 0;
var total_possible_questions = 5;
var total_possible_answers_buttons = 4;
//
var question_object_list_array = 
// an array of 5 questions (a multi-dimensional array of objects of arrays of objects)
// for dynamically building the question screen and processing its event-handler results
//
// question_object_list_array: <- object array
//     question_text: string
//     question_answers: <- object array
//         possible_answer: string
//         correctness: boolean
    [
    // the 1st question; index/element 0 of the outer array
    { question_text: "Commonly used data types DO Not Include:", 
    question_answers: 
        // an inner array of answer/correctness component objects for the current question;
        // with the 1-to-4 sequence numbers of the components corresponding to the 4 answer 
        // buttons of the question screen (indexes 0 through 3)
        [
        {possible_answer: /* #1 */ "1. strings", correctness: false}, 
        {possible_answer: /* #2 */ "2. booleans", correctness: false}, 
        {possible_answer: /* #3 */ "3. alerts", correctness: true}, 
        {possible_answer: /* #4 */ "4. numbers", correctness: false}
        ]
    }, 
    // the 2nd question; index/element 1 of the outer array
    { question_text: "The condition in an if/else statement is enclosed with ______.", 
    question_answers: 
        // an inner array of answer/correctness component objects for the current question;
        // with the 1-to-4 sequence numbers of the components corresponding to the 4 answer 
        // buttons of the question screen (indexes 0 through 3)
        [
        {possible_answer: /* #1 */ "1. quotes", correctness: false}, 
        {possible_answer: /* #2 */ "2. curly brackets", correctness: false}, 
        {possible_answer: /* #3 */ "3. parenthesis", correctness: true}, 
        {possible_answer: /* #4 */ "4. square brackets", correctness: false}
        ]
    }, 
    // the 3rd question; index/element 2 of the outer array
    { question_text: "Arrays in JavaScript can be used to store ______.", 
    question_answers: 
        // an inner array of answer/correctness component objects for the current question;
        // with the 1-to-4 sequence numbers of the components corresponding to the 4 answer 
        // buttons of the question screen (indexes 0 through 3)
        [
        {possible_answer: /* #1 */ "1. numbers and strings", correctness: false}, 
        {possible_answer: /* #2 */ "2. other arrays", correctness: false}, 
        {possible_answer: /* #3 */ "3. booleans", correctness: false}, 
        {possible_answer: /* #4 */ "4. all of the above", correctness: true}
        ]
    }, 
    // the 4th question; index/element 3 of the outer array
    { question_text: "String values must be enclosed within ______ when being assigned to variables.", 
    question_answers: 
        // an inner array of answer/correctness component objects for the current question;
        // with the 1-to-4 sequence numbers of the components corresponding to the 4 answer 
        // buttons of the question screen (indexes 0 through 3)
        [
        {possible_answer: /* #1 */ "1. commas", correctness: false}, 
        {possible_answer: /* #2 */ "2. curly brackets", correctness: false}, 
        {possible_answer: /* #3 */ "3. quotes", correctness: true}, 
        {possible_answer: /* #4 */ "4. parenthesis", correctness: false}
        ]
    }, 
    // the 5th question; index/element 4 of the outer array
    { question_text: "A very useful tool used during development and debugging for printing content to the debugger is:", 
    question_answers: 
        // an inner array of answer/correctness component objects for the current question;
        // with the 1-to-4 sequence numbers of the components corresponding to the 4 answer 
        // buttons of the question screen (indexes 0 through 3)
        [
        {possible_answer: /* #1 */ "1. JavaScript", correctness: false}, 
        {possible_answer: /* #2 */ "2. terminal/bash", correctness: false}, 
        {possible_answer: /* #3 */ "3. for loops", correctness: false}, 
        {possible_answer: /* #4 */ "4. console.log", correctness: true}
        ]
    }
    ];
//
// Refer to the "display_quiz_question_screen()" function for more related information.
//
///////////////////////////////////////////////////////////////////////////////////////


//
//
//         PROGRAM START
//
// Display the introduction screen.
load_high_scores_information();
display_quiz_introduction_screen();
//
//
//
//
start_quiz_button.addEventListener("click", function() {
    if (quiz_in_progress == false) {
        current_question_number = 0;
        timer_count_current_value = 0;
        timer_count_display_area.innerHTML = timer_count_current_value;
        time_score_of_last_answer = 0;
        question_answer_is_selected = false;
        question_status_text.innerHTML = "";
        start_countdown_timer();
    }
    // (maybe no if?)
    // current_question_number = 0;
    // timer_count_current_value = 0;
    // timer_count_display_area.innerHTML = timer_count_current_value;
    // time_score_of_last_answer = 0;
    // start_countdown_timer();
});

// Start the necessary event listener processes; and process in the answer information array structure.
//
// answer button #1; index 0
question_answer_1_button.addEventListener("click", function(event) {
    if (question_answer_is_selected == false) {
        question_answer_is_selected = true;
        // window.alert("button: " + event.currentTarget.textContent);
        // window.alert("Process the quiz question answer status");
        process_quiz_question_information(0);  // 1st answer button; index 0
    }
    else {
        //
    }
});
// answer button #2; index 1
question_answer_2_button.addEventListener("click", function(event) {
    if (question_answer_is_selected == false) {
        question_answer_is_selected = true;
        // window.alert("button: " + event.currentTarget.textContent);
        // window.alert("Process the quiz question answer status");
        process_quiz_question_information(1);  // 2nd answer button; index 1
    }
    else {
        //
    }
});
// answer button #3; index 2
question_answer_3_button.addEventListener("click", function(event) {
    if (question_answer_is_selected == false) {
        question_answer_is_selected = true;
        // window.alert("button: " + event.currentTarget.textContent);
        // window.alert("Process the quiz question answer status");
        process_quiz_question_information(2);  // 3rd answer button; index 2
    }
    else {
        //
    }
});
// answer button #4; index 3
question_answer_4_button.addEventListener("click", function(event) {
    if (question_answer_is_selected == false) {
        question_answer_is_selected = true;
        // window.alert("button: " + event.currentTarget.textContent);
        // window.alert("Process the quiz question answer status");
        process_quiz_question_information(3);  // 4th answer button; index 3
    }
    else {
        //
    }
});
//
view_high_score_link.addEventListener("click", function() {
    clearInterval(timer_countdown_interval);
    quiz_in_progress = "false";
    question_answer_is_selected = false;
    timer_count_display_area.innerHTML = "**";
    view_high_score_link.style.visibility = "hidden";
    display_high_scores_screen();
    window.alert("Note:" + "\n" + 
        "\n" + 
        "This action cancelled the current quiz if one was in-progress." + "\n" + 
        "\n" + 
        "You can start a new quiz by clicking the \"Go back\" button at after when you view the high scores screen.");
    //
    // (another option because viewing high scores during the timed quiz seems silly)
    // if (quiz_in_progress == false) {
    //     view_high_score_link.style.visibility = "hidden";
    //     display_high_scores_screen();
    // }
    // else {
    //     window.alert("Wait until after the quiz.");
    // }
});
//
save_score_button.addEventListener("click", save_score);
//
go_back_button.addEventListener("click" , display_quiz_introduction_screen);
//
clear_scores_button.addEventListener("click", clear_high_scores);
//

function start_countdown_timer() {
    if (quiz_in_progress == false) {
        timer_count_current_value = 90;
        quiz_in_progress = true;
        display_quiz_question_screen();
        // Set the timer interval variable.
        timer_countdown_interval = setInterval(function() {
            timer_count_current_value = timer_count_current_value - 1;
            timer_count_display_area.innerHTML = timer_count_current_value;
            if(timer_count_current_value > 0) {
                // process_quiz_question_information();
            }
            else {
            // Stop the timer and end the quiz.
                clearInterval(timer_countdown_interval);
                quiz_in_progress = false;
                //window.alert("Prompt for the entry of high score information.");
                process_high_scores();
            }
        }, 1000);
    }
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
    completion_screen.style.visibility = "hidden";
    completion_screen.style.height = "1px";
    high_scores_screen.style.visibility = "hidden";
    high_scores_screen.style.height = "1px";
    timer_count_display_area.innerHTML = "**";
    quiz_in_progress = false;
    //clearInterval(timer_countdown_interval);
}

///////////////////////////////////////////////////////////////////////////////////////
// Display -- dynamically build and process -- the question screen of the current question (if any). 
function display_quiz_question_screen() {
    if (current_question_number < total_possible_questions) {
        current_question_number = current_question_number + 1;
        quiz_introduction_screen.style.visibility = "hidden";
        quiz_introduction_screen.style.height = "1px";
        quiz_question_screen.style.visibility = "visible";
        quiz_question_screen.style.height = "auto";
        question_status_text.style.visibility = "visible";
        question_status_text.style.textAlign = "left";
        question_answer_is_selected = false;
        //
        var current_question_button_text = ""
        question_text.innerHTML = question_object_list_array[(current_question_number - 1)].question_text;
    // Assign the current question text.
    // window.alert(question_object_list_array[(current_question_number - 1)].question_answers[0].possible_answer);
    // window.alert(question_object_list_array[(current_question_number - 1)].question_answers[0].correctness);
    for (answers_buttons_loop_index = 0; answers_buttons_loop_index <= (total_possible_answers_buttons - 1); 
        answers_buttons_loop_index = answers_buttons_loop_index + 1) {
        // Assign the possible answers of the current question.
        current_question_button_text = 
            question_object_list_array[(current_question_number - 1)].question_answers[answers_buttons_loop_index].possible_answer;
        switch (answers_buttons_loop_index) {  // button array index number : screen button sequence number
            case 0: question_answer_1_button.innerHTML = current_question_button_text;
                break;
            case 1: question_answer_2_button.innerHTML = current_question_button_text;
                break;
            case 2: question_answer_3_button.innerHTML = current_question_button_text;
                break;
            case 3: question_answer_4_button.innerHTML = current_question_button_text;
                break;
            }
        }
    };
//
// a test algorithm to display some sample answer-processing data; and for building the
// question information screen; and for using index information with the button events
//
// for (i1=0; i1 <= (total_possible_questions - 1); i1++) {
//     console.log("question_text: " + question_object_list_array[i1].question_text)
//     for (i2 = 0; i2 <= (total_possible_answers_buttons -1); i2++) {
//         console.log("for question: i" + i1 + "; add button: i" + i2);
//         console.log("answer text: " + question_object_list_array[i1].question_answers[i2].possible_answer);
//         console.log("correctness: " + question_object_list_array[i1].question_answers[i2].correctness);
//     }
// };
//
// INDEX.HTML file
// <!-- Quiz Question Screen -->
// <div id="quiz_question_screen" class="quiz_question_screen">
//     <div class="column_1">&nbsp</div>
//     <div class="column_2">
//         <h3 id="question_text">....</h3>
//         <div id="question_answer_1_button" class="button">....</div>
//         <div id="question_answer_2_button" class="button">....</div>
//         <div id="question_answer_3_button" class="button">....</div>
//         <div id="question_answer_4_button" class="button">....</div>
//     </div>
//     <div class="column_3">&nbsp</div>
// </div>
//
///////////////////////////////////////////////////////////////////////////////////////
}

function process_quiz_question_information(passed_answer_button_index_number) {  
    // index 0 to 3 for answer buttons #1 to #4 per question
    // Test to check about if the answer button that was clicked is the correct one for the question.
    //
    // Event-Handler Process
    // with a button index number is passed from event handler -->
    // if question_object_list_array[index].question_answers[index].correctness == true
    // then "Correct!"
    // else "Wrong!"
    //
    // question_object_list_array: <- object array
    //     question_text: string
    //     question_answers: <- object array
    //         possible_answer: string
    //         correctness: boolean
    //
    // window.alert(
    //    "passed answer/button index number: " + passed_answer_button_index_number + "\n" + "\n" + 
    //    "current question number: " + current_question_number + "\n" + "\n" + 
    //    "for question_text: " + question_object_list_array[(current_question_number - 1)].question_text + "\n" + "\n" + 
    //    "and answer text: " + 
    //    question_object_list_array[(current_question_number - 1)].question_answers[passed_answer_button_index_number].possible_answer + "\n" + "\n" + 
    //    "and correctness: " + 
    //        question_object_list_array[(current_question_number - 1)].question_answers[passed_answer_button_index_number].correctness);
    //
    question_status_text.style.visibility = "visible";
    question_status_text.style.textAlign = "left";
    //
    // Display the correct question status text and display the next question or the end screen.
    if (question_object_list_array[(current_question_number - 1)].question_answers[passed_answer_button_index_number].correctness == true) {
        question_status_text.innerHTML = "Correct!";
    }
    else {
        question_status_text.innerHTML = "Wrong!";
        // Acceptance Criteria: "Keep in mind that incorrect answers will penalize the user's score/time by 10 seconds!"
        timer_count_current_value = timer_count_current_value - 10;
    }
    if (current_question_number > 1) {
        question_status_text.innerHTML = question_status_text.innerHTML + "&nbsp&nbsp(previous answer)";
    }
    //
    if (current_question_number < total_possible_questions) {  // The quiz is not done.;
        display_quiz_question_screen();
    } 
    else {  // The quiz is done.
        clearInterval(timer_countdown_interval);
        quiz_in_progress = false;
        question_answer_is_selected = false;
        // Record the current official time-score for the current last-answered question.
        time_score_of_last_answer = timer_count_current_value;
        timer_count_display_area.innerHTML = time_score_of_last_answer;
        process_high_scores();
    }
}

function process_high_scores() { 
    var user_save_response = window.prompt("**** The Quiz is done! ****" + "\n" + 
    "\n" + 
    "All of the questions were answered or the timer expired (perhaps because of wrong-answer time decreases)." + "\n" + 
    "\n" + 
    "If you want to save your score with your name initials...enter the initials and click 'OK'; " + 
    "Otherwise click 'Cancel' to return to the introduction screen. " + 
    "Note: The answer status of the last question that was answered will be displayed on the save-score screen.");
    view_high_score_link.style.visibility = "visible";
    question_status_text.style.visibility = "visible";
    question_status_text.style.textAlign = "left";
    quiz_introduction_screen.style.visibility = "hidden";
    quiz_introduction_screen.style.height = "1px";
    quiz_question_screen.style.visibility = "hidden";
    quiz_question_screen.style.height = "1px";
    completion_screen.style.visibility = "visible";
    completion_screen.style.height = "auto";
    quiz_in_progress = false;
    //
    if (user_save_response == null) { 
        //clearInterval(timer_countdown_interval);
        display_quiz_introduction_screen();
    }
    else {
        // The user can use the features (field and button) of the high score screen to save their initials and score.
        initials_entry_field.value = user_save_response;
    }
    // Record the current official time-score for the current last-answered question.
    time_score_of_last_answer = timer_count_current_value;
    final_score.value = time_score_of_last_answer;
}

function load_high_scores_information() {
    var high_scores_history_field_temporary_processing = "";
    high_scores_history_field.innerHTML = "NONE YET";
    high_scores_local_storage_record_amount = localStorage.length;
    if (high_scores_local_storage_record_amount == null) high_scores_local_storage_record_amount = 0;
    // Search through all of the current local storage data records (if any) and load only the ones that are saved quiz scores.
    for (load_data_loop_index = 0; load_data_loop_index < high_scores_local_storage_record_amount; 
        load_data_loop_index = load_data_loop_index + 1) {
        if (localStorage.key(load_data_loop_index).indexOf("BCCQ-SCORE_") == 0) {
            // a unique key-indexing value that can be removed but it excludes all other local storage data that is not quiz-related.
        loaded_storage_data_record = (localStorage.key(load_data_loop_index).substring(11));
            // 11 is the 1st index that is at after the to-be-removed unique key-indexing exclusion value.
        loaded_storage_data_record = loaded_storage_data_record + " : " + 
            localStorage.getItem(localStorage.key(load_data_loop_index));
        //loaded_storage_data_record = JSON.parse(loaded_storage_data_record);
        high_scores_history_field_temporary_processing = high_scores_history_field_temporary_processing + "\n" + 
            loaded_storage_data_record;
        high_scores_history_field.innerHTML = high_scores_history_field_temporary_processing;
            }
        // else: next record (if any)
        }
}

function display_high_scores_screen() {
    view_high_score_link.style.visibility = "hidden";
    quiz_introduction_screen.style.visibility = "hidden";
    quiz_introduction_screen.style.height = "1px";
    quiz_question_screen.style.visibility = "hidden";
    quiz_question_screen.style.height = "1px";
    completion_screen.style.visibility = "hidden";
    completion_screen.style.height = "1px";
    high_scores_screen.style.visibility = "visible";
    high_scores_screen.style.height = "auto";
    question_status_text.style.visibility = "hidden";
}

function save_score() {
    if ((high_scores_local_storage_record_amount != null) && ((initials_entry_field.value != "") && (initials_entry_field.value.length < 32))) {
        // var temporary_process_high_score_record_object = { name_initials: initials_entry_field.value, time_score: time_score_of_last_answer};
        // var temporary_process_high_score_record_string = JSON.stringify(temporary_process_high_score_record_object);
        localStorage.setItem(("BCCQ-SCORE_" + initials_entry_field.value), time_score_of_last_answer);
        initials_entry_field.value = "";
        time_score_of_last_answer = "";
        completion_screen.style.visibility = "hidden";
        completion_screen.style.height = "1px";
        load_high_scores_information();
        display_high_scores_screen();
    }
    else {
        window.alert("ERROR: The score could not be saved. The entry field might be empty or containing an overly-long value.");
    }
}

function clear_high_scores() {
    high_scores_history_field.innerHTML = "NONE YET";
    localStorage.clear();
    load_high_scores_information();
}
