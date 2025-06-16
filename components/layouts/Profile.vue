<script setup lang="ts">
import useProfileStore from "~/store/useProfileStore";
import api from "~/server/utils/axios/api";
import imagemDefault from "~/assets/img/profile.png";

const useProfile = useProfileStore();
const name = useProfile.name;
const userId = useProfile._id;
const inputFile = ref<HTMLInputElement | null>(null);
const image = ref<string>("");

function handleClickImage() {
  inputFile.value?.click();
}

async function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (!file) {
    console.error("Arquivo nao encontrado ou  invalido");
    return;
  }

  if (file && file.type.startsWith("image")) {
    const reader = new FileReader();

    const formData = new FormData();
    formData.append("image", file);
    formData.append("userId", String(userId));

    reader.onload = () =>{
      image.value = reader.result  as string
    }
    
    reader.readAsDataURL(file);

    try {
      const response = await api.post("/user/upload", formData);
      const data = response.data.message;
      console.log(data)
    } catch (error: any) {
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.message;

        if (status >= 400 && status < 500) {
          console.error(message);
          return;
        }

        if (status >= 500) {
          console.error(message);
          return;
        }
      } else {
        console.error(error);
      }
    } finally {
    }

  }
}

onMounted(async()=>{
  try {
    const response = await api.post("/user/image",{
      id: userId
    });
    const data = response.data.image.image
    image.value = `${data}?t=${Date.now()}`;
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <section
    class="w-[95%] h-[20vh] mt-[20px] bg-blue-600 rounded-3xl grid place-items-center lg:bg-[#ffffff3b] lg:w-full lg:h-[30vh] lg:flex lg:flex-col lg:items-center lg:justify-evenly lg:border-1 lg:border-gray-300 lg:mt-auto lg:rounded-none"
  >
    <div
      class="w-[90%] h-full grid grid-cols-3 place-items-center grid-rows-2 lg:flex lg:flex-col lg:justify-evenly"
    >
      <figure
        class="w-[100px] h-[100px] col-start-1 row-start-1 row-span-2 grid place-items-center rounded-full relative overflow-hidden shadow-md shadow-black xl:w-[150px] xl:h-[150px]"
      >
        <img
          :src="image || imagemDefault"
          alt="icon de imagem vazia"
          ref="selectImage"
          class="w-full h-full"
        />
        <input
          type="file"
          accept="image/*"
          class="hidden"
          ref="inputFile"
          @change="handleFileChange"
        />
        <button
          class="bg-gray-700 absolute w-full h-[25px] bottom-0 flex items-center justify-center cursor-pointer"
          @click="handleClickImage"
        >
          <span class="material-symbols-outlined"> add_a_photo </span>
        </button>
      </figure>
      <p
        class="col-start-2 col-span-2 grid place-items-center capitalize font-semibold tracking-wider text-white lg:text-black"
      >
        Bem vindo!
      </p>
      <h1
        class="col-start-2 col-span-2 grid text-center row-start-2 w-full capitalize text-sm font-bold text-white tracking-wider lg:text-black lg:text-sm"
      >
        {{ `${name}` }}
      </h1>
    </div>
  </section>
</template>
<style scoped>
.material-symbols-outlined {
  font-size: 20px;
  color: white;
}
</style>
