function loadRepos() {
    // let req = new XMLHttpRequest();

    // req.onreadystatechange = function () {
    //     if (this.readyState === 4 && this.status === 200) {
    //         document.getElementById('res').textContent = this.responseText;
    //     }
    // };

    // req.open('GET', 'https://api.github.com/users/kostanikolov/repos', true);
    // req.send();

    // fetch('https://api.github.com/users/paveldk/repos')
    //     .then(function (response) {
    //         if (response.status !== 200) return;

    //         response.json()
    //             .then(function (data) {
    //                 console.log(data);
    //                 data.forEach(item => {
    //                     let li = document.createElement('li');
    //                     li.textContent = item.full_name;
    //                     document.getElementById('result-list').appendChild(li);
    //                 });
    //             });
    //     });

    // for (let i = 1; i < 89; i++) {
    //     fetch(`https://swapi.co/api/people/${i}`)
    //         .then((response) => {
    //             console.log(response);
    //             return response.json();
    //         })
    //         .then((data) => {
    //             let li = document.createElement('li');
    //             li.textContent = data.name;
    //             document.getElementById('result-list').appendChild(li);
    //         })
    //         .catch((error) => console.error(error))
    // }

    // let username = 'john';
    // let password = 'doe';
    // let url = `https://httpbin.org/basic-auth/${username}/${password}`
    // let authString = `${username}:${password}`
    // let headers = new Headers();
    // headers.set('Authorization', 'Basic ' + btoa(authString))
    // fetch(url,{method: 'GET', headers: headers})
    //     .then(function (response) {
    //         console.log (response)
    //         return response
    //     });

    // let url = 'https://api.github.com/repos/testnakov/test-nakov-repo/issues';
    // let username = 'kostanikolov';
    // let password = 'some-pass';
    // let authString = `${username}:${password}`

    // let headers = new Headers();
    // headers.set('Authorization', 'Basic ' + btoa(authString));

    // let data = {
    //     "title": "JS Code",
    //     "body": "Fetching bug with JS code"
    // };

    // fetch(url, {
    //     method: 'POST',
    //     headers: headers,
    //     body: JSON.stringify(data),
    // })
    //     .then(response => response.json())
    //     .then(json => console.log(json));
}

loadRepos();
