//To Append on
let textContent  = document.getElementById("text-content");
//Selectors
let allQuestion  = document.getElementById("allquestion");
let allAnswer    = document.getElementById("allanswers");
let mostAnswered = document.getElementById("mostanswered");

allQuestion.onclick = ()=>{
    viewAllQuestionsByUser();
}

allAnswer.onclick = ()=>{
    viewAllAnswersByUser();
}

mostAnswered.onclick = ()=>{
    viewMostAnsweredQuestion();
}

//populate Blog Content
let createBlogContent = (textTitle,textBody)=>{
    textContent.innerHTML = "<h1>All Question By user</h1>";
    var link = document.createElement("a");
    var title = document.createElement("h3");
    link.appendChild(title);
    title.innerHTML = textTitle;
    var body = document.createElement("p")
    body.innerHTML = textBody;
    textContent.appendChild(title);
    textContent.appendChild(body);
}

//Functions implementation
let viewAllQuestionsByUser = ()=>{
   createBlogContent("Retrieve WFS Map Content with Geotools in Java", "I am trying to retrieve Map content via WFS Geoserver connection in Java with Geotools 18.4. But I am getting the following error: Content type is required for org.geotools.data.ows.Response.");
}

let viewAllAnswersByUser = ()=>{
    textContent.innerHTML = "<h1>All Answers By user</h1>";
    var answers = document.createElement("p");
    answers.innerHTML = "This is something you answered"
    textContent.appendChild(answers);
    return;
}

let viewMostAnsweredQuestion = ()=>{
    textContent.innerHTML = "<h1>Most Answers to Questions</h1>";
    var answers = document.createElement("p");
    answers.innerHTML = "This is Most answered question"
    textContent.appendChild(answers);
    return;
}