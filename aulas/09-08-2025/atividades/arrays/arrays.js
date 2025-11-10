// Criação de Arrays: Crie um array chamado notas que armazene as notas de cinco
// alunos.
const notas = [9.5, 6.5, 8.0, 10.0, 2.5];

// Acesso aos Elementos: Exiba no console a primeira e a última nota do array.
console.log(`Primeira nota: ${notas[0]}`);
console.log(`Última nota: ${notas[notas.length - 1]}`);

// Adicione uma nova nota ao final do array usando push().
notas.push(6.5);

// Remova a primeira nota do array usando shift().
const primeira = notas.shift();

// Exiba o array resultante no console.
console.log(`Notas: ${notas}`)

// Iteração com forEach: Itere sobre o array notas e exiba cada nota no console.
notas.forEach((nota, index) => console.log(`Nota ${index + 1}: ${nota}`));

// Cálculo da Média: Utilize um loop for ou o método reduce para calcular a
// média das notas.
const media = (
  notas.reduce(
    (soma, nota) => soma = soma + nota,
    0
  ) / notas.length
).toFixed(2);
console.log(`Média: ${media}`);

// Filtro de Notas: Use o método filter para criar um novo array com as notas
// maiores que 7.
const notasMaioresQue7 = notas.filter(nota => nota > 7);
console.log(`Notas maiores que 7.0: ${notasMaioresQue7}`);

// Ordenação: Ordene o array notas em ordem crescente utilizando o método sort.
notas.sort((x, y) => x - y);
console.log(`Notas ordenadas: ${notas}`)

// Busca de Elementos: Verifique se a nota 6.5 está presente no array utilizando
// includes.
console.log(
  `A nota 6.5 está presente no array? ${notas.includes(6.5) ? "Sim!" : "Não!"}`
);

// Encontre o Índice: Utilize o método indexOf para encontrar o índice da nota
// 8.0.
console.log(`Índice da nota 8.0: ${notas.indexOf(8.0)}`);

// Mapeamento: Crie um novo array em que cada nota seja elevada ao quadrado
// utilizando o método map.
console.log(`Notas elevadas ao quadrado: ${notas.map(nota => nota ** 2)}`);
