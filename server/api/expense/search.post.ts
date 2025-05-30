import connectToDB from "~/server/utils/db/ConnectToDB";
import Expense from "~/server/utils/schemas/expenseSchema";

export default defineEventHandler(async (event) => {
  await connectToDB();

  const { userId, dateInitial, dateFinally } = await readBody(event);

  if (!userId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Token invalido, ou expirado.",
    });
  }

  if(!dateInitial || !dateFinally){
    throw createError({
      statusCode: 400,
      statusMessage: "Não foram passado as datas para a consulta"
    })
  }


  const initialDate = new Date(dateInitial);
  const finallyDate = new Date(dateFinally);


  try {
      const expenses = await Expense.find({userId: userId, date:{
        $gte: initialDate, $lte: finallyDate
      }});

    return { expenses };
  } catch (error: any) {
    if (error.statusCode) throw error;

    console.error(error);

    throw createError({
      statusCode: 500,
      statusMessage:
        "erro ao conectar ao banco de dados tente novamente mais tarde.",
    });
  }
});
