const service = require("./service");

async function main() {
  try {
    const result = await service.obterPessoas("a");

    const names = [];
    for (let i = 0; i <= result.results.length - 1; i++) {
      const pessoa = result.results[i];
      names.push(pessoa.name);
    }
    console.log("names", names);
  } catch (error) {
    console.error("error interno", error);
  }
}

main();
