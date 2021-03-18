const { obterPessoas } = require("./service");

Array.prototype.meuReduce = function (callback, valorIncial) {
  let valorFinal = typeof valorIncial !== undefined ? valorIncial : this[0];
  for (let index = 0; index <= this.length - 1; index++) {
    valorFinal = callback(valorFinal, this[index], this);
  }
  return valorFinal;
};

async function main() {
  try {
    const { results } = await obterPessoas("a");
    const pesos = results.map((item) => parseInt(item.height));
    console.log("pesos", pesos);
    // const total = pesos.reduce((anterior, proximo) => {
    //   return anterior + proximo;
    // }, 0);

    const minhaLista = [
      ["Erik", "Wendel"],
      ["NodeBR", "Nerdzão"],
    ];

    const total = minhaLista
      .meuReduce((anterior, proximo) => {
        return anterior.concat(proximo);
      }, [])
      .join(", ");

    console.log("total", total);
  } catch (error) {
    console.error("Deu ruim", error);
  }
}
main();
