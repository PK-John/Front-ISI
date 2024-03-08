document.addEventListener("DOMContentLoaded", function () {
    const baseUrl = "http://localhost:5000/historico/";

    function updateH1WithHistoricoData(historicoData) {
        const historicoElement = document.getElementById('historicoInfo');
        if (historicoElement) {
            historicoElement.innerHTML = '';  // Limpar o conteúdo anterior

            historicoData.forEach(disciplina => {
                const h2Element = document.createElement('h2');
                h2Element.textContent = `Disciplina: ${disciplina.disciplina_nome}`;

                const ulElement = document.createElement('ul');

                for (const prop in disciplina) {
                    if (prop !== 'disciplina_nome') {
                        const liElement = document.createElement('li');
                        liElement.textContent = `${prop}: ${disciplina[prop]}`;
                        ulElement.appendChild(liElement);
                    }
                }

                historicoElement.appendChild(h2Element);
                historicoElement.appendChild(ulElement);
            });
        } else {
            console.error("Elemento historicoInfo não encontrado.");
        }
    }

    function getHistoricoById(id) {
        const url = `${baseUrl}${id}`;

        axios
            .get(url)
            .then(response => {
                const historicoData = response.data;
                updateH1WithHistoricoData(historicoData);
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
                    getHistoricoById(searchValue);
                }
            } else {
                console.error("Elemento searchInput não encontrado.");
            }
        });
    } else {
        console.error("Elemento searchForm não encontrado.");
    }
});
