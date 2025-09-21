//explicando o codigo com minhas palavras para eu mesmo entender

//peguei o ID do input e da lista que estao no HTML e 'transformei' em variaveis
const filtroItens = document.getElementById('filtro-input')
const listaDeItens = document.getElementById('lista-itens')


//criei uma funçao para fazer o filtro dos itens
function filtrarItens(){
  /*essa variavel pega a variavei que criei a cima que pega o ID do input, ela pega o valor]
  digitado dentro do input (toLowerCase transforma tudo que é digitado em minusculo)
  */
  const itemFiltrado = filtroItens.value.toLowerCase()

  //essa variavel pega os itens da lista (li) que esta no HTML
  const itensLista = document.querySelectorAll('#lista-itens li')


  //aq eu percorri a lista (q criei no html) 
  itensLista.forEach(item => {

    //essa variavel pega cada item (item unico e apenas o texto) da lista, em seguida transforma o texto em minusculo
    const textoItem = item.textContent.toLowerCase()

    //.includes() para verificar se o texto do item contém o termo de busca
    if(textoItem.includes(itemFiltrado)){

      // Se o texto inclui o termo, exibe o item
      item.style.display = 'block'

    }else{
      // Se não incluir, esconde o item
      item.style.display = 'none'
    }
  })
}

filtroItens.addEventListener('keyup', filtrarItens)