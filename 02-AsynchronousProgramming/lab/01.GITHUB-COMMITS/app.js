function loadCommits() {
    document.getElementById('commits').innerHTML = '';

    let username = document.getElementById('username').value;
    let repository = document.getElementById('repo').value;

    let url = `https://api.github.com/repos/${username}/${repository}/commits`;

    fetch(url)
        .then((response) => {
            if (response.status >= 300) {
                throw new Error(`Error: ${response.status} (Not Found)`);
            }

            return response.json();
        })
        .then((data) => {
            data.forEach(commit => {
                let authorName = commit.commit.author.name;
                let commitMessage = commit.commit.message;

                let item = `<li>${authorName}: ${commitMessage}</li>`;
                document.getElementById('commits').innerHTML += item;
            });
        })
        .catch((err) => {
            document.getElementById('commits').innerHTML += `<li>${err.message}</li>`;
        });
}
