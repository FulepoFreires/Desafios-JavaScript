let carrinho = []

let produtos = [
  { id: 1, nome: 'camiseta', preco: 50 },
  { id: 2, nome: 'calça', preco: 99 },
  { id: 3, nome: 'oculos', preco: 149 },
  { id: 4, nome: 'sapato', preco: 299 }
]


function salvarCarrinho(){
  localStorage.setItem('carrinhoDeCompra', JSON.stringify(carrinho))
}

function renderizarCarrinho(){
  const carrinhoLista = document.getElementById('carrinho-lista')
  const carrinhoTotal = document.getElementById('carrinho-total')

  carrinhoLista.innerHTML = ''
  let totalGeral = 0

  //percorre o array carrinho
  carrinho.forEach(item => {
    //cria um 'li' para cada item do array carrinho
    const novoItem = document.createElement('li')
    const botaoRemover = document.createElement('button')
    botaoRemover.textContent = 'Remover do carrinho'

    botaoRemover.addEventListener('click', () => {
      removerProduto(item.id)
    })
    const subTotal = item.preco * item.quantidade
    novoItem.textContent = `nome: ${item.nome}, Quantidade: ${item.quantidade} R$: ${subTotal.toFixed(2)}`

    
    novoItem.appendChild(botaoRemover)
    carrinhoLista.appendChild(novoItem)

    totalGeral += subTotal
  })

  if(carrinhoTotal){
    carrinhoTotal.textContent = `total: R$ ${totalGeral.toFixed(2)}`
  }
}

function removerProduto(idDoProduto){
  const itemParaRemover = carrinho.find(item => item.id === idDoProduto)

  if(itemParaRemover){
    if(itemParaRemover.quantidade > 1){
      itemParaRemover.quantidade -= 1
    }else{
      carrinho = carrinho.filter(item => item.id !== idDoProduto)
    }
  }

  salvarCarrinho()
  renderizarCarrinho()
}

function adicionarAoCarrinho(idDoProduto){
  const produtoCatalogo = produtos.find(produto => produto.id === idDoProduto)

  if(!produtoCatalogo) return

  const intemNoCarrinho = carrinho.find(item => item.id === idDoProduto)
  if(intemNoCarrinho){
    intemNoCarrinho.quantidade += 1
  }else{
    const novoItem = {...produtoCatalogo, quantidade: 1}
    carrinho.push(novoItem)
  }

  salvarCarrinho()
  renderizarCarrinho()
}


document.addEventListener('DOMContentLoaded', () => {
  carregarCarrinho()

  const botaoAdd = document.querySelectorAll('.adicionar-btn')

  botaoAdd.forEach(botao => {
    botao.addEventListener('click', (event) =>{
      const idDoProduto = parseInt(event.target.dataset.id)
      adicionarAoCarrinho(idDoProduto)
    })
  })
})


function carregarCarrinho(){
  const carrinhoSalvo = localStorage.getItem('carrinhoDeCompra')

  if(carrinhoSalvo){
    carrinho = JSON.parse(carrinhoSalvo)
  }

  renderizarCarrinho()
}

