function getInfo() {
    const stopId = Number(document.getElementById('stopId').value);
    const busesList = document.getElementById('buses');
    busesList.innerHTML = '';

    const req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            const busStop = JSON.parse(this.responseText);
            const buses = busStop.buses;

            setStopName(busStop.name);
            for (const bus in buses) {
                const listItem = document.createElement('li');
                listItem.textContent = `Bus ${bus} arrives in ${buses[bus]}`;
                busesList.appendChild(listItem);
            }
        } else if (this.status === 401) {
            setStopName('Error');
        }
    };

    if (Number.isInteger(stopId)) {
        req.open('GET', `https://judgetests.firebaseio.com/businfo/${stopId}.json `, true);
        req.send();
    } else {
        setStopName('Error');
    }

    function setStopName(name) {
        document.getElementById('stopName').textContent = name;
    }
}
