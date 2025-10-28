//definir a chave para o local storage
const CHAVE_STORAGE = 'dadosFinanceiros'

const formulario = document.getElementById('form-transacao')
const inputDescricao = document.getElementById('descricao')
const inputValor = document.getElementById('valor')
const listaHTML = document.getElementById('lista-transacoes')
const resumoHTML = document.getElementById('resumo-financeiro')
const inputTipo = document.getElementById('tipo-transacao');

//array vazio para receber os dados, usar o let pq vai ser modificado
let transacoes = []

function salvarTransacoes() {
  localStorage.setItem(CHAVE_STORAGE, JSON.stringify(transacoes))
}

function carregarTransacoes() {
  const dadosSalvos = localStorage.getItem(CHAVE_STORAGE)

  if (dadosSalvos) {
    transacoes = JSON.parse(dadosSalvos)
  }
  renderizarTransacoes()
}

function adicionarTransacao(e) {
  e.preventDefault()

  //correçao: aqui eu usei o .value() so que value nao recebe parametro, a forma correta é so .value
  const valorDescricao = inputDescricao.value
  const valorValor = parseFloat(inputValor.value)// parseFloat garante que seja numero
  const tipoSelecionado = inputTipo.value
  //se os valores forem 0 ou vazios, nao faz nada, o !valor é como se o valor é diferente da existencia 
  if (!valorDescricao || !valorValor || !tipoSelecionado) {
    alert('por favor, preencha a descricao e o valor valido')
    return
  }

  //correçao: eu tinha usado o id: id.Datenow() o correto é id: Date.now()
  const novaTransacao = {
    id: Date.now(),
    descricao: valorDescricao,
    valor: valorValor,
    tipo: tipoSelecionado
  }
  transacoes.push(novaTransacao)
  salvarTransacoes()
  renderizarTransacoes()

  inputDescricao.value = ''
  inputValor.value = ''
  inputDescricao.focus();

}

function removerTransacao(id) {
  transacoes = transacoes.filter(transacao => transacao.id !== id)
  salvarTransacoes()
  renderizarTransacoes()
}

formulario.addEventListener('submit', adicionarTransacao)

function renderizarTransacoes() {
  const tabelaBody = document.getElementById('lista-transacoes')
  tabelaBody.innerHTML = '' // limpa as linhas antigas

  let saldoAtual = 0

  transacoes.forEach(transacao => {
    const linha = document.createElement('tr')
    linha.classList.add('linhaColuna')
    // Coluna Descrição
    const colunaDescricao = document.createElement('td')
    colunaDescricao.textContent = transacao.descricao

    // Coluna Valor
    const colunaValor = document.createElement('td')
    colunaValor.textContent = `R$ ${transacao.valor.toFixed(2)}`

    // Coluna Tipo
    const colunaTipo = document.createElement('td')
    colunaTipo.textContent = transacao.tipo === 'receita' ? 'Receita' : 'Despesa'
    colunaTipo.classList.add(transacao.tipo === 'receita' ? 'receita' : 'despesa')

    // Coluna Ação (botão remover)
    const colunaAcao = document.createElement('td')
    const botaoRemover = document.createElement('button')
    botaoRemover.textContent = 'Remover'
    botaoRemover.classList.add('btn-remover')
    botaoRemover.addEventListener('click', () => removerTransacao(transacao.id))
    colunaAcao.appendChild(botaoRemover)

    // Adicionar as colunas na linha
    linha.appendChild(colunaDescricao)
    linha.appendChild(colunaValor)
    linha.appendChild(colunaTipo)
    linha.appendChild(colunaAcao)

    // Adicionar a linha no tbody da tabela
    tabelaBody.appendChild(linha)

    // Atualizar saldo
    if (transacao.tipo === 'receita') {
      saldoAtual += transacao.valor
    } else {
      saldoAtual -= transacao.valor
    }
  })

  resumoHTML.classList.remove('positivo', 'negativo', 'neutro')
  if(saldoAtual > 0){
    resumoHTML.classList.add('positivo')
  }else if(saldoAtual < 0){
    resumoHTML.classList.add('negativo')
  }else{
    resumoHTML.classList.add('neutro')
  }
  resumoHTML.innerHTML = `<h2>Saldo Atual: R$ ${saldoAtual.toFixed(2)}</h2>`

}




carregarTransacoes()
renderizarTransacoes()