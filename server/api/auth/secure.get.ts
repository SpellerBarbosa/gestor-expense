import { getCookie } from "#imports";
import jwt, { JwtPayload } from "jsonwebtoken";
import envVar from "~/server/utils/common/env";

export default defineEventHandler(async (event) => {
  const token = getCookie(event, "token");
  const secret = envVar("SECRET");

  if (!token) {
    throw createError({
      statusCode: 400,
      statusMessage: "Token nao fornecido",
    });
  }

  try {
    const decoded = jwt.verify(token, secret) as jwt.JwtPayload;


    return {
      logado: true,
      decoded,
    };
  } catch (error: any) {
    if (error.statusCode) throw error;

    console.error(error);

    throw createError({
      statusCode: 500,
      statusMessage: "Erro ao se conectar com o servidor.",
    });
  }
});
