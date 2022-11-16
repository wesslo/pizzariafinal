const usuarios = require("../databases/usuarios.json");
const fs = require("fs");
const bcrypt = require("bcrypt"
);
function listar(){
    // Seu código aqui
    let lista = (u) => {
        return{
            id:u.id,
            nome:u.nome,
            email:u.email
        }
    }

    let novaLista = usuarios.map(lista)
    console.table(novaLista);
}

function salvar(arrayDeUsuarios){
    // Seu código aqui
    fs.writeFileSync("./databases/usuarios.json",JSON.stringify(arrayDeUsuarios,null,4));
}

function cadastrar(objeto){
// Seu código aqui
let cadastro = {
    id:usuarios[usuarios.length -1].id +1,
    nome:objeto.nome,
    email:objeto.email,
    senha:bcrypt.hashSync(objeto.senha,10),
    enderecos:[objeto.endereco],
    formasDePagamento:[]
}
usuarios.push(cadastro);
salvar(usuarios);
}

function detalhar(idUsuario){
// Seu código aqui
let a = (usuarios) =>{
    return idUsuario === usuarios.id
 }
 let detalhe = usuarios.find(a)
 
 console.log("Nome: " + detalhe.nome);
 console.log("E-mail: " + detalhe.email);
 console.table(detalhe.enderecos);
 console.table(detalhe.formasDePagamento);
}

function remover(idDoUsuarioParaRemover){
    // Seu código aqui
    let remove = usuarios.findIndex(function(usuarios){
        return idDoUsuarioParaRemover === usuarios.id
     })
 
     if(remove >= 0){
     usuarios.splice(remove,1);
     }else{}
     salvar(usuarios);
}

function alterar(novosDados, idUsuario){
    // Seu código aqui
    let a = (usuarios) =>{
        return idUsuario === usuarios.id 
     }
     let altera = usuarios.findIndex(a)
 
     if(altera >= 0){
         usuarios[altera].nome = novosDados.nome;
         usuarios[altera].email = novosDados.email;
         usuarios[altera].senha = bcrypt.hashSync(novosDados.senha,10);
     }
     salvar(usuarios);
}

function addEndereco(novoEndereco, idUsuario){
    // Seu código aqui
    let a = (usuarios) => {
        return idUsuario === usuarios.id;
     }
     let adicionandoEndereco = usuarios.findIndex(a)
     if(adicionandoEndereco >= 0){
         //usuarios[adicionandoEndereco].enderecos.splice(0, 0, novoEndereco);
         usuarios[adicionandoEndereco].enderecos.push(novoEndereco);
     }
     salvar(usuarios);
}

function removerEndereco(posicaoDoEndereco, idUsuario){
// Seu código aqui
let a = (usuarios) =>{
    return idUsuario === usuarios.id
}
let removeEndereco = usuarios.findIndex(a)
if(removeEndereco >= 0){
    usuarios[removeEndereco].enderecos.splice(posicaoDoEndereco,1);
}
salvar(usuarios);
}

function alterarEndereco(posicaoDoEndereco, novoEndereco, idUsuario){
// Seu código aqui        
let a = (usuarios) =>{
    return idUsuario === usuarios.id
}        
let alteraEndereco = usuarios.findIndex(a);
if(alteraEndereco >= 0){
    usuarios[alteraEndereco].enderecos.splice(posicaoDoEndereco,1,novoEndereco);
}
salvar(usuarios);
}

function addFormaDePagamento(novaFormaDePagamento, idUsuario){
    // Seu código aqui
    let a = (usuarios) => {
        return idUsuario ===  usuarios.id
    }
    let adicionarPagamento = usuarios.findIndex(a);
    if(adicionarPagamento >= 0){
        usuarios[adicionarPagamento].formasDePagamento.push(novaFormaDePagamento);
    }
    salvar(usuarios);
}

function removerFormaDePagamento(posicaoDaFormaDePagamento, idUsuario){
    // Seu código aqui
    let a = (usuarios) =>{
        return idUsuario === usuarios.id
    }
    let removerPagamento = usuarios.findIndex(a);
    if(removerPagamento >= 0){
        usuarios[removerPagamento].formasDePagamento.splice(posicaoDaFormaDePagamento, 1);
    }
    salvar(usuarios);
}

function alterarFormaDePagamento(novaFormaDePagamento, posicaoDaFormaDePagamento, idUsuario){
    // Seu código aqui
    let a = (usuarios)=>{
        return idUsuario === usuarios.id
    }
    let alteraFormaDePagamento = usuarios.findIndex(a);
    if(alteraFormaDePagamento >= 0){
        usuarios[alteraFormaDePagamento].formasDePagamento.splice(posicaoDaFormaDePagamento, 1, novaFormaDePagamento)
    }
    salvar(usuarios);
}

const UsuariosServices = {
    cadastrar,
    listar,
    detalhar,
    remover,
    alterar,
    addEndereco,
    removerEndereco,
    alteraEndereco: alterarEndereco,
    addFormaDePagamento,
    removerFormaDePagamento,
    alterarFormaDePagamento
}

module.exports = UsuariosServices;
