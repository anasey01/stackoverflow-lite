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
      let questionsCard = '';
      const lastQuestion = data.questions.length - 1;
      for (let i = lastQuestion; i >= 0; i -= 1) {
        const hrefUrl = `/questions/${data.questions[i].questionid}`;
        questionsCard = `<div class="question-summary">
                              <div class="summary">
                              <h3><a href=${hrefUrl}>${data.questions[i].questiontitle}</a></h3>
                          </div>
                          <div class="asked-by">
                            <span class="number-of-answers">${data.questions[i].noofanswer} <span>answer</span></span>
                            <a class="asked-by-time">${data.questions[i].createdat}</a>
                            <a class="asked-by-author" href="#">${data.questions[i].username}</a>
                          </div>
                        </div>`;

        questionContainer.innerHTML += questionsCard;
      }
    }
  });
