import connectToDB from "~/server/utils/db/ConnectToDB";
import cloudinary from "~/server/utils/auth/cloudnary";
import User from "~/server/utils/schemas/userSchema";
import { readFormData } from "#imports";

export default defineEventHandler(async (event) => {
  await connectToDB();

  const formData = await readFormData(event);
  const image = formData.get("image") as File | null;
  const userId = formData.get("userId") as string | null;

  if (!userId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Id do usuario nao informado",
    });
  }

  if (!image) {
    throw createError({
      statusCode: 400,
      statusMessage: "Imagem não enviada ou arquivo invalido",
    });
  }

  try {
    const buffer = Buffer.from(await image.arrayBuffer());


    const uploadFromBuffer = (buffer: Buffer) => {
      return new Promise<any>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: `user_avatar/${userId}`,
            use_filename: true,
            unique_filename: false,
            overwrite: true,
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        uploadStream.end(buffer);
      });
    };

    const uploadResult = await uploadFromBuffer(buffer)

    await User.findByIdAndUpdate(userId, { image: uploadResult.secure_url });

    return {
      message: "upload realizado com sucesso",
      url: uploadResult.secure_url,
    };
  } catch (error: any) {
    if (error.statusCode) throw error;

    console.error(error);

    throw createError({
      statusCode: 500,
      statusMessage: "Erro desconhecido ao tentar conexão com o servidor",
    });
  }

});