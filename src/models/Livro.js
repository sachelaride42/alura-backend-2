import mongoose from "mongoose";

const livroSchema = new mongoose.Schema(
  {
    id: {type: String},
    titulo: {
      type: String, 
      required: [true, "O título do livro é obrigatório"]
    },
    autor: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'autores', 
      required: [true, "O autor é obrigatório"]
    },
    editora: {
      type: String, 
      required: [true, "A editora é obrigatória"],
      enum: {
        values: ["Casa do Código", "Alura"],
        message: "A editora {VALUE} não é um valor permitido"
      }
    },
    numeroPaginas: {
      type: Number,
      validate: {
        validator: (value) => {
          return value >= 10 && value <= 5005;
        },
        message: "O número da página deve estar entre 10 e 5005. Número fornecido: {VALUE}"
      }

      // min: [10, "O número da página deve estar entre 10 e 5005. Número fornecido: {VALUE}"],
      // max: [5005, "O número da página deve estar entre 10 e 5005. Número fornecido: {VALUE}"] 
    }
  }
);

const livros= mongoose.model('livros', livroSchema);

export default livros;