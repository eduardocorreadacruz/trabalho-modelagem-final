const Usuario = require('../model/Usuario')

const cadastrar = async(req,res)=>{
    const dados = req.body
    try{
        const valores = await Usuario.create(dados)
        res.status(201).json({message:"cadastro do usuario realizado com sucesso"})
    }
    catch(err){
        console.error("não foi possivel cadastrar o usuario",err)
        res.status(500).json({message:"não foi possivel cadastrar o usuario"})
    }
}

const listar = async (req, res) => {
    try {
        const valores = await Usuario.findAll()
        res.status(200).json(valores)
    } catch (err) {
        console.error("não foi possível listar os usuários", err)
        res.status(500).json({ message: "não foi possível listar os usuários" })
    }
};

const atualizar = async (req,res)=>{
    const id = req.params.id
    const valores = req.body
    try{
        let dados = await Usuario.findByPk(id)
        if(dados){
            await Usuario.update(valores, {where: { idUsuario: id}})
            dados = await Usuario.findByPk(id)
            res.status(200).json(dados)
        }else{
            res.status(404).json({message: 'Usuario não encontrado!'})
        }
    }catch(err){
        console.error('Erro ao atualizar os dados!',err)
        res.status(500).json({message: 'Erro ao atualizar os dados!'})
    }
}

const apagar = async (req, res) => {
  const id = req.params.id;
  try {
    const dados = await Usuario.findByPk(id, {
    });
    if (dados) {
      await Usuario.destroy({ where: {idUsuario:id } });
      res.status(204).json({ message: 'Dados excluídos com sucesso!' });
    } else {
      res.status(404).json({ message: 'Usuario não encontrado!' });
    }
  } catch (err) {
    console.error('Erro ao apagar os dados!', err);
    res.status(500).json({ message: 'Erro ao apagar os dados!' });
  }
};

module.exports = {cadastrar, listar, atualizar, apagar}