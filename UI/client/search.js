const queryParameter = window.location.search;
const searchUrl = `/api/v1/search${queryParameter}`;
const searchToken = localStorage.getItem('x-auth-token');
const searchBtn = document.getElementById('searchBtn');
const searchContent = document.getElementById('search-content');
const searchMessageOutput = document.getElementById('search-message-output');
const searchTerm = queryParameter.substring(queryParameter.indexOf('=') + 1, queryParameter.length).replace(/[+]/g, ' ');

const search = () => {
  fetch(searchUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': searchToken,
    },
  })
    .then((response) => {
      if (!response.ok) {
        return new Error(response.statusText);
      }
      return response.json();
    })
    .then((searchResult) => {
      console.log('Search Result', searchResult.match.length);
      searchMessageOutput.style.display = 'block';
      searchMessageOutput.innerHTML = `Seach Result for "${searchTerm}"`;
      if (searchResult.success !== false) {
        if (searchResult.match.length >= 1) {
          searchResult.match.forEach((quesMatch) => {
            let questionMatchUrl = `/questions/${quesMatch.questionid}`;
            let questionDisplayOutput =
                    `<div class="question-summary">
                          <div class="summary">
                          <h3><a href=${questionMatchUrl}>${quesMatch.questiontitle}</a></h3>
                      </div>
                      <div class="asked-by">
                        <a class="asked-by-time">${quesMatch.createdat}</a>
                        <a class="asked-by-author" href="#">${quesMatch.username}</a>
                        </div>
                      </div>`;
            searchContent.innerHTML += questionDisplayOutput;
          });
        }else {
          const noSearchResult = document.createElement('h2');
          noSearchResult.innerHTML = `No Result Found For ${searchTerm}`;
          searchContent.appendChild(noSearchResult);
        }
      }
    })
    .catch(error => new Error(error.message));
};

search();

searchBtn.addEventListener('click', search);