let count = 0

const contadorElemento = document.getElementById('contador')
const botaoAumentar = document.getElementById('aumentar-btn')

function aumentarContador(){
  count++
  contadorElemento.textContent = count

}

botaoAumentar.addEventListener('click', aumentarContador)