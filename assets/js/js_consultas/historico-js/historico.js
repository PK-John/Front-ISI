document.addEventListener("DOMContentLoaded", function () {
    const baseUrl = "http://localhost:5000/alunos/";

    function redirectToAlunoPage(alunoId) {
        const newPageUrl = `/assets/pages/historico/dados_historico.html?id=${alunoId}`;
        window.location.href = newPageUrl;
    }

    function getAlunoById(id) {
        const url = `${baseUrl}${id}`;

        axios
            .get(url)
            .then(response => {
                const alunoData = response.data;
                redirectToAlunoPage(alunoData.id);
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
