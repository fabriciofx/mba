// Criação de um Objeto JSON: Crie um objeto JSON que represente as informações
// de um aluno, contendo os seguintes dados: nome, idade, curso, e notas (um
// array com as notas de três disciplinas).
const aluno = {
  nome: "Ana Pires",
  idade: 19,
  curso: "Administração",
  notas: [7.2, 4.5, 8.5]
};
console.log(aluno);

// Acesso a Propriedades: Exiba no console o nome do aluno e a nota da primeira
// disciplina.
console.log(`Aluno: ${aluno.nome} - Nota: ${aluno.notas[0]}`);

// Modificação de Propriedades: Atualize a idade do aluno para 22 anos e
// adicione uma nova nota ao array de notas.
aluno.idade = 22;
aluno.notas.push(6.5)
console.log(aluno);

// Conversão para String: Converta o objeto aluno para uma string JSON
// utilizando o método JSON.stringify e exiba o resultado no console.
const alunoString = JSON.stringify(aluno)
console.log(alunoString);

// Conversão para Objeto: Converta a string JSON de volta para um objeto
// utilizando o método JSON.parse.
const alunoParsed = JSON.parse(alunoString);
console.log(alunoParsed);

// Iteração sobre Propriedades: Utilize um loop for...in para iterar sobre as
// propriedades do objeto aluno e exiba cada uma no console.
for(const atributo in aluno) {
  console.log(`${atributo}: ${aluno[atributo]}`);
}

// Cálculo da Média das Notas: Calcule a média das notas do aluno e exiba o
// resultado.
const media = (
  aluno.notas.reduce(
    (soma, nota) => soma = soma + nota,
    0
  ) / aluno.notas.length
).toFixed(2);
console.log(`Média: ${media}`);

// Criação de um Objeto JSON Aninhado: Adicione ao objeto aluno uma propriedade
// endereco que contenha outro objeto com as seguintes propriedades: rua,
// cidade, e estado.
const alunoCompleto = {
  nome: "Ana Pires",
  idade: 19,
  curso: "Administração",
  notas: [7.2, 4.5, 8.5],
  endereco: {
    logradouro: "Av. Sapé, 123",
    cidade: "João Pessoa",
    estado: 'PB'
  }
};
console.log(alunoCompleto);

// Acesso a Dados Aninhados: Exiba no console a cidade e o estado do aluno.
console.log(`Cidade: ${alunoCompleto.endereco.cidade}`);
console.log(`Estado: ${alunoCompleto.endereco.estado}`);

// Lista de Alunos: Crie um array de objetos JSON chamado alunos, onde cada
// objeto represente um aluno com as mesmas propriedades do objeto aluno.
const alunos = [
  {
    nome: "Ana Pires",
    idade: 19,
    curso: "Administração",
    notas: [7.2, 4.5, 8.5],
    endereco: {
      logradouro: "Av. Sapé, 123",
      cidade: "João Pessoa",
      estado: 'PB'
    }
  },
  {
    nome: "Bruno Mendes",
    idade: 21,
    curso: "Direito",
    notas: [8.2, 9.7, 8.2],
    endereco: {
      logradouro: "Av. Caxangá, 321",
      cidade: "Recife",
      estado: 'PE'
    }
  },
  {
    nome: "Carla Damasceno",
    idade: 25,
    curso: "Computação",
    notas: [6.5, 10.0, 5.6],
    endereco: {
      logradouro: "Rua Padre Anchieta, 721",
      cidade: "São Vicente",
      estado: 'SP'
    }
  }
];
console.log(alunos);

// Filtragem de Alunos: Utilize o método filter para criar um novo array
// contendo apenas os alunos com média de notas superior a 8.
const alunosComMediaSuperiorA8 = alunos.filter(
  aluno => {
    const media = aluno.notas.reduce(
      (soma, nota) => soma = soma + nota,
      0
    ) / aluno.notas.length;
    if (media > 8) {
      return aluno;
    }
  }
);
console.log(alunosComMediaSuperiorA8);
