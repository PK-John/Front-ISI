document.addEventListener("DOMContentLoaded", function () {
    const disciplinaDetailsContainer = document.getElementById('disciplinaDetails');

    function getDisciplinaIdFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
    }

    function displayDisciplinaDetails(disciplinaData) {
        const h2Element = document.createElement('h2');
        h2Element.textContent = `${disciplinaData.nome}`;

        const ulElement = document.createElement('ul');

        for (const prop in disciplinaData) {
            if (Object.prototype.hasOwnProperty.call(disciplinaData, prop) && prop !== 'nome') {
                const liElement = document.createElement('li');
                liElement.textContent = `${prop}: ${disciplinaData[prop]}`;
                ulElement.appendChild(liElement);
            }
        }

        disciplinaDetailsContainer.appendChild(h2Element);
        disciplinaDetailsContainer.appendChild(ulElement);
    }

    function getAndDisplayDisciplinaDetails() {
        const disciplinaId = getDisciplinaIdFromURL();
    
        if (disciplinaId) {
            const apiUrl = `http://localhost:5000/disciplinas/${disciplinaId}`;
    
            axios
                .get(apiUrl)
                .then(response => {
                    const disciplinaData = response.data;
                    displayDisciplinaDetails(disciplinaData);
                    fetchMatriculadosCount(disciplinaId);
                    fetchMediaCount(disciplinaId);
                    fetchReprovacoesDisciplina(disciplinaId);
                })
                .catch(error => {
                    console.error(error);
                    console.error("Erro na requisição");
                });
        } else {
            console.error("ID da disciplina não encontrado na URL.");
        }
    }
    function fetchMatriculadosCount(disciplinaId) {
        const apiUrl = `http://localhost:5000/disciplinas/reprovacoes_por_aluno/${disciplinaId}`;
    
        axios
            .get(apiUrl)
            .then(response => {
                const reprovacoesData = response.data;
    
                // Verifique se a propriedade 'alunos_matriculados' existe e é um array
                if (reprovacoesData && Array.isArray(reprovacoesData.alunos_matriculados)) {
                    // Acesse a propriedade 'numero_de_alunos' no primeiro item do array
                    const numReprovacoes = reprovacoesData.alunos_matriculados[0]?.numero_de_alunos || 0;
                    displayMatriculadosCount(numReprovacoes);
                } else {
                    console.error("A resposta da requisição não contém a propriedade 'alunos_matriculados' ou não é um array válido.", reprovacoesData);
                }
            })
            .catch(error => {
                console.error(error);
                console.error("Erro na requisição de reprovações");
            });
    }

    function displayMatriculadosCount(count) {
        const disciplinasReprovacoesCountSpan = document.getElementById('disciplinasCount');

        if (disciplinasReprovacoesCountSpan) {
            disciplinasReprovacoesCountSpan.textContent = `${count}`;
        } else {
            console.error("Elemento disciplinasReprovacoesCountSpan não encontrado.");
        }
    }

    function fetchMediaCount(disciplinaId) {
        const apiUrl = `http://localhost:5000/disciplinas/media_para_cada_disciplina/${disciplinaId}`;
    
        axios
            .get(apiUrl)
            .then(response => {
                const mediaData = response.data;
    
                // Verifique se a propriedade 'media_para_cada_disciplina' existe na resposta
                if (mediaData && mediaData.media_para_cada_disciplina) {
                    const primeiraDisciplina = mediaData.media_para_cada_disciplina[0];
    
                    if (primeiraDisciplina && primeiraDisciplina.media) {
                        // Acesse a propriedade 'media'
                        const mediaDosAlunos = parseFloat(primeiraDisciplina.media);
    
                        if (!isNaN(mediaDosAlunos)) {
                            displayMediaCount(mediaDosAlunos);
                        } else {
                            console.error("O valor da média não é um número válido.", primeiraDisciplina.media);
                        }
                    } else {
                        console.error("A resposta da requisição não contém a propriedade 'media'.", primeiraDisciplina);
                    }
                } else {
                    console.error("A resposta da requisição não contém a propriedade 'media_para_cada_disciplina'.", mediaData);
                }
            })
            .catch(error => {
                console.error(error);
                console.error("Erro na requisição de média");
            });
    }
    

    function displayMediaCount(count) {
        const mediaCountSpan = document.getElementById('mediaCount');

        if (mediaCountSpan) {
            mediaCountSpan.textContent = `${count}`;
        } else {
            console.error("Elemento mediaCountSpan não encontrado.");
        }
    }

    function fetchReprovacoesDisciplina(disciplinaId) {
        const apiUrl = `http://localhost:5000/historico/reprovacoes/disciplina/${disciplinaId}`;
    
        axios
            .get(apiUrl)
            .then(response => {
                const reprovacoesData = response.data;
    
                // Verifique se a propriedade 'num_reprovacoes' existe na resposta
                if (reprovacoesData && reprovacoesData.num_reprovacoes !== undefined) {
                    const numReprovacoes = reprovacoesData.num_reprovacoes;
                    displayReprovacoesCount(numReprovacoes);
                } else {
                    console.error("A resposta da requisição não contém a propriedade 'num_reprovacoes'.", reprovacoesData);
                    displayReprovacoesCount(0); // Define como 0 ou outra ação adequada quando 'num_reprovacoes' não está presente
                }
            })
            .catch(error => {
                console.error(error);
                console.error("Erro na requisição de reprovações da disciplina");
                displayReprovacoesCount(0); // Define como 0 ou outra ação adequada em caso de erro
            });
    }

    function displayReprovacoesCount(count) {
        const reprovacoesCountSpan = document.getElementById('reprovacoesCount');

        if (reprovacoesCountSpan) {
            reprovacoesCountSpan.textContent = `${count}`;
        } else {
            console.error("Elemento reprovacoesCountSpan não encontrado.");
        }
    }

    getAndDisplayDisciplinaDetails();
});
