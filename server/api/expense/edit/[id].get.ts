import { getRouterParam } from "#imports";
import Expense from "~/server/utils/schemas/expenseSchema";
import connectToDB from "~/server/utils/db/ConnectToDB";

export default defineEventHandler(async(event) =>{
    await connectToDB();

    const id = getRouterParam(event, 'id');

    if(!id){
        throw createError({
            statusCode: 400,
            statusMessage: "ID não fornecido"
        })
    }

    try {
        const expense = await Expense.findById(id).lean()


        if(!expense){
            throw createError({
                statusCode: 400,
                statusMessage: "Despesa nao existe ou ja excluida"
            })
        }
        return { expense }

    } catch (error: any) {
        if(error.statusCode) throw error;

        console.error(error)

        throw createError({
            statusCode: 500,
            statusMessage: "Error desconhecido ao tentar conectar com o servidor."
        })
    }
})