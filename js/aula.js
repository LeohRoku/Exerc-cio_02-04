class Aula {
    constructor(){ //é chamado toda vez que a classe é instanciada
        this.aulas = JSON.parse(localStorage.getItem('tbAulas')) || []
    }
    static fields = ['nomeDaAtividade', 'periodo', 'diaDaSemana', 'aulaAtiva']

    salva(aula){
        this.aulas.push(aula) //o push adiciona no fim do array
        localStorage.setItem('tbAulas', JSON.stringify(this.aulas))
        alert('Aula salva com sucesso ✔')
        this.lista() // atualiza a listagem
        document.getElementById('nomeDaAtividade').value = ''
        document.getElementById('periodo').value = ''
        document.getElementById('diaDaSemana').value = ''
        document.getElementById('aulaAtiva').value = ''
    }
    lista(){
        const tbody = document.getElementById('listaAulas')
        const linhas = this.aulas.map(aula => {
            return `
            <tr>
                <td>${aula.nomeDaAtividade}</td>
                <td>${aula.periodo}</td>
                <td>${aula.diaDaSemana}</td>
                <td>${aula.aulaAtiva}</td>
            </tr>
            `
        })
        tbody.innerHTML = linhas.join('')
    }
}
//criando o objeto cliente
const aula = new Aula()

document.getElementById('salvar').addEventListener('click', (event) => {
    event.preventDefault() //evita que a página seja recarregada
    
    let ativa = ''
    if(document.getElementById('aulaAtiva').checked){
        ativa = 'Sim'
    } else {
        ativa = 'Não'
    }

    const registro = {
        nomeDaAtividade: document.getElementById('nomeDaAtividade').value,
        periodo: document.getElementById('periodo').value,
        diaDaSemana: document.getElementById('diaDaSemana').value,
        aulaAtiva: ativa
    }
    //salvando os dados
    aula.salva(registro)
})

//carregar a listagem no momento que carregar a página
window.onload = function(){
    aula.lista()
}

