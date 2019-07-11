function loadRepos() {
	let repos = document.getElementById('repos');
	repos.innerHTML = '';
	const username = document.getElementById('username').value;
	const url = `https://api.github.com/users/${username}/repos`;

	fetch(url)
		.then(response => response.json())
		.then(data => displayRepos(data))
		.catch(err => displayError(err));

	function displayRepos(data) {
		for (let repo of data) {
			let link = document.createElement('a');
			link.textContent = repo.full_name;
			link.href = repo.html_url;
			link.target = '_blank';
			
			const listItem = document.createElement('li');
			listItem.appendChild(link);
			repos.appendChild(listItem);
		}
	}

	function displayError(err) {
		const listItem = document.createElement('li');
		listItem.textContent = err;
		repos.appendChild(listItem);
	}
}
