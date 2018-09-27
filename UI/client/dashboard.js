const userGreeting = document.getElementById('username-greeting');
const currentTab = document.getElementById('currentTab');
const textContent = document.getElementById('text-content');
const questionByUser = document.getElementById('allquestion');
const currentUserOnDashboard = localStorage.getItem('currentUser');
const allQuestionByUserUrl = `/api/v1/question/${currentUserOnDashboard}`;
const tokenAccessDashboard = localStorage.getItem('x-auth-token');

userGreeting.innerHTML = currentUserOnDashboard;

window.onload = (e) => {
  e.preventDefault();

  fetch(allQuestionByUserUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': tokenAccessDashboard,
    },
  })
    .then(response => response.json())
    .then((allQuestions) => {
      if (allQuestions.success !== false) {
        currentTab.innerHTML = `All Questions Asked By ${currentUserOnDashboard}`;
        let cardQuestion = '';
        allQuestions.userQuestions.forEach((que) => {
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
          textContent.innerHTML += cardQuestion;
        });
      }
    })
    .catch(error => new Error(error));
};
