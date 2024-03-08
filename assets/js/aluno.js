document.addEventListener("DOMContentLoaded", function () {
    const baseUrl = "http://localhost:5000/alunos/";

    function updateH1WithAlunoData(alunoData) {
        const h1Element = document.getElementById('alunoInfo');
        if (h1Element) {
            const h2Element = document.createElement('h2');
            h2Element.textContent = `Nome: ${alunoData.nome}`;
            
            const ulElement = document.createElement('ul');

            for (const prop in alunoData) {
                if (Object.prototype.hasOwnProperty.call(alunoData, prop) && prop !== 'nome') {
                    const liElement = document.createElement('li');
                    liElement.textContent = `${prop}: ${alunoData[prop]}`;
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

    function getAlunoById(id) {
        const url = `${baseUrl}${id}`;

        axios
            .get(url)
            .then(response => {
                const alunoData = response.data;
                updateH1WithAlunoData(alunoData);
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
            const searchValue = document.getElementById('searchInput').value;

            if (searchValue.trim() !== '') {
                getAlunoById(searchValue);
            }
        });
    } else {
        console.error("Elemento searchForm não encontrado.");
    }
});
