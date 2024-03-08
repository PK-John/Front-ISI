document.addEventListener("DOMContentLoaded", function () {
    const baseUrl = "http://localhost:5000/disciplinas/";

    function updateH1WithDisciplinaData(disciplinaData) {
        const h1Element = document.getElementById('disciplinaInfo');
        if (h1Element) {
            const h2Element = document.createElement('h2');
            h2Element.textContent = `Nome: ${disciplinaData.nome}`;
            
            const ulElement = document.createElement('ul');

            for (const prop in disciplinaData) {
                if (Object.prototype.hasOwnProperty.call(disciplinaData, prop) && prop !== 'nome') {
                    const liElement = document.createElement('li');
                    liElement.textContent = `${prop}: ${disciplinaData[prop]}`;
                    ulElement.appendChild(liElement);
                }
            }

            h1Element.innerHTML = '';  // Limpar o conteúdo anterior
            h1Element.appendChild(h2Element);
            h1Element.appendChild(ulElement);
        } else {
            console.error("Elemento h1 não encontrado.");
        }
    }

    function getDisciplinaById(id) {
        const url = `${baseUrl}${id}`;

        axios
            .get(url)
            .then(response => {
                const disciplinaData = response.data;
                updateH1WithDisciplinaData(disciplinaData);
            })
            .catch(error => {
                console.log(error);
                console.log("Erro na requisição");
            });
    }

    const searchForm = document.getElementById('searchForm');

    if (searchForm) {
        searchForm.addEventListener('submit', function (event) {
            event.preventDefault();
            
            const searchInput = document.getElementById('searchInput');

            if (searchInput) {
                const searchValue = searchInput.value;

                if (searchValue.trim() !== '') {
                    getDisciplinaById(searchValue);
                }
            } else {
                console.error("Elemento searchInput não encontrado.");
            }
        });
    } else {
        console.error("Elemento searchForm não encontrado.");
    }
});
