import mongoose from "mongoose";
const uri = process.env.URI || undefined;

if (!uri) {
  throw new Error("Variável de Ambiente nao definida");
}

const connectToDB = async () => {
  try {
    await mongoose.connect(uri, {
      dbName: "financedb",
      serverSelectionTimeoutMS: 5000,
    });

  } catch (error ) {
    if(error instanceof Error){
      console.error('Erro ao conectar com banco de dados: ', error.message)
    }else{
      console.error('Erro desconhecido ao conectar ao banco de dados: ', error)
    }
  }
};

export default connectToDB;
