import connectToDB from "~/server/utils/db/ConnectToDB";
import Expense from "~/server/utils/schemas/expenseSchema";

export default defineEventHandler(async (event) => {
  await connectToDB();

  const { id, description, value, payment, date, category } = await readBody(
    event
  );

  if (!id || !description || !value || !payment || !date || !category) {
    throw createError({
      statusCode: 400,
      statusMessage: "Preencha os campos corretamente",
    });
  }

  
  try {
    const newDate = new Date(date);
    
    const expense = await Expense.findByIdAndUpdate(
       id,
      {
        $set: {
          description: description,
          value: value,
          payment: payment,
          date: newDate,
          category: category,
        },
      },{
        new: true,
        runValidators: true
      }
    );

    return{ message: "Despesa atualizada com sucesso"}
  } catch (error: any) {
    console.error(error)

    if(error.statusCode)  throw error;

    throw createError({
        statusCode: 500,
        statusMessage: "Erro desconhecido ao tentar conexão com o servidor, tente novamente mais tarde"
    })
  }
});
