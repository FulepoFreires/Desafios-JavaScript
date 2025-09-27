//peguei os elementos do html
const formulario = document.getElementById('form-topico')
const elementoTitulo = document.getElementById('titulo')
const elementoDificuldade = document.getElementById('dificuldade')
const botaoSubmit = document.getElementById('adicionar-btn')

//comecei com uma array vazia
let topicos = []

//crie uma funçao de adicionar as informaçoes no array
function adicionarTopico(e){
  //previne que a pagina recarregue
  e.preventDefault()


//aqui peguei os valores que vao ser passado pelo usuario
const titulo = elementoTitulo.value
const dificuldade = elementoDificuldade.value

  //se os favalores dos usuarios estiverem vazio, nao retorna nada
  if(titulo.trim() === '' || dificuldade.trim() === ''){
    return
  } 

  //criei o modelo do topico que vai ser cada item do array
  const topico = {
    titulo: titulo,
    dificuldade: dificuldade,
    concluido: false
  };

  //inseri o objeto dentro do array
  topicos.push(topico)

  //rederizar as informaçoes
  renderizarTopicos()

  //limpa os campos depois de usado
  elementoDificuldade.value = ''
  elementoTitulo.value = ''
  
  elementoTitulo.focus()

  console.log(topicos)
  //chamei a funçao para salvar salvar no localstorage
  salvarTopicos()
}


const listaDeTopicos = document.getElementById('lista-de-topicos')

function renderizarTopicos(){
  //limpa a lista antes de renderizar os topicos
  listaDeTopicos.innerHTML = ''

  topicos.forEach(topico => {
    criarElementoNota(topico)
  })
}

formulario.addEventListener('submit', adicionarTopico)

//funçao para salvar o dados
function salvarTopicos(){
  //converte o array tipicos em uma string JSON e salva no localStorage
  //a chave é 'topicosSalvos' e o valor é a string do array

  localStorage.setItem('topicosSalvos', JSON.stringify(topicos))
}


function carregarTopicos(){
  //Pega a string de dados do localStorage com a chave 'topicosSalvos'
  const topicosSalvos = localStorage.getItem('topicosSalvos')
  //verifica se existe algo salvo
  if(topicosSalvos){
    //converte a string JSON de  volta para um array objeto
    topicos = JSON.parse(topicosSalvos)

    //chamar a funçao para renderizar os topicos na tela
    renderizarTopicos()
  }
}

carregarTopicos()

function criarElementoNota(nota){

  //criei elementos 
  //criei uma check box
    const notaPrincipal = document.createElement('div')
  notaPrincipal.className = 'container-tarefas'

    if(nota.concluido){
    notaPrincipal.classList.add('concluido')
  }

  const checkbox = document.createElement('input')  
  checkbox.type = 'checkbox'
  checkbox.checked = nota.concluido //define o estado inicial

  



  //preenche os elementos com os dados do objeto 'nota'
  const subTitulo = document.createElement('h3')
  subTitulo.textContent = nota.titulo
  const descricao = document.createElement('p')
  descricao.textContent = `Dificuldade: ${nota.dificuldade}`

  const botaoRemover = document.createElement('button')
  //classes para estilizar depois
  botaoRemover.className = 'remover-btn'
  botaoRemover.textContent = 'Remover'

  //funçao para fazer o botao remover
  botaoRemover.addEventListener('click', () =>{
    //O botão agora chama a função 'removerNota', passando o ID da nota como argumento.
    removerNota(nota.id)
  })

  checkbox.addEventListener('change', () =>{
    //altera o estado concluido do objeto nota
    nota.concluido = checkbox.checked
    //adiciona a classe se ela nao existir e remove se ela existir
    notaPrincipal.classList.toggle('concluido')
    salvarTopicos()
  })

  //coloquei todos esse elementos dentro do de uma div
  
  notaPrincipal.appendChild(subTitulo)
  notaPrincipal.appendChild(descricao)
  notaPrincipal.appendChild(checkbox)
  notaPrincipal.appendChild(botaoRemover)
  //e aqui coloquei a div notaprincipal no container lista de topicos
  listaDeTopicos.appendChild(notaPrincipal)

}

function removerNota(id){
  // Passo 1: Cria um NOVO array de tópicos, excluindo a nota com o ID que foi passado.
  // O método .filter() é perfeito para isso, pois ele retorna um novo array sem precisar modificar o original.
  topicos = topicos.filter(nota => nota.id !== id)

//salva a nova lista de topicos no local storage, para que nao recarregue a pagina novamente
salvarTopicos()

//atualiza a tela para que a nota desapareça visualmente
renderizarTopicos()
}

