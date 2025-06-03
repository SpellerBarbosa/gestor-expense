import connectToDB from "~/server/utils/db/ConnectToDB";
import Expense from "~/server/utils/schemas/expenseSchema";
import mongoose from 'mongoose';

export default defineEventHandler(async (event) => {
  await connectToDB();

  const { id } = await readBody(event);

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: "ID inválido ou ausente",
    });
  }

  try {
    const result = await Expense.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: "Despesa não encontrada",
      });
    }

    return { message: "Despesa excluída com sucesso" };
  } catch (error: any) {
    console.error("Erro ao excluir despesa:", error);

    throw createError({
      statusCode: 500,
      statusMessage: error.message || "Erro desconhecido ao excluir despesa.",
    });
  }
});
