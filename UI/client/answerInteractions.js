window.onload = () => {
  const upvotes = document.querySelectorAll('a#upvotes');
  const downvotes = document.querySelectorAll('a#downvotes');
  const preferredAnswer = document.querySelectorAll('a#preferred');

  const sumVotes = (getAlldata) => {
    let totalUpvote = 0;
    let totalDownvote = 0;
    getAlldata.allVotes.forEach((stats) => {
      totalUpvote += stats.upvotes;
    });
    getAlldata.allVotes.forEach((stats) => {
      totalDownvote += stats.downvotes;
    });
    return {
      totalUpvote,
      totalDownvote,
    };
  };

  upvotes.forEach((link) => {
    link.onclick = (e) => {
      e.preventDefault();

      const upvoteDisplay = link.childNodes[1];
      const { pathname } = link;
      const accessVoteToken = localStorage.getItem('x-auth-token');

      fetch(pathname, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': accessVoteToken,
        },
      })
        .then((response) => {
          if (!response.ok) {
            return new Error(response.statusText);
          }
          return response.json();
        })
        .then((postData) => {

          fetch(pathname, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'x-auth-token': accessVoteToken,
            },
          })
            .then((response) => {
              if (!response.ok) {
                return new Error(response.statusText);
              }
              return response.json();
            })
            .then((getAlldata) => {
              const totalUserVotes = sumVotes(getAlldata);
              upvoteDisplay.innerHTML = totalUserVotes.totalUpvote;
            }).catch(error => new Error(error));
        })
        .catch(error => new Error(error));
    };
  });

  downvotes.forEach((link) => {
    link.onclick = (e) => {
      e.preventDefault();

      const downvoteDisplay = link.childNodes[1];
      const { pathname } = link;
      const accessDownvoteToken = localStorage.getItem('x-auth-token');

      fetch(pathname, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': accessDownvoteToken,
        },
      })
        .then((response) => {
          if (!response.ok) {
            return new Error(response.statusText);
          }
          return response.json();
        })
        .then((data) => {
          fetch(pathname, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'x-auth-token': accessDownvoteToken,
            },
          })
            .then(response => response.json())
            .then((getAllData) => {
              const totalUserVotes = sumVotes(getAllData);
              downvoteDisplay.innerHTML = totalUserVotes.totalDownvote;
            })
            .catch(error => new Error(error));
        })
        .catch(error => new Error(error));
    };
  });
};
