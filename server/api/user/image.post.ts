import connectToDB from "~/server/utils/db/ConnectToDB";
import User from "~/server/utils/schemas/userSchema";

export default defineEventHandler(async(event) =>{
    await connectToDB();

   const { id } = await readBody(event)

    if(!id){
        throw createError({
            statusCode: 400,
            statusMessage:"ID do usuário nao fornecido"
        })
    }

    try {
        const image = await User.findById(id).lean()

        if(!image){
            throw createError({
                statusCode: 400,
                statusMessage: "Imagem não existe ou nao foi adicionada"
            })
        }

        return { image }
    } catch (error: any) {
        if(error) throw error

        throw createError({
            statusCode: 500,
            statusMessage: "Erro ao tentar conexão com o servidor."
        })
    }
})