const opcoesArrayOriginal = ["C5", "D5", "E5", "F5", "G5", "A5", "B5", "C6", "D6", "E6", "F6", "G6", "A6"];
let opcoesArray = [...opcoesArrayOriginal];
let notaAtual = "";
let acertos = 0;
let erros = 0;

// Elementos do DOM
const btnIniciar = document.getElementById("btnIniciar");
const btnResponder = document.getElementById("btnResponder");
const btnReiniciar = document.getElementById("btnReiniciar");
const inputResposta = document.getElementById("inputResposta");
const notaImg = document.getElementById("notaImg");
const respostaContainer = document.getElementById("respostaContainer");
const acertosSpan = document.getElementById("acertos");
const errosSpan = document.getElementById("erros");
const resultadoFinal = document.getElementById("resultadoFinal");
const finalAcertos = document.getElementById("finalAcertos");
const finalErros = document.getElementById("finalErros");

// Função para sortear nota
function sortearNota() {
    if (opcoesArray.length === 0) {
        finalizarJogo();
        return;
    }

    // Sorteio aleatório
    const indice = Math.floor(Math.random() * opcoesArray.length);
    notaAtual = opcoesArray[indice];
    opcoesArray.splice(indice, 1);

    // Mostra imagem correspondente
    notaImg.src = `img/notas/${notaAtual}.png`;
    notaImg.classList.remove("d-none");

    // Limpa campo de resposta
    inputResposta.value = "";
    inputResposta.focus();
}

// Função para verificar resposta
function verificarResposta() {
    const resposta = inputResposta.value.toUpperCase().trim();

    if (resposta === "") return;

    if (resposta === notaAtual[0]) {
        acertos++;
        acertosSpan.textContent = acertos;
    } else {
        erros++;
        errosSpan.textContent = erros;
    }

    sortearNota();
}

// Finaliza o jogo
function finalizarJogo() {
    notaImg.classList.add("d-none");
    respostaContainer.classList.add("d-none");
    resultadoFinal.classList.remove("d-none");

    finalAcertos.textContent = acertos;
    finalErros.textContent = erros;
}

// Reiniciar o jogo
function reiniciarJogo() {
    acertos = 0;
    erros = 0;
    opcoesArray = [...opcoesArrayOriginal];
    acertosSpan.textContent = acertos;
    errosSpan.textContent = erros;
    resultadoFinal.classList.add("d-none");
    respostaContainer.classList.remove("d-none");
    sortearNota();
}

// Eventos
btnIniciar.addEventListener("click", () => {
    btnIniciar.classList.add("d-none");
    respostaContainer.classList.remove("d-none");
    sortearNota();
});

btnResponder.addEventListener("click", verificarResposta);
btnReiniciar.addEventListener("click", reiniciarJogo);

// Permite pressionar Enter para responder
inputResposta.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        verificarResposta();
    }
});
