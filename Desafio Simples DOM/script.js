const adicionar = document.getElementById('adicionar-btn')

function adicionarContainer(){
  const itemPrincipal = document.createElement('div')
  itemPrincipal.className = 'container-padrao'



  const novoContainer = document.createElement('div')
  novoContainer.contentEditable = true
  novoContainer.textContent = 'Click aqui para editar o texto'
  novoContainer.classList = 'item-container'
  novoContainer.addEventListener('keydown', (e) => {
    if(e.key === 'Backspace' && novoContainer.textContent.trim() === ''){
      e.preventDefault
    }
  })
  
  const botaoRemover = document.createElement('button')
  botaoRemover.textContent = 'Remover'
  botaoRemover.className = 'botao-remover'
  botaoRemover.contentEditable = 'false'

  botaoRemover.addEventListener('click', ()=>{
    itemPrincipal.remove()
  })
  
  itemPrincipal.appendChild(novoContainer)
  itemPrincipal.appendChild(botaoRemover)

  const itens = document.getElementById('container-itens')
  itens.appendChild(itemPrincipal)

  novoContainer.focus();
}

adicionar.addEventListener('click', adicionarContainer)