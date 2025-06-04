<script setup lang="ts">
import { ref } from "vue";
import Error from "~/components/common/Error.vue";
import Success from "~/components/common/Success.vue";
import clearMessages from "~/composables/clearMessages";
import api from "~/server/utils/axios/api";
import useProfileStore from "~/store/useProfileStore";
import stateMenuStore from "~/store/stateMenuStore";
import useExpenseStore from "~/store/useStoreExpense";

const description = ref<string>("");
const value = ref<string>("");
const category = ref<string>("");
const payment = ref<string>("");
const msgError = ref<string>("");
const msgSuccess = ref<string>("");
const useProfile = useProfileStore();
const userId = useProfile._id;
const systemDate = new Date().toISOString().slice(0, 10);
const selectDate = ref<string>(systemDate);
const stateMenu = stateMenuStore();
const expense = useExpenseStore();
const isLoading = ref<boolean>(false);

const handlerSubmitExpense = async () => {
  const formatValue = value.value.replace(",", ".");
  const realValue = Number(formatValue).toFixed(2);
  const date = new Date(selectDate.value);

  if (!description.value) {
    msgError.value = "Coloque a descrição da despesa";
    clearMessages(msgError);
    return;
  }

  if (!value.value || isNaN(Number(realValue))) {
    msgError.value = "digite um numero";
    clearMessages(msgError);
    return;
  }

  if (!payment.value) {
    msgError.value = "Digite o método de pagamento da despesa";
    clearMessages(msgError);
    return;
  }

  if (!category.value) {
    msgError.value = "Escolha uma categoria";
    clearMessages(msgError);
    return;
  }

  if (!userId) {
    msgError.value = "Faça login novamente, token vencido";
    clearMessages(msgError);
    return;
  }

  try {
    isLoading.value = true

    const response = await api.post("/expense/create", {
      description: description.value.toLowerCase().trim(),
      value: realValue,
      category: category.value.toLowerCase().trim(),
      payment: payment.value.toLowerCase().trim(),
      userId: userId,
      date: date.toISOString(),
    });
    const data = response.data;
    msgSuccess.value = data.message;
    description.value = "";
    value.value = "";
    payment.value = "";
    category.value = "";
    expense.searchExpenses();
    clearMessages(msgSuccess);
    setTimeout(() => {
      isLoading.value = false
    }, 2500);
  } catch (error: any) {
    isLoading.value = false
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
    :class="[
      stateMenu.menu
        ? 'w-[95%] h-[70vh] flex flex-col items-center justify-evenly bg-blue-800 rounded-4xl md:w-[60%] absolute bottom-0 mb-[12vh] transition-all duration-1000 opacity-100 lg:w-[50%] lg:h-[70%] lg:bottom-auto lg:rounded-4xl'
        : 'transition-all duration-200 opacity-0 bottom-0 absolute lg:w-[70%] lg:h-[100vh] lg:bottom-auto lg:rounded-none pointer-events-none',
    ]"
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
    <label for="payment" class="flex flex-col gap-2 w-[90%]">
      <span class="uppercase tracking-[2px] font-semibold text-white"
        >Método pagamento</span
      >
          <select name="payment" id="payment" v-model="payment" class="outline-none border-b-2 border-white text-center text-lg text-white uppercase tracking-wider font-semibold bg-blue-800">
            <option value="" disabled selected>escolha uma opção</option>
            <option value="card">Cartão</option>
            <option value="money">Dinheiro</option>
            <option value="pix">pix</option>
            <option value="cheque">cheque</option>
          </select>
    </label>
    <label for="date" class="w-[90%] h-[40px] flex items-center justify-evenly">
      <span class="uppercase font-semibold tracking-[2px] text-white"
        >Data:
      </span>
      <input
        type="date"
        name="date"
        id="date"
        class="text-white tracking-[2px] font-semibold border-b-1"
        v-model="selectDate"
      />
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
      class="uppercase w-[120px] h-[50px] rounded-xl bg-[#ffffff] font-semibold tracking-wider border-none flex items-center justify-center"
      :disabled="isLoading"
    >
      {{ isLoading ? "Salvando" : "salvar" }}
      <svg
        class="w-4 h-4 animate-spin ml-2"
        :class="isLoading ? 'block':'hidden'"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
    </button>
    <Error :message="msgError" :visible="!!msgError" />
    <Success :message="msgSuccess" :visible="!!msgSuccess" />
    <button
      class="border w-[30px] h-[30px] border-white absolute top-5 right-5 grid place-items-center"
      @click="stateMenu.stateMenu()"
    >
      <span
        class="w-[100%] h-0.5 block bg-white rotate-45 translate-y-[7px] origin-center"
      ></span>
      <span
        class="w-[100%] h-0.5 block bg-white -rotate-45 -translate-y-[7px] origin-center"
      ></span>
    </button>
  </main>
</template>
