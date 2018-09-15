const url = 'https://anasey-stackoverflow-lite.herokuapp.com/api/v1/questions';
const btn = document.getElementById('btn');

const postQuestion = (e) => {
  e.preventDefault();

  const questionTitle = document.getElementById('title').value;
  const questionContent = document.getElementById('content').value;
  const token = localStorage.getItem('x-auth-token');

  console.log('token is ', token);
  fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      questionTitle,
      questionContent,
    }),
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    },
  })
    .then((response) => {
      console.log(response);
      response.json();
    })
    .then((data) => {
      console.log('Data is', data);
    })
    .catch((error) => {
      throw error;
    });
};

btn.addEventListener('click', postQuestion);
