import connectToDB from "~/server/utils/db/ConnectToDB";
import User from "~/server/utils/schemas/userSchema";
import comparePassword from "~/server/utils/auth/comparePassword";
import jwt from "jsonwebtoken";
import variableAmbient from "~/server/utils/common/env";
import { setCookie } from "#imports";

export default defineEventHandler(async (event) => {
  await connectToDB();
  const SECRET = variableAmbient("SECRET");

  const { user, password } = await readBody(event);

  if (!user) {
    throw createError({
      statusCode: 400,
      statusMessage: "Usuário é obrigatório.",
    });
  }

  if (!password) {
    throw createError({
      statusCode: 400,
      statusMessage: "Senha é obrigatório.",
    });
  }

  try {
    const userExist = await User.findOne({ user }).lean();

    if (!userExist) {
      throw createError({
        statusCode: 400,
        statusMessage: "Usuário não cadastrado.",
      });
    }

    const isMatch = await comparePassword(password, userExist.password);

    if (!isMatch) {
      throw createError({
        statusCode: 400,
        statusMessage: "Senha invalida.",
      });
    }

    const token = jwt.sign(
      { _id: userExist._id.toString(), name: userExist.name, user: userExist.user },
      SECRET
    );

    setCookie(event, 'token', token, {
        httpOnly: true,
        secure:false,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24
    })

    return {
      message: "Login efetuado com sucesso.",
    };
  } catch (error: any) {
    if(error.statusCode) throw error;

    console.error(error.message)

    throw createError({
        statusCode: 500,
        statusMessage:"Conexão com servidor indisponível, tente novamente mais tarde."
    })
  }
});
