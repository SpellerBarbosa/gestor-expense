import connectToDB from "~/server/utils/db/ConnectToDB";
import Expense from "~/server/utils/schemas/expenseSchema";

export default defineEventHandler(async (event) => {
  await connectToDB();

  const { description, value, category, userId, date } = await readBody(event);

  if (!description || !value || !category || !userId ||!date) {
    throw createError({
      statusCode: 400,
      statusMessage: "Preencha todos os campos corretamente.",
    });
  }


  try {
    const newExpense = await Expense.create({
      description: description.toLowerCase().trim(),
      value: value.trim(),
      category: category.toLowerCase().trim(),
      userId: userId,
    });

    return { message: "despesa lançada com sucesso." }
  } catch (error: any) {
    if(error.statusCode) throw error;

    console.error(error)

    throw createError({
        statusCode: 500,
        statusMessage: "Erro ao conectar ao banco de dados, tente novamente mais tarde."
    })
  }
});
