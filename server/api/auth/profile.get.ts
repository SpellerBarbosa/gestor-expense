import { getCookie } from "#imports";
import jwt from "jsonwebtoken";
import variableAmbient from "~/server/utils/common/env";

export default defineEventHandler(async (event) => {
  const token = getCookie(event, "token");
  const secret = variableAmbient("SECRET");


  if (!token) {
    throw createError({
      statusCode: 400,
      statusMessage: "Token não fornecido",
    });
  }

  try {
    const decoded = jwt.verify(token, secret) as jwt.JwtPayload;

    if (
      !decoded ||
      typeof decoded !== "object" ||
      !decoded.user ||
      !decoded.name
    ) {
      throw createError({
        statusCode: 401,
        statusMessage: "Token inválido ou incompleto",
      });
    }

    return {
      _id: decoded._id,
      user: decoded.user,
      name: decoded.name,
    };
  } catch (error) {
    console.error("Error ao verificar token: ", error);

    throw createError({
      statusCode: 401,
      statusMessage: "Token invalido",
    });
  }
});
