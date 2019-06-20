var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();

recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = 'pt-BR';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var g_Controller = false;
var removeListenerBorb = false;
var contador_erro = 0;
var tentativa = 0;
var saida = document.querySelector('.output');

document.body.addEventListener('click',() =>{ recognition.start();} );
recognition.addEventListener('speechend', () =>{ recognition.stop();} );
recognition.addEventListener('error', (event) =>{ saida.textContent = 'Erro no reconhecimento do texto: '+ event.error;});

recognition.onresult = function(event) 
{
    var last = event.results.length -1;
    var texto = event.results[last][0].transcript;
    saida.textContent = 'Resultado recebido: '+ texto + '.';
    disparaEvento(texto);
}

/*window.onload = function(){
  trocaClassesAntiHorario(0);
}*/

//1-IMPLEMENTAR..... FUNCAO QUE IRA DISPARAR A ACAO CORRESPONDENTE A PALAVRA
function disparaEvento(palavra)
{
  tentativa++;
  if (palavra == "escopo"){  
    console.log('Recebeu escopo');
    contador_erro = 0;
    console.log(g_Controller);
    g_Controller = !g_Controller;
    console.log(g_Controller);
  }
  else if (palavra == "promessa"){
    console.log('Recebeu promessa');
    console.log('g_Controller: ' +g_Controller);
    contador_erro = 0;

    //2-IMPLEMENTAR FUNCAO DA PROMESSA
    let p = new Promise( (resolve, reject) => {
        setTimeout(() => {
        if(g_Controller){
            resolve('A promessa foi resolvida');
        }   
        if(!g_Controller)  
            reject('A promessa foi rejeitada')
        }, 1000);
    });

    p.then(() => {
      if(tentativa % 2 == 0)
        trocaClassesHorario(0);
      else
        trocaClassesAntiHorario(0);

    }).catch((mensagem) =>{
        alert(mensagem);
    });
  }
  else if (palavra == "borbulhamento"){
    console.log('Recebeu borbulhamento');
    contador_erro = 0;
    trataBorbulhamento();

  }
  else {
    contador_erro++;    
    console.log('Recebeu outra palavra');
    console.log('Contador Erro= ' + contador_erro);;
    
    if(contador_erro>=4) {    
        document.body.removeEventListener('click', () =>{ recognition.start();})
    }
  }

}

//4 -INCLUIR OS EVENTOS DE CLICK NOS ELEMENTOS <TD> E <TR> DA PAGINA
function trataBorbulhamento(){

  let el = document.querySelector('.pro');

  if (removeListenerBorb) {
    el.removeEventListener('click', (event) =>{ 
      event.stopPropagation();
      alert(event.target);
      //document.body.removeEventListener('click', () =>{ recognition.start();});
  });
 }
  else
  {  
    el.addEventListener('click',(event) =>{ 
        event.stopPropagation();
        alert(event.target);
    });
  }  

  //document.body.removeEventListener('click', () =>{ recognition.start();});

  removeListenerBorb = true;

}

//5 -METODO PARA ALTERAR O BACKGROUND DAS CELULAS  
classes = ['es', 'pr', 'cl', 'pro', 'ca', 'bo'];

elementos = [document.getElementsByClassName("es")[0], 
document.getElementsByClassName("pr")[0], 
document.getElementsByClassName("cl")[0],
document.getElementsByClassName("pro")[0], 
document.getElementsByClassName("ca")[0],
document.getElementsByClassName("bo")[0] 
];

function trocaClassesAntiHorario(vez){
  i = 0;
  for(elemento of elementos){
    elemento.className = classes[vez+i];

    if(vez+i<5){  
      console.log("vez=" + (vez));
      console.log("valor de vez+i=" + (vez+i));
      i++;
    }else{
      if(vez == 6){
        elemento.className = classes[i];
        i++;
      }
      else{  
        //elemento.className = classes[vez];

        console.log("chegou no 5");
        //console.log("vez=" + (vez));
        console.log("valor de vez+i=" + (vez+i));
        i = 0 - vez;
      }
    }
  }
  if (vez < 6) {
    vez++;
    setTimeout(() => {trocaClassesAntiHorario(vez)}, 1000);
  }

}

function trocaClassesHorario(vez){
  i = 0;
  for(elemento of elementos){
    elemento.className = classes[5- (vez+i)];
    console.log("valor de vez = "+ vez);
    console.log("valor de i = " + i);
    console.log("valor de 5-(vez+i) =" + (5- (vez+i)));
    if(vez+i > 0){
      i--;
    }else{
      console.log("chegou no 0");
      i = 5 - vez;
    }
  }
  if (vez < 5) {
    vez++;
    setTimeout(() => {trocaClassesHorario(vez)}, 1000);
  }else{
    vez = 0;
  }
}

