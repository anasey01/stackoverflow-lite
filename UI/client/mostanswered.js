const currentTextMostAnswer = document.getElementById('text-most-answered');
const allQuestionByUser = document.getElementById('allquestion');
const mostAnsweredCurrentUser = localStorage.getItem('currentUser');
const textContentMostAnswer = document.getElementById('text-content-most');
const tokenAccessDashboardMostAnswer = localStorage.getItem('x-auth-token');
const allQuestionByUserUrl = `/api/v1/question/${mostAnsweredCurrentUser}`;
const mostAnsweredQuestionUrl = `/api/v1/question/${mostAnsweredCurrentUser}/mostanswers`;


fetch(mostAnsweredQuestionUrl, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'x-auth-token': tokenAccessDashboardMostAnswer,
  },
})
  .then(response => response.json())
  .then((mostAnswers) => {
    if (mostAnswers.success === true) {
      currentTextMostAnswer.innerHTML = `Most Answers to Question By ${mostAnsweredCurrentUser}`;
      let cardQuestion = '';
      mostAnswers.mostAnswers.forEach((que) => {
        const questionUrlhref = `/questions/${que.questionid}`;
        cardQuestion = `
            <div class="question-summary">
            <div class="summary">
                <h3><a href=${questionUrlhref}>${que.questiontitle}</a></h3>
            </div>
            <div class="asked-by">
          <span class="number-of-answers"> ${que.noofanswer}<span> answer</span></span>
                <a class="asked-by-time"> ${que.createdat}</a>
                <a class="asked-by-author" href="#"> ${que.username}</a>
            </div>
        </div>`;
        textContentMostAnswer.innerHTML += cardQuestion;
      });
    }
  })
  .catch(error => new Error(error.message));

allQuestionByUser.onclick = (e) => {
  e.preventDefault();
  window.location.replace('dashboard.html');
};
