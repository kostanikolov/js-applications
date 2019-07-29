(() => {
    renderCatTemplate();
    getCatsDom();

    function renderCatTemplate() {
        const source = document.getElementById('cat-template').innerHTML;
        const templateFn = Handlebars.compile(source);

        const finalHtml = templateFn({ cats });
        document.getElementById('allCats').innerHTML = finalHtml;
    }

    function getCatsDom() {
        // console.log([...document.querySelectorAll('li div button')]);
        [...document.querySelectorAll('li div button')].forEach(btn => {
            btn.addEventListener('click', showStatusCode);
        });
    }

    function showStatusCode(event) {
        console.log(event.target.nextSibling.textContent);
    }
})();
