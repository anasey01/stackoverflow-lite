const answerBtn = document.getElementById('answer-btn');
const noOfAnswer = document.getElementById('number-of-answer');
const messageOutput = document.getElementById('message-output');
const answerContainer = document.getElementById('answer-container');


const accessToken = localStorage.getItem('x-auth-token');
const currentUser = localStorage.getItem('currentUser');
const { pathname } = new URL(window.location.href);
const answerUrl = `/api/v1${pathname}/answers`;

const formatCommentAnswer = (answersArr, commentsArr) => {
  const aComments = [];
  answersArr.forEach((ansObj, index) => {
    const currentIndex = index;
    aComments.push({
      questionId: ansObj.questionid,
      answerId: ansObj.answernumber,
      answer: ansObj.answer,
      username: ansObj.username,
      createdAt: ansObj.createdat,
      accepted: ansObj.accepted,
      upvotes: ansObj.upvotes,
      downvotes: ansObj.downvotes,
      userComments: [],
    });

    commentsArr.forEach((comObj) => {
      if (comObj.answerid === aComments[currentIndex].answerId) {
        aComments[currentIndex].userComments.push({
          comment: comObj.comment,
          username: comObj.username,
          createdAt: comObj.createdat,
        });
      }
    });
  });

  return aComments;
};

const getAnswer = () => {
  fetch(answerUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': accessToken,
    },
  })
    .then(response => response.json())
    .then((resData) => {
      const formatedData = formatCommentAnswer(resData.data.answer.result, resData.data.answer.userComment);
      noOfAnswer.innerHTML = formatedData.length;

      formatedData.forEach((ans, index) => {
        let currentAnswerIndex = index;
        const {
          answerId, username, answer, upvotes, downvotes, accepted,
        } = ans;
        const upvoteUrl = `/api/v1${pathname}/answers/${answerId}/upvote`;
        const downvoteUrl = `/api/v1${pathname}/answers/${answerId}/downvote`;
        const commentUrl = `${pathname}/answers/${answerId}/comment`;
        const editAnswerUrl = `${pathname}/answers/${answerId}`;

        if (formatedData[currentAnswerIndex].userComments.length > 0) {
          formatedData[currentAnswerIndex].userComments.forEach((com) => {
            let createdDate = com.createdAt.toString();

            let displayCard = `<div class="answers-by-others">
                <p id="username" class="name">${username}</p>
                <p class="answer-by-others-content">${answer}</p>
                <p class="edit-container"><a id="visibility" class="edit-answer" href=${editAnswerUrl}>Edit Answer<a/></p>
                <p class="comment-container"><a id="add-comment" href=${commentUrl}>Add Comment</a></p>
                <p id="interactions"><a id="upvotes" href=${upvoteUrl}> upvote <span id="upvoteDisplay"> ${upvotes} </span></a> <a id="downvotes" href=${downvoteUrl}> downvote <span id="downvoteDisplay"> ${downvotes} </span></a> <a id="preferred" href=''> preferred <span id="markAnswerDisplay"> ${accepted} </span></a></p>
                <div id="comment-container" class="comment-section">
                  <span id="comment-text">${com.comment} </span><span id="comment-author"> ${com.username}</span><span id="createdAtComment">${calculateTiming(createdDate)}</span>
                </div>
            </div>`;
            answerContainer.innerHTML += displayCard;
          });
        } else {
          let answerCard = `<div class="answers-by-others">
          <p id="username" class="name">${username}</p>
          <p class="answer-by-others-content">${answer}</p>
          <p><a id="visibility" href=${editAnswerUrl}>Edit Answer<a/></p>
          <p><a id="add-comment" href=${commentUrl}>Add Comment</a></p>
          <p id="interactions"><a id="upvotes" href=${upvoteUrl}> upvote <span id="upvoteDisplay"> ${upvotes} </span></a><a id="downvotes" href=${downvoteUrl}> downvote <span id="downvoteDisplay"> ${downvotes} </span></a> <a id="preferred" href=''> preferred <span id="markAnswerDisplay"> ${accepted} </span></a></p>
          </div>`;
          answerContainer.innerHTML += answerCard;
        }

        const editBtnVisibility = document.getElementById('visibility');
        const answerAuthor = document.getElementById('username').innerHTML;

        if (currentUser !== answerAuthor) {
          editBtnVisibility.classList.add('disabled');
        }
      });
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
          messageOutput.innerHTML = '';
          window.location.reload();
        }, 500);
      }
    })
    .catch((error) => {
      const err = new Error(error);
      return err;
    });
};


answerBtn.addEventListener('click', postAnswer);
