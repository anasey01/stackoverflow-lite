const questionTitle = document.getElementById('question-title');
const questionContent = document.getElementById('question-content');
const answerNumber = document.getElementById('number-of-answer');
const viewQuestionLoginBtn = document.getElementById('login');
const viewQuestionLogoutBtn = document.getElementById('logout');
const viewQuestionSignupBtn = document.getElementById('signup');

const token = localStorage.getItem('x-auth-token');
const url = `/api/v1${new URL(window.location.href).pathname}`;


if (token) {
  viewQuestionLoginBtn.classList.add('disabled');
  viewQuestionSignupBtn.classList.add('disabled');
  viewQuestionLogoutBtn.classList.add('enabled');
}

fetch(url, {
  method: 'GET',
  headers: {
    'x-auth-token': token,
  },
})
  .then((response) => {
    console.log(response);
    if (!response.ok) {
      const error = new Error('error');
      return error;
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
    if (data.message === 'error') {
      window.location.replace('./../UI/login.html');
    } else {
      questionTitle.innerHTML = data.questionTitle;
      questionContent.innerHTML = data.questionContent;
      answerNumber.innerHTML = data.answers.length;
    }
  })
  .catch(error => new Error(error));
