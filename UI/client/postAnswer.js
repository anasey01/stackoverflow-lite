const answerBtn = document.getElementById('answer-btn');
const noOfAnswer = document.getElementById('number-of-answer');
const messageOutput = document.getElementById('message-output');
const answerContainer = document.getElementById('answer-container');

const accessToken = localStorage.getItem('x-auth-token');
const { pathname } = new URL(window.location.href);
const answerUrl = `/api/v1${pathname}/answers`;

const getAnswer = () => {
  fetch(answerUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': accessToken,
    },
  })
    .then(response => response.json())
    .then((data) => {
      const numberOfAnswer = data.message.length;
      noOfAnswer.innerHTML = numberOfAnswer;
      for (let i = 0; i < data.message.length; i += 1) {
        let  { answernumber, username, answer, upvotes, downvotes, accepted } = data.message[i];
        const upvoteUrl = `api/v1${pathname}/${answernumber}/upvote`;
        const downvoteUrl = `api/v1${pathname}/${answernumber}/downvote`;

        const answerCard = `<div class="answers-by-others">
      <p class="name">${username}</p>
      <p class="answer-by-others-content">${answer}</p>
      <p><span><a href=${upvoteUrl}>upvote ${upvotes}</a></span> <span><a href=${downvoteUrl}>downvote ${downvotes} </a></span><span><a href=>prefered ${accepted}</a></span></p>
      </div>`;
        answerContainer.innerHTML += answerCard;
      }
    })
    .catch(error => new Error(error));
};

const postAnswer = (e) => {
  const answer = document.getElementById('question-answer');

  e.preventDefault();

  fetch(answerUrl, {
    method: 'POST',
    body: JSON.stringify({
      answer: answer.value,
    }),
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': accessToken,
    },
  })
    .then((response) => {
      if (!response.ok) {
        const error = new Error(response.statusText);
        return error;
      }
      return response.json();
    })
    .then((data) => {
      if (data.success) {
        answer.value = '';
        messageOutput.innerHTML = data.message;
        setTimeout(() => {
          getAnswer();
        });
      }
    })
    .catch((error) => {
      const err = new Error(error);
      return err;
    });
};


answerBtn.addEventListener('click', postAnswer);
