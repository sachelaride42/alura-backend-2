import NaoEncontrado from "../erros/NaoEncontrado.js";
import {autores} from "../models/index.js";

class AutorController {

  static listarAutores = async (req, res, next) => {
    try {
      const autoresResultado = await autores.find();
      if (autoresResultado.length) {
        res.status(200).json(autoresResultado);
      } else {
        next(new NaoEncontrado("Nenhum autor localizado"));
      }

    } catch (erro) {
      next(erro);
    }
  }

  static listarAutorPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const autorResultado = await autores.findById(id);
      if (autorResultado !== null) {
        res.status(200).send(autorResultado);
      } else {
        next(new NaoEncontrado(`Id do Autor não localizado.`));
      }
    } catch (erro) {
      next(erro);
    }
  }


  static cadastrarAutor = async (req, res, next) => {
    try {
      let autor = new autores(req.body);

      const autorResultado = await autor.save();
      
      res.status(201).send(autorResultado.toJSON());
    } catch (erro) {
      next(erro);
    }
  }


  static atualizarAutor = async (req, res, next) => {
    try {
      const id = req.params.id;

      const retorno = await autores.findByIdAndUpdate(id, { $set: req.body });
      if(retorno !== null) {
        res.status(200).send({ message: "Autor atualizado com sucesso" });
      } else {
        next(new NaoEncontrado("ID do autor não encontrado"));
      }

    } catch (erro) {
      next(erro);
    }
  }

  static excluirAutor = async (req, res, next) => {
    try {
      const id = req.params.id;

      const resultado = await autores.findByIdAndDelete(id);
      if (resultado == null) {
        next(new NaoEncontrado("ID do autor não localizado"));
      } else {
        res.status(200).send({ message: "Autor removido com sucesso" });
      }
      
    } catch (erro) {
      next(erro);
    }
  }


}

export default AutorController