// ====================================================================
// PARTE 1: ESTRUTURA DE DADOS E SELEÇÃO DE ELEMENTOS
// ====================================================================


//criei o catalogo de produtos
let produtos = [
  { id: 1, nome: 'camiseta', preco: 50 },
  { id: 2, nome: 'calça', preco: 99 },
  { id: 3, nome: 'oculos', preco: 149 },
  { id: 4, nome: 'sapato', preco: 299 }
]

//o array do carrinho, vazio porque vai ser o 'banco de dados do app'
//usamos 'let' para que o array possa ser reatribuido na remoçao e carregamento
let carrinho = []

//seleçao de elementos DOM
const carrinhoLista = document.getElementById('carrinho-lista')
const carrinhoTotal = document.getElementById('carrinho-total')
const botaoAdd = document.querySelectorAll('.adicionar-btn')


// ====================================================================
// PARTE 2: FUNÇÕES DE PERSISTÊNCIA DE DADOS (localStorage)
// ====================================================================

//funçao para salvar o carrinho no localStorage
function salvarCarrinho(){
  //converte o array 'carrinho para string JSON e salva
  localStorage.setItem('carrinhoDeCompra', JSON.stringify(carrinho))
}

//funçao para carregar o carrinho no localStorage
function carregarCarrinho(){
  //pega a string do localStorage
  const carrinhoSalvo = localStorage.getItem('carrinhoDeCompra')

  //se houver dados salvos, converte de bolta para o array
  if(carrinhoSalvo){
    carrinho = JSON.parse(carrinhoSalvo)
  }

  //renderiza a tela com os dados
  renderizarCarrinho()
}

// ====================================================================
// PARTE 3: FUNÇÕES DE LÓGICA E RENDERIZAÇÃO
// ====================================================================

//funçao para renderizar os itens do carrinho na tela
function renderizarCarrinho(){

  //limpa a lista antes de renderizar para evitar duplicatas
  carrinhoLista.innerHTML = ''
  let totalGeral = 0

  //percorre o array carrinho
  carrinho.forEach(item => {
    //cria um 'li' para cada item do array carrinho
    const novoItem = document.createElement('li')
    //cria os botoes para cada item
    const botaoRemover = document.createElement('button')
    botaoRemover.textContent = '-'
    const botaoAdicionar = document.createElement('button')
    botaoAdicionar.textContent = '+'
    const botaoRemoverTudo = document.createElement('button')
    botaoRemoverTudo.textContent = 'Remover tudo'
    

    //pega a funçao de remover apenas 1 na quantidade do produto
    botaoRemover.addEventListener('click', () => {
      removerProduto(item.id)
    })

    //pega a funçao de remover o produto inteiro
    botaoRemoverTudo.addEventListener('click', () =>{
      removerTudo(item.id)
    })

    //pega a funçao que faz adicionar mais 1 na quantidade do produto
    botaoAdicionar.addEventListener('click', () =>{
      adicionarproduto(item.id)
    })


    const subTotal = item.preco * item.quantidade
    novoItem.textContent = `nome: ${item.nome}, Quantidade: ${item.quantidade} R$: ${subTotal.toFixed(2)}`

    
    novoItem.appendChild(botaoRemover)
    novoItem.appendChild(botaoRemoverTudo)
    novoItem.appendChild(botaoAdicionar)
    carrinhoLista.appendChild(novoItem)

    totalGeral += subTotal
  })

  // Atualiza o total na tela
  if(carrinhoTotal){
    carrinhoTotal.textContent = `total: R$ ${totalGeral.toFixed(2)}`
  }
}

// ====================================================================
// funçoes para remover tudo, adicionar mais 1 ou diminuir menos 1
// ====================================================================

//funçao de remover tudo de um item do carrinho
function removerTudo(idDoProduto){
  carrinho = carrinho.filter(item => item.id !== idDoProduto)

  salvarCarrinho()
  renderizarCarrinho()
}

//funçao de remover apenas 1 do item do carrinho 
function removerProduto(idDoProduto){
  //encontra o item no carrinho para verigicar a quantidade
  const itemParaRemover = carrinho.find(item => item.id === idDoProduto)

  if(itemParaRemover){
    //se a quantidade é maior que 1, apenas diminui
    if(itemParaRemover.quantidade > 1){
      itemParaRemover.quantidade -= 1
    }else{
      //se a quantidade é 1, remove o item do array usando o .filter()
      carrinho = carrinho.filter(item => item.id !== idDoProduto)
    }
  }

  salvarCarrinho()
  renderizarCarrinho()
}

//funçao de adicionar mais 1 do item no carrinho
function adicionarproduto(idDoProduto){
  const itemParaAdicionar = carrinho.find(item => item.id === idDoProduto)

  if(itemParaAdicionar){
    if(itemParaAdicionar.quantidade >= 1){
      itemParaAdicionar.quantidade += 1
    }else{
      return
    }
  }

  salvarCarrinho()
  renderizarCarrinho()
}
// ====================================================================

// Função principal para adicionar ou incrementar um produto
function adicionarAoCarrinho(idDoProduto){
  //encontra o produto no catalogo original
  const produtoCatalogo = produtos.find(produto => produto.id === idDoProduto)
  if(!produtoCatalogo) return //se o produto nao existir a funçao para

// Encontra o item no carrinho para saber se ele já está lá
  const intemNoCarrinho = carrinho.find(item => item.id === idDoProduto)
  //usa o 'if/else' para decidir se incrementa ou adiciona um novo item
  if(intemNoCarrinho){
    //se o item ja esta no carrinho, aumenta a quantidade
    intemNoCarrinho.quantidade += 1
  }else{
    //se nao esta, cria um novo objeto com a quantidade e o adiciona
    const novoItem = {...produtoCatalogo, quantidade: 1}
    carrinho.push(novoItem)
  }

  //salva o carrinho e atualiza a tela para exibir as mudanças
  salvarCarrinho()
  renderizarCarrinho()
}

// ====================================================================
// PARTE 4: INICIALIZAÇÃO DO PROGRAMA
// ====================================================================

// Chama a função para carregar o carrinho quando a página é aberta
carregarCarrinho();

//adiciona o evento listener a cada botao de adicionar do catalogo
document.addEventListener('DOMContentLoaded', () => {
  botaoAdd.forEach(botao => {
    botao.addEventListener('click', (event) =>{
      //pega o ID do produto clicado (do atributo data-id do html)
      const idDoProduto = parseInt(event.target.dataset.id)
      //chama a funçao principal que adiciona a logica
      adicionarAoCarrinho(idDoProduto)
    })
  })
})



