import connectToDB from "~/server/utils/db/ConnectToDB";
import User from "~/server/utils/schemas/userSchema";
import hashPassword from "~/server/utils/auth/hashPassword";

export default defineEventHandler(async (event) => {
  await connectToDB();

  const { name, user, password, confirm_password } = await readBody(event);

  if (!name) {
    throw createError({
      statusCode: 400,
      statusMessage: "O campo nome é obrigatório",
    });
  }

  if (!user) {
    throw createError({
      statusCode: 400,
      statusMessage: "Campo usuário é obrigatório.",
    });
  }

  if (!password) {
    throw createError({
      statusCode: 400,
      statusMessage: "Campo senha é obrigatório.",
    });
  }

  if (!confirm_password) {
    throw createError({
      statusCode: 400,
      statusMessage: "Confirme sua senha",
    });
  }

  if (password !== confirm_password) {
    throw createError({
      statusCode: 400,
      statusMessage: "as senha não sao iguais",
    });
  }

  try {
    const userExist = await User.findOne({ user }).lean();

    if (userExist) {
      throw createError({
        statusCode: 400,
        statusMessage: "Usuário ja cadastrado",
      });
    }

    const hash = await hashPassword(password);

    const newUser = await User.create({
      name: name.toLowerCase().trim(),
      user: user.toLowerCase().trim(),
      password: hash.trim(),
    });

    return {
      message: "Usuário cadastrado com sucesso.",
    };
  } catch (error: any) {
    if (error.statusCode) throw error;

    console.error(error);

    throw createError({
      statusCode: 500,
      statusMessage:
        "Houve uma falha ao se conectar com o servidor, tente novamente mais tarde.",
    });
  }
});
