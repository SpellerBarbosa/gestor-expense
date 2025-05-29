<script setup lang="ts">
import { ref } from "vue";
import Error from "~/components/common/Error.vue";
import Success from "~/components/common/Success.vue";
import clearMessages from "~/composables/clearMessages";
import api from "~/server/utils/axios/api";
import useProfileStore from "~/store/useProfileStore";

const description = ref<string>("");
const value = ref<string>("");
const category = ref<string>("");
const msgError = ref<string>("");
const msgSuccess = ref<string>("");
const useProfile = useProfileStore();
const userId = useProfile._id;
const systemDate = new Date().toISOString().slice(0, 10);
const selectDate = ref<string>(systemDate);


const handlerSubmitExpense = async () => {
  const formatValue = value.value.replace(",", ".");
  const realValue = Number(formatValue).toFixed(2);
  const date = new Date(selectDate.value);

  if (!description.value) {
    msgError.value = "Coloque a descrição da despesa";
    clearMessages(msgError)
    return;
  }

  if (!value.value || isNaN(Number(realValue))) {
    msgError.value = "digite um numero";
    clearMessages(msgError);
    return;
  }

  if (!category.value) {
    msgError.value = "Escolha uma categoria";
    clearMessages(msgError);
    return;
  }
  
  console.log(date.toISOString())

  if (!userId) {
    msgError.value = "Faça login novamente, token vencido";
    clearMessages(msgError);
    return;
  }

  try {
    const response = await api.post("/expense/create", {
      description: description.value.toLowerCase().trim(),
      value: realValue,
      category: category.value.toLowerCase().trim(),
      userId: userId,
      date: date.toISOString()
    });
    const data = response.data;
    msgSuccess.value = data.message;
    clearMessages(msgSuccess);
  } catch (error: any) {
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message;

      if (status >= 400 && status < 500) {
        msgError.value = message;
        clearMessages(msgError);
        return;
      }

      if (status >= 500) {
        msgError.value = message;
        clearMessages(msgError);
        return;
      }
    } else {
      msgError.value = "Error desconhecido, tente novamente mais tarde.";
    }
  }
};
</script>
<template>
  <main
    class="w-[95%] h-[50vh] flex flex-col items-center justify-evenly bg-blue-800 rounded-4xl md:w-[60%]"
  >
    <label for="description" class="w-[90%] flex flex-col text-white gap-3">
      <span class="font-semibold uppercase tracking-[2px]">Descrição</span>
      <input
        type="text"
        name="description"
        id="description"
        placeholder="descrição"
        class="border-b-2 text-lg w-[calc(100%)] text-center outline-none"
        v-model="description"
      />
    </label>
    <label for="value" class="w-[90%] flex flex-col text-white gap-3">
      <span class="font-semibold uppercase tracking-[2px]">Valor</span>
      <div class="w-full flex">
        <p
          class="w-[50px] h-[30px] border-b-2 text-center tracking-[3px] font-bold bg-gray-900 grid place-items-center"
        >
          R$
        </p>
        <input
          type="text"
          name="value"
          id="value"
          placeholder="Digite o valor"
          class="border-b-2 text-lg w-[calc(100%-50px)] text-center outline-none"
          v-model="value"
        />
      </div>
    </label>
    <label for="date" class="w-[90%] h-[40px] flex items-center justify-evenly">
      <span class="uppercase font-semibold tracking-[2px] text-white">Data: </span>
      <input type="date" name="date" id="date" class="text-white tracking-[2px] font-semibold border-b-1" v-model="selectDate">
    </label>
    <select
      name="category"
      id="category"
      class="w-[70%] uppercase tracking-wider font-semibold text-gray-1000 border border-white text-center p-2"
      v-model="category"
    >
      <option value="" disabled selected>Escolha a categoria</option>
      <option value="card">Cartão</option>
      <option value="food">Alimentação</option>
      <option value="home">Casa</option>
      <option value="other">Outras</option>
    </select>
    <button
      @click.prevent="handlerSubmitExpense"
      class="uppercase w-[120px] h-[50px] rounded-xl bg-[#ffffff] font-semibold tracking-wider border-none"
    >
      salvar
    </button>
    <Error :message="msgError" :visible="!!msgError" />
    <Success :message="msgSuccess" :visible="!!msgSuccess" />
  </main>
</template>
