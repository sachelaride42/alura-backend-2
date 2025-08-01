import NaoEncontrado from "../erros/NaoEncontrado.js";
import livros from "../models/Livro.js";

class LivroController {

  static listarLivros = async (req, res, next) => {
    try {
      const livrosResultado = await livros.find()
        .populate("autor")
        .exec();
      if (livrosResultado.length) {
        res.status(200).json(livrosResultado);
      } else {
        next(new NaoEncontrado("Nenhum livro encontrado"));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultado = await livros.findById(id)
        .populate("autor", "nome")
        .exec();
      if (livroResultado !== null) {
        res.status(200).send(livroResultado);
      } else {
        next(new NaoEncontrado("ID do livro não encontrado"));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static cadastrarLivro = async (req, res, next) => {
    try {
      let livro = new livros(req.body);

      const livroResultado = await livro.save();

      res.status(201).send(livroResultado.toJSON());
    } catch (erro) {
      next(erro);
    }
  }

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const resultado = await livros.findByIdAndUpdate(id, { $set: req.body });
      if (resultado !== null) {
        res.status(200).send({ message: "Livro atualizado com sucesso" });
      } else {
        next(new NaoEncontrado("ID do livro não encontrado"));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const resultado = await livros.findByIdAndDelete(id);
      if (resultado !== null) {
      res.status(200).send({ message: "Livro removido com sucesso" });
      } else {
        next(new NaoEncontrado("ID de livro não encontrado"));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static listarLivroPorEditora = async (req, res, next) => {
    try {
      const editora = req.query.editora;

      const livrosResultado = await livros.find({ "editora": editora });
      if (livrosResultado.length) {
        res.status(200).send(livrosResultado);
      } else {
        next(new NaoEncontrado("Editora não encontrada"));
      }
    } catch (erro) {
      next(erro);
    }
  }



}

export default LivroController