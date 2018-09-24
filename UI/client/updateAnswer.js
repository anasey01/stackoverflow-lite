const updateLoginBtn = document.getElementById('login');
const updateSignupBtn = document.getElementById('signup');
const updateLogoutBtn = document.getElementById('logout');
const updateQuestionTitle = document.getElementById('question-title');
const updateQuestioncontent = document.getElementById('question-content');
const updateQuestionAuthor = document.getElementById('question-author');
const updateCreationDate = document.getElementById('creation-date');
const editAnswerBtn = document.querySelector('button');
const editMessageOutput = document.getElementById('edit-message-output');
const editMessageContainer = document.getElementById('update-answer-container');

const updateAnswerPathname = new URL(window.location).pathname;
const updateAnswerUrl = `/api/v1${updateAnswerPathname}`;
const updateAnswerToken = localStorage.getItem('x-auth-token');
const currentQuestionPath = localStorage.getItem('currentQuestion');
const currentQuestionUrl = `/api/v1${currentQuestionPath}`;


if (updateAnswerToken) {
  updateLoginBtn.classList.add('disabled');
  updateSignupBtn.classList.add('disabled');
  updateLogoutBtn.classList.add('enabled');
}

const loadQuestion = () => {
  fetch(currentQuestionUrl, {
    method: 'GET',
    headers: {
      'x-auth-token': updateAnswerToken,
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
      if (data.message === 'error') {
        window.location.replace('./../UI/login.html');
      } else {
        updateQuestionTitle.innerHTML = data.question.questiontitle;
        updateQuestioncontent.innerHTML = data.question.questioncontent;
        updateQuestionAuthor.innerHTML = data.question.username;
        updateCreationDate.innerHTML = data.question.createdat;
      }
    })
    .catch(error => new Error(error));
};

loadQuestion();

const updateAnswer = (e) => {
  e.preventDefault();
  const updatedAnswer = document.getElementById('edit-question-answer');

  fetch(updateAnswerUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': updateAnswerToken,
    },
    body: JSON.stringify({
      answer: updatedAnswer.value,
    }),
  })
    .then((response) => {
      console.log(response);
      if (!response.ok) {
        const error = new Error(response.statusText);
        return error;
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      editMessageOutput.innerHTML = data.message;
      updatedAnswer.value = '';
      const updateAnswerCard = `<div class="answers-by-others">
      <p class="name">${data.answer.username}</p>
      <p class="answer-by-others-content">${data.answer.answer}</p>
      <p><span><a id="upvotes">upvote ${data.answer.upvotes}</a></span> <span><a id="downvotes">downvote ${data.answer.downvotes} </a></span><span><a id="preferred">preferred ${data.answer.accepted}</a></span></p>
      </div>`;

      editMessageContainer.innerHTML = updateAnswerCard;
    });
};

editAnswerBtn.addEventListener('click', updateAnswer);
