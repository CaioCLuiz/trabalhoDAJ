var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();

recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = 'pt-BR';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

let g_Controller = false;
let saida = document.querySelector('.output');

document.body.addEventListener('click', () => {
    recognition.start();
});
recognition.addEventListener('speechend', () => {
    recognition.stop();
});
recognition.addEventListener('error', (event) => {
    saida.textContent = 'Erro no reconhecimento do texto: ' + event.error;
});

recognition.onresult = function (event) {
    let last = event.results.length - 1;
    let texto = event.results[last][0].transcript;
    saida.textContent = 'Resultado recebido: ' + texto + '.';
    disparaEvento(texto);
};

// Auxiliar
// Promessa para trocar o valor de g_Controller
let verificaVariavelGlobal = new Promise((resolve, reject) => {
    setTimeout(() => {
        if (g_Controller)
            resolve('A promessa foi resolvida');
        else
            reject('A promessa foi rejeitada.');
    }, 10000);
});

// Array de cores usadas
let cores = ['#999', '#03f', '#ff6', '#f00', '#fff', '#ff0'];

// Seleciona as classes das td da table #daj
let elementos = [
    document.getElementsByClassName("es")[0],
    document.getElementsByClassName("pr")[0],
    document.getElementsByClassName("cl")[0],
    document.getElementsByClassName("pro")[0],
    document.getElementsByClassName("ca")[0],
    document.getElementsByClassName("bo")[0]
];

// Função de troca de cores no sentido anti-horário
function trocaCoresAntiHorario() {
    let i = 0;

    for (elemento of elementos) {
        console.log('Antes a cor era ' + elemento.style.backgroundColor);

        if (i === 0) {
            elemento.style.backgroundColor = cores[1];
            i++;
        } else if (i === 5) {
            elemento.style.backgroundColor = cores[0];
        } else {
            elemento.style.backgroundColor = cores[i + 1];
            i++;
        }

        console.log('Agora a cor é ' + elemento.style.backgroundColor);
    }
}

// Função de troca de cores no sentido horário
function trocaCoresHorario() {
    let i = 5;

    for (elemento of elementos) {
        console.log('Antes a cor era ' + elemento.style.backgroundColor);

        if (i === 5) {
            elemento.style.backgroundColor = cores[5];
            i--;
        } else {
            elemento.style.backgroundColor = cores[(5 - i) - 1];
            i--;
        }

        console.log('Agora a cor é ' + elemento.style.backgroundColor);
    }
}

//1-IMPLEMENTAR..... FUNCAO QUE IRA DISPARAR A ACAO CORRESPONDENTE A PALAVRA
function disparaEvento(palavra) {
    if (palavra === "escopo") {
        console.log('Recebeu escopo');
        g_Controller = !g_Controller;
        console.log("Variável g_Controller é " + g_Controller);
    }
    else if (palavra === "promessa") {
        console.log('Recebeu promessa');

        verificaVariavelGlobal
            .then((mensagem) => {
                alert(mensagem);
                trocaCoresHorario();
            })
            .catch((mensagem) => {
                alert(mensagem);
                trocaCoresAntiHorario();
            });
    }
    else if (palavra === "borbulhamento") {
        console.log('Recebeu borbulhamento');
        for (elemento of elementos) {
            console.log(elemento);
            if (elemento.style.backgroundColor === cores[3]) {
                console.log(elemento);
            }
        }

        // document.body.addEventListener('click', () => {
        //     recognition.start();
        // });
        // document.getElementById("myDIV").removeEventListener("mousemove", myFunction);
    }
    else
        console.log('Recebeu outra palavra');
}

recognition.onspeechend = function () {
    recognition.stop();
};

//2-IMPLEMENTAR FUNCAO DA PROMESSA

//4 -INCLUIR OS EVENTOS DE CLICK NOS ELEMENTOS <TD> E <TR> DA PAGINA

//5 -METODO PARA ALTERAR O BACKGROUND DAS CELULAS