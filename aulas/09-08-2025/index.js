//Criação do array de notas
const notas = [7.5, 8.0, 6.5, 9.0, 5.0];

//Exbição da primeira e da última nota
console.log("Primeira nota:", notas[0]);
console.log("Última nota:", notas[notas.length - 1]);

//Adição de uma nova nota
notas.push(7.8);
console.log("Array após adicionar nova nota:", notas);

// Removendo a primeira nota
notas.shift();
console.log("Array após remover a primeira nota:", notas);

//Iteração com forEach
notas.forEach((nota, index) => {
    console.log(`Nota ${index + 1}:`, nota);
});

//Cálculo da média
let soma = notas.reduce(function(acumulador, nota) {
    return acumulador + nota;
}, 0);
let media = soma / notas.length;
console.log("Média das notas:", media.toFixed(2));


//Filtro de notas
let notasMaioresQueSete = notas.filter(function(nota) {
    return nota > 7;
});
console.log("Notas maiores que 7:", notasMaioresQueSete);

//Ordenação
notas.sort((a, b) => a - b);
console.log("Notas ordenadas em ordem crescente:", notas);

//Busca de elementos
let contemNota65 = notas.includes(6.5);
console.log("O array contém a nota 6.5?", contemNota65);

//Encontre o índice
let indiceNota80 = notas.indexOf(8.0);
console.log("O índice da nota 8.0 é:", indiceNota80);

//Mapeamento
let notasQuadrado = notas.map(function(nota) {
    return nota * nota;
});
console.log("Notas ao quadrado:", notasQuadrado);