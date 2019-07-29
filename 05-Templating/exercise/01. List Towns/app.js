function attachEvents() {
    let loadTownsButton = document.querySelector('#btnLoadTowns');
    loadTownsButton.addEventListener('click', loadTowns);

    function loadTowns(event) {
        event.preventDefault();
        document.querySelector('#root').innerHTML = '';

        let inputField = document.querySelector('#towns').value;
        let towns = inputField = inputField.split(', ')
            .map(t => ({ name: t }));

        renderTowns(towns);
    }

    function renderTowns(towns) {
        let sourceTemplate = document.querySelector('#hb-template').innerHTML;
        let templateFn = Handlebars.compile(sourceTemplate);

        let finalHtml = templateFn({ towns });
        document.querySelector('#root').innerHTML = finalHtml;
    }
}

attachEvents();
