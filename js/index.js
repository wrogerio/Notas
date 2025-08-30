const opcoesArrayOriginal = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5", "D5", "E5", "F5", "G5", "A5"];
let opcoesArray = [];
let indiceAtual = 0;
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

// Função para embaralhar o array
function embaralharArray(array) {
    return array
        .map(item => ({ valor: item, aleatorio: Math.random() }))
        .sort((a, b) => a.aleatorio - b.aleatorio)
        .map(item => item.valor);
}

// Função para mostrar a próxima nota
function mostrarNota() {
    if (indiceAtual >= opcoesArray.length) {
        finalizarJogo();
        return;
    }

    // Define nota atual
    notaAtual = opcoesArray[indiceAtual];

    // Atualiza imagem
    notaImg.src = `img/${notaAtual}.png`;
    notaImg.classList.remove("d-none");

    // Limpa e foca no input
    inputResposta.value = "";
    inputResposta.focus();
}

// Função para verificar resposta
function verificarResposta() {
    const resposta = inputResposta.value.toUpperCase().trim();
    if (!resposta) return;

    if (resposta === notaAtual[0]) {
        acertos++;
        acertosSpan.textContent = acertos;
    } else {
        erros++;
        errosSpan.textContent = erros;
    }

    // Vai para a próxima nota
    indiceAtual++;
    mostrarNota();
}

// Finaliza o jogo
function finalizarJogo() {
    notaImg.classList.add("d-none");
    respostaContainer.classList.add("d-none");
    resultadoFinal.classList.remove("d-none");

    finalAcertos.textContent = acertos;
    finalErros.textContent = erros;
}

// Reinicia o jogo
function reiniciarJogo() {
    acertos = 0;
    erros = 0;
    indiceAtual = 0;

    opcoesArray = embaralharArray([...opcoesArrayOriginal]);

    acertosSpan.textContent = acertos;
    errosSpan.textContent = erros;
    resultadoFinal.classList.add("d-none");
    respostaContainer.classList.remove("d-none");
    mostrarNota();
}

// Eventos
btnIniciar.addEventListener("click", () => {
    btnIniciar.classList.add("d-none");
    respostaContainer.classList.remove("d-none");

    // Embaralha as opções no início do jogo
    opcoesArray = embaralharArray([...opcoesArrayOriginal]);

    mostrarNota();
});

btnResponder.addEventListener("click", verificarResposta);
btnReiniciar.addEventListener("click", reiniciarJogo);

// Permite responder com Enter
inputResposta.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        verificarResposta();
    }
});
