document.addEventListener("DOMContentLoaded", async function () {

    const fetchData = async (url) => {
      try {
        const response = await axios.get(url);
        return response.data;
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };
  
    const updateDado1 = async () => {
        try {
          const disciplinasUrl = "http://localhost:5000/disciplinas";
          const disciplinasData = await fetchData(disciplinasUrl);
      
          const quantidadeDisciplinas = disciplinasData.length;
      
          const dado2Div = document.querySelector(".dado-1");
          dado2Div.innerHTML = `
            <i class='bx bxs-book-alt icon-dado1'></i>
            <p class="info-text">Total de Disciplinas:</p>
            <p class="quantidade-alunos">${quantidadeDisciplinas}</p>
          `;
        } catch (error) {
          console.error("Erro ao atualizar dado-1:", error);
        }
      };
    
    const updateDado2 = async () => {
        try {
          const alunosUrl = "http://localhost:5000/alunos";
          const alunosData = await fetchData(alunosUrl);
      
          const quantidadeAlunos = alunosData.length;
      
          const dado2Div = document.querySelector(".dado-2");
          dado2Div.innerHTML = `
            <i class='bx bxs-face icon-dado2'></i>
            <p class="info-text">Total de Alunos:</p>
            <p class="quantidade-alunos">${quantidadeAlunos}</p>
          `;
        } catch (error) {
          console.error("Erro ao atualizar dado-2:", error);
        }
      };
  
    updateDado1();
    updateDado2();
  });
  