document.addEventListener("DOMContentLoaded", function () {
    const alunoDetailsContainer = document.getElementById('alunoDetails');
    
    function getAlunoIdFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
    }

    function getAndDisplayAlunoDetails() {
        const alunoId = getAlunoIdFromURL();

        if (alunoId) {
            const apiUrl = `http://localhost:5000/alunos/${alunoId}`;

            axios
                .get(apiUrl)
                .then(response => {
                    const alunoData = response.data;
                    displayAlunoDetails(alunoData);
                    fetchDisciplinasCount(alunoId);
                    fetchDisciplinasNaoCursadasCount(alunoId);
                    fetchReprovacoesCount(alunoId);
                })
                .catch(error => {
                    console.error(error);
                    console.error("Erro na requisição");
                });
        } else {
            console.error("ID do aluno não encontrado na URL.");
        }
    }

    function displayAlunoDetails(alunoData) {
        const h2Element = document.createElement('h2');
        h2Element.textContent = `${alunoData.nome}`;

        const ulElement = document.createElement('ul');

        for (const prop in alunoData) {
            if (Object.prototype.hasOwnProperty.call(alunoData, prop) && prop !== 'nome') {
                const liElement = document.createElement('li');
                liElement.textContent = `${prop}: ${alunoData[prop]}`;
                ulElement.appendChild(liElement);
            }
        }

        alunoDetailsContainer.appendChild(h2Element);
        alunoDetailsContainer.appendChild(ulElement);
    }

    function fetchDisciplinasCount(alunoId) {
        const apiUrl = `http://localhost:5000/historico/disciplinas-cursadas/${alunoId}`;
    
        axios
            .get(apiUrl)
            .then(response => {
                const disciplinasData = response.data.disciplinas_cursadas;
    
                console.log("Resposta da requisição de disciplinas:", disciplinasData);
    
                if (Array.isArray(disciplinasData)) {
                    const disciplinasCount = disciplinasData.length;
                    displayDisciplinasCount(disciplinasCount);
                } else {
                    console.error("A resposta da requisição não é uma array.", disciplinasData);
                }
            })
            .catch(error => {
                console.error(error);
                console.error("Erro na requisição de disciplinas");
            });
    }

    function displayDisciplinasCount(count) {
        const disciplinasCountSpan = document.getElementById('disciplinasCount');
        
        if (disciplinasCountSpan) {
            disciplinasCountSpan.textContent = `${count}`;
        } else {
            console.error("Elemento disciplinasCountSpan não encontrado.");
        }
    }

    function fetchDisciplinasNaoCursadasCount(alunoId) {
        const apiUrl = `http://localhost:5000/historico/disciplinas-nao-cursadas/${alunoId}`;
    
        axios
            .get(apiUrl)
            .then(response => {
                const disciplinasNaoCursadasData = response.data.disciplinas_nao_cursadas;
    
                console.log("Resposta da requisição de disciplinas não cursadas:", disciplinasNaoCursadasData);
    
                if (Array.isArray(disciplinasNaoCursadasData)) {
                    const disciplinasNaoCursadasCount = disciplinasNaoCursadasData.length;
                    displayDisciplinasNaoCursadasCount(disciplinasNaoCursadasCount);
                } else {
                    console.error("A resposta da requisição não é uma array.", disciplinasNaoCursadasData);
                }
            })
            .catch(error => {
                console.error(error);
                console.error("Erro na requisição de disciplinas não cursadas");
            });
    }

    function displayDisciplinasNaoCursadasCount(count) {
        const disciplinasNaoCursadasCountSpan = document.getElementById('disciplinasNaoCursadasCount');
    
        if (disciplinasNaoCursadasCountSpan) {
            disciplinasNaoCursadasCountSpan.textContent = `${count}`;
        } else {
            console.error("Elemento disciplinasNaoCursadasCountSpan não encontrado.");
        }
    }

    function fetchReprovacoesCount(alunoId) {
        const apiUrl = `http://localhost:5000/historico/reprovacoes/aluno/${alunoId}`;
    
        axios
            .get(apiUrl)
            .then(response => {
                const reprovacoesData = response.data;
    
                console.log("Resposta da requisição de reprovações:", reprovacoesData);
    
                if (reprovacoesData && reprovacoesData.num_reprovacoes !== undefined) {
                    const numReprovacoes = reprovacoesData.num_reprovacoes;
                    displayReprovacoesCount(numReprovacoes);
                } else {
                    console.error("A resposta da requisição não contém a propriedade 'num_reprovacoes' ou o valor é indefinido.", reprovacoesData);
                    displayReprovacoesCountError();
                }
            })
            .catch(error => {
                console.error(error);
                console.error("Erro na requisição de reprovações");
                displayReprovacoesCountError();
            });
    }
    
    function displayReprovacoesCount(count) {
        const reprovacoesCountSpan = document.getElementById('disciplinasReprovadasCount');
    
        console.log("Count recebido da API para reprovações:", count);
    
        if (reprovacoesCountSpan) {
            console.log("Elemento disciplinasReprovadasCount encontrado:", reprovacoesCountSpan);
            reprovacoesCountSpan.textContent = `${count}`;
        } else {
            console.error("Elemento disciplinasReprovadasCount não encontrado.");
        }
    }
    
    function displayReprovacoesCountError() {
        const reprovacoesCountSpan = document.getElementById('disciplinasReprovadasCount');
    
        if (reprovacoesCountSpan) {
            reprovacoesCountSpan.textContent = "Erro na requisição";
        } else {
            console.error("Elemento disciplinasReprovadasCount não encontrado.");
        }
    }

    getAndDisplayAlunoDetails();
});
