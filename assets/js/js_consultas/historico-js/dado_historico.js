document.addEventListener("DOMContentLoaded", function () {
    const alunoDetailsContainer = document.getElementById('historicoDetails');

    function getAlunoIdFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
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

    function getAndDisplayAlunoDetails() {
        const alunoId = getAlunoIdFromURL();

        if (alunoId) {
            const apiUrl = `http://localhost:5000/alunos/${alunoId}`;

            axios
                .get(apiUrl)
                .then(response => {
                    const alunoData = response.data;
                    displayAlunoDetails(alunoData);
                    updateQuantidadeAlunos();
                    updateMediaGeral();
                    updateReprovacoesTotal()
                })
                .catch(error => {
                    console.error(error);
                    console.error("Erro na requisição");
                });
        } else {
            console.error("ID do aluno não encontrado na URL.");
        }
    }

    function updateQuantidadeAlunos() {
        const apiUrl = "http://localhost:5000/alunos";
        axios
            .get(apiUrl)
            .then(response => {
                const quantidadeAlunos = response.data.length;
                const quantidadeAlunosContainer = document.querySelector('.valores-text-1');
                const spanElement = quantidadeAlunosContainer.querySelector('span');
                spanElement.textContent = quantidadeAlunos;
            })
            .catch(error => {
                console.error(error);
                console.error("Erro ao obter a quantidade de alunos");
            });
    }

    function updateMediaGeral() {
        const apiUrl = "http://localhost:5000/historico/media_geral";
        axios
            .get(apiUrl)
            .then(response => {
                const mediaGeralData = response.data.media_geral_disciplinas;
                
                if (mediaGeralData && mediaGeralData.length > 0) {
                    const mediaGeral = parseFloat(mediaGeralData[0].media_geral);
    
                    if (!isNaN(mediaGeral)) {
                        const valoresText2Container = document.querySelector('.valores-text-2');
                        const spanElement = valoresText2Container.querySelector('span');
                        spanElement.textContent = mediaGeral.toFixed(2);
                    } else {
                        console.error("Valor inválido para a média geral");
                    }
                } else {
                    console.error("Dados da média geral não encontrados");
                }
            })
            .catch(error => {
                console.error(error);
                console.error("Erro ao obter a média geral");
            });
    }

    function updateReprovacoesTotal() {
        const apiUrl = "http://localhost:5000/historico/reprovacoes_total";
        axios
            .get(apiUrl)
            .then(response => {
                const reprovacoesData = response.data.reprovacoes_total;
    
                console.log("Dados completos da API para o número total de reprovações:", reprovacoesData);
    
                if (Array.isArray(reprovacoesData) && reprovacoesData.length > 0) {
                    const firstElement = reprovacoesData[0];
    
                    if (firstElement.hasOwnProperty('total_reprovacoes')) {
                        const totalReprovacoes = parseInt(firstElement.total_reprovacoes);
    
                        if (!isNaN(totalReprovacoes)) {
                            const valoresText3Container = document.querySelector('.valores-text-3');
                            const spanElement = valoresText3Container.querySelector('span');
                            spanElement.textContent = totalReprovacoes;
                        } else {
                            console.error("Valor inválido para o número total de reprovações");
                        }
                    } else {
                        console.error("Propriedade 'total_reprovacoes' não encontrada no primeiro elemento do array");
                    }
                } else {
                    console.error("Dados da API para o número total de reprovações são inválidos ou vazios");
                }
            })
            .catch(error => {
                console.error(error);
                console.error("Erro ao obter o número total de reprovações");
            });
    }

    getAndDisplayAlunoDetails();
});
