function solve() {
    let baseUrl = 'https://judgetests.firebaseio.com/schedule/';
    let currentId = 'depot';
    let currentStop = '';

    function depart() {
        let url = baseUrl + currentId + '.json';

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                document.querySelector('.info').textContent = `Next stop ${data.name}`;
                currentStop = data.name;
                currentId = data.next;
            });

        document.getElementById('depart').disabled = true;
        document.getElementById('arrive').disabled = false;
    }

    function arrive() {
        document.querySelector('.info').textContent = `Arriving at ${currentStop}`;
        document.getElementById('depart').disabled = false;
        document.getElementById('arrive').disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();
