/*
  Callbacks, promises e async/await
*/

/*
  0 Obter um usuário
  1 Obter o número de telefone de um usuário a partir de seu Id
  2 Obter o endereço do usuário pelo Id
*/

// ASYNC/AWAIT

function obterUsuario() {
  // quando der algum problema -> reject(erro)
  // quando der tudo certo - resolve
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(function () {
      return resolve({
        id: 1,
        nome: "Aladin",
        dataNascimento: new Date(),
      });
    }, 1000);
  });
}

function obterTelefone(idUsuario) {
  return new Promise(function resolverPromise(resolve, reject) {
    setTimeout(() => {
      return resolve({
        telefone: "110002",
        ddd: 11,
      });
    }, 2000);
  });
}

function obterEndereco(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      rua: "dos bobos",
      numero: 0,
    });
  }, 2000);
}

// 1 passo - adicionar a palavra async e automaticamente ela retornará uma promise
main();
async function main() {
  try {
    console.time("medida-promise");
    const usuario = await obterUsuario();
    // const telefone = await obterTelefone(usuario.id);
    // const endereco = await obterEnderecoAsync(usuario.id);
    const resultado = await Promise.all([
      obterTelefone(usuario.id),
      obterEnderecoAsync(usuario.id),
    ]);
    const telefone = resultado[0];
    const endereco = resultado[1];

    console.log(`
    Nome: ${usuario.nome},
    Endereço: ${endereco.rua}, ${endereco.numero},
    Telefone: (${telefone.ddd})${telefone.telefone}
    `);
    console.timeEnd("medida-promise");
  } catch (error) {
    console.error("Deu ruim", error);
  }
}

// PROMISES
// // importamos um módulo interno do NodeJs
const util = require("util");
const obterEnderecoAsync = util.promisify(obterEndereco);

// function obterUsuario() {
//   // quando der algum problema -> reject(erro)
//   // quando der tudo certo - resolve
//   return new Promise(function resolvePromise(resolve, reject) {
//     setTimeout(function () {
//       return resolve({
//         id: 1,
//         nome: "Aladin",
//         dataNascimento: new Date(),
//       });
//     }, 1000);
//   });
// }

// function obterTelefone(idUsuario) {
//   return new Promise(function resolverPromise(resolve, reject) {
//     setTimeout(() => {
//       return resolve({
//         telefone: "110002",
//         ddd: 11,
//       });
//     }, 2000);
//   });
// }

// function obterEndereco(idUsuario, callback) {
//   setTimeout(() => {
//     return callback(null, {
//       rua: "dos bobos",
//       numero: 0,
//     });
//   }, 2000);
// }

// const usuarioPromise = obterUsuario();
// // para manipular o sucesso, usamos a função .then
// // para manipular erros, usamos .catch
// // usuario -> telefone -> telefone
// usuarioPromise
//   .then(function (usuario) {
//     return obterTelefone(usuario.id).then(function resolverTelefone(result) {
//       return {
//         usuario: { nome: usuario.id, id: usuario.id },
//         telefone: result,
//       };
//     });
//   })
//   .then(function (resultado) {
//     const endereco = obterEnderecoAsync(resultado.usuario.id);
//     return endereco.then(function resolverEndereco(result) {
//       return {
//         usuario: resultado.usuario,
//         telefone: resultado.telefone,
//         endereco: result,
//       };
//     });
//   })
//   .then(function (resultado) {
//     console.log(`
//       Nome: ${resultado.usuario.nome},
//       Endereço: ${resultado.endereco.rua}, ${resultado.endereco.numero},
//       Telefone: (${resultado.telefone.ddd})${resultado.telefone.telefone}
//     `);
//   })
//   .catch(function (error) {
//     console.error("Deu ruim", error);
//   });

// CALLBACKS
/*
  - A função 'obterUsario' recebe um callback (que nada mais é que uma função que será executada após o termino desta);
  - Isso quer dizer que, após a função 'obterUsario' ser executada, ela executará a função de callback;
  - No nosso caso, a função 'obterUsuario' foi chamada e passado no callback, a função 'resolverUsuario';
  - Isso quer dizer que, após 'obterUsuario' ser executado, irá executar 'resolverUsario';
  - O primeiro parametro de uma função de callback é o erro, e o segundo são as informações que se quer passar;
  - Por isso, ao chamar 'resolverUsario', que é a função de callback neste caso, se passa primeiro 'null', e então, como
    segundo parametro, se passa o usuario.
*/
//obterUsuario(function resolverUsuario(error, usuario) {
// null || "" || 0 === false - se o erro tiver qualquer um destes valores,
// será false e, portanto, não cairá dentro do if
//if (error) {
//console.error("Deu ruim em usuario", error);
//return;
//}
//obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
//if (error1) {
//console.error("Deu ruim em telefone", error1);
//return;
//}
//obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
//if (error2) {
//console.error("Deu ruim em telefone", error2);
//return;
//}
//console.log(`
//Nome: ${usuario.nome},
//Endereco: ${endereco.rua}${endereco.numero},
//Telefone: (${telefone.ddd})${telefone.telefone}
//`);
//});
//});
//});
