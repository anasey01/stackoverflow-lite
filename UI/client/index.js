const loginBtn = document.getElementById('login');
const signupBtn = document.getElementById('signup');
const logoutBtn = document.getElementById('logout');
const dashboard  = document.getElementById('dashboard');
const questionContainer = document.getElementById('question-container');

const url = '/api/v1/questions';
const token = localStorage.getItem('x-auth-token');


if (token) {
  loginBtn.classList.add('disabled');
  signupBtn.classList.add('disabled');
  logoutBtn.classList.add('enabled');
  dashboard.classList.add('enabled');
}

fetch(url, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'x-auth-token': token,
  },
})
  .then((response) => {
    if (!response.ok) {
      const error = new Error('error');
      return error;
    }
    return response.json();
  })
  .then((data) => {
    if (data.success !== false) {
      data.questions.forEach((question) => {
        let date = question.createdat.toString();
        const hrefUrl = `/questions/${question.questionid}`;
        let questionsCard = `<div class="question-summary">
                              <div class="summary">
                              <h3><a class="summary-title" href=${hrefUrl}>${question.questiontitle}</a></h3>
                          </div>
                          <div class="answer-stats">
                            <span class="number-of-answers">${question.noofanswer} <span>answer</span></span>
                            <a class="asked-by-time">${calculateTiming(date)}</a>
                            <a class="asked-by-author" href="#">${question.username}</a>
                          </div>
                        </div>`;

        questionContainer.innerHTML += questionsCard;
      });
    }
  });
