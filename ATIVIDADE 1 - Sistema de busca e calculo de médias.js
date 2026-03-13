const prompt = require('prompt-sync')();


function media(v1, v2) {    // Define a função de média
    return (v1 + v2) / 2;
}


function statusAluno(media) {    // Define status do aluno
    if (media >= 7) {
        return "APROVADO";
    } else {
        return "EM RECUPERAÇÃO";
    }
}


let alunos = [];


    //Pergunta quantos alunos serão cadastrados
let quantidade = parseInt(prompt("Quantos alunos deseja cadastrar? "));     // ParseInt transforma uma string em um numero inteiro


// Cadastra o aluno
for (let i = 0; i < quantidade; i++) {
    console.log(`\n--- Cadastro do Aluno ${i+1} ---`);
    let aluno = {
        nome: prompt("Nome: "),
        serie: prompt("Série: "),
        num_chamada: parseInt(prompt("Número de chamada: ")),
        n1: parseFloat(prompt("Nota 1: ")),     // Similar ao parseInt, o parseFloat transforma uma string em um numero que suporta decimal
        n2: parseFloat(prompt("Nota 2: "))
    };
   
    aluno.media = media(aluno.n1, aluno.n2);
    aluno.status = statusAluno(aluno.media);    // Adiciona status ao aluno
    alunos.push(aluno);     // Coloca o objeto criado no array
}


// Menu de opções
function menu() {
    console.log("\n=== MENU PRINCIPAL ===");
    console.log("1 - Listar todos os alunos");
    console.log("2 - Buscar aluno por nome");
    console.log("3 - Buscar aluno por número de chamada");
    console.log("4 - Sair");
   
    let opcao = parseInt(prompt("Escolha uma opção: "));
    return opcao;
}


// Busca alunos por nome
function buscarPorNome(nomeBusca) {
    let encontrados = [];
   
    for (let i = 0; i < alunos.length; i++) {
        if (alunos[i].nome.toLowerCase().includes(nomeBusca.toLowerCase())) {     // Permite a indinstinção de letras maiusculas e minusculas
            encontrados.push(alunos[i]);
        }
    }
   
    return encontrados;
}


// Busca por numero de chamada
function buscarPorChamada(numBusca) {
    for (let i = 0; i < alunos.length; i++) {
        if (alunos[i].num_chamada === numBusca) {
            return alunos[i]; // Retorna o aluno encontrado
        }
    }
    return null; // Se não encontrar
}


// Função para exibição de aluno
function exibirAluno(aluno) {
    console.log("\n--- DADOS DO ALUNO ---");
    console.log(`Nome: ${aluno.nome}`);
    console.log(`Série: ${aluno.serie}`);
    console.log(`Nº Chamada: ${aluno.num_chamada}`);
    console.log(`Nota 1: ${aluno.n1}`);
    console.log(`Nota 2: ${aluno.n2}`);
    console.log(`Média: ${aluno.media.toFixed(1)}`); // Limita a uma casa decimal
    console.log(`Status: ${aluno.status}`); //  Exibe status do aluno
}


// Função para exibir vários alunos
function exibirAlunos(lista) {
    if (lista.length === 0) {
        console.log("\nNenhum aluno encontrado!");
        return;
    }
   
    console.log(`\n--- ${lista.length} ALUNO(S) ENCONTRADO(S) ---`);
    for (let i = 0; i < lista.length; i++) {
        exibirAluno(lista[i]);
    }
}


// Função para exibir versão resumida na listagem geral
function exibirAlunoResumido(aluno, indice) {
    console.log(`${indice+1}. ${aluno.nome} - Chamada: ${aluno.num_chamada} - Média: ${aluno.media.toFixed(1)} - Status: ${aluno.status}`);
}


// Mantém o menu em execução até usuário escolher a opção "Sair"
let continuar = true;


while (continuar) {
    let opcao = menu();
   
    switch(opcao) {
        case 1:     // Lista todos os alunos
            console.log("\n--- TODOS OS ALUNOS CADASTRADOS ---");
            for (let i = 0; i < alunos.length; i++) {
                exibirAlunoResumido(alunos[i], i);
            }
            break;
           
        case 2:     // Busca por nome
            let nomeBusca = prompt("Digite o nome (ou parte do nome) do aluno: ");
            let resultados = buscarPorNome(nomeBusca);
            exibirAlunos(resultados);
            break;
           
        case 3:     // Busca por número de chamada
            let numBusca = parseInt(prompt("Digite o número de chamada: "));
            let alunoEncontrado = buscarPorChamada(numBusca);
           
            if (alunoEncontrado) {
                exibirAluno(alunoEncontrado);
            } else {
                console.log("\nAluno não encontrado!");
            }
            break;
           
        case 4:     // Encerra o código
            console.log("\nPrograma encerrado!");
            continuar = false;
            break;
           
        default:
            console.log("\nOpção inválida! Tente novamente.");
    }
}

