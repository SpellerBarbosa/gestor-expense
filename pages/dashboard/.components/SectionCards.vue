<script setup lang="ts">
import Card from "./Card.vue";
import { watchEffect } from "vue";
import useProfileStore from "~/store/useProfileStore";
import clearMessages from "~/composables/clearMessages";
import type { IExpense } from "~/server/utils/interfaces/interfaces";
import api from "~/server/utils/axios/api";

const useProfile = useProfileStore();
const userId = useProfile._id;
const allExpenses = ref<IExpense[]>([]);
const msgError = ref<string>("");
const valueCard = ref<string>("0");
const valueHome = ref<string>("0");
const valueFood = ref<string>("0");
const valueOther = ref<string>("0");
const date = new Date();
const primaryDay = new Date(date.getFullYear(), date.getMonth(), 1).toISOString().slice(0, 10);
const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString().slice(0, 10);
const dateInitial = ref<string>(primaryDay);
const dateFinally = ref<string>(lastDay)




watchEffect(async () => {
  if (!userId) {
    msgError.value = "Token invalido, ou expirado";
    console.error(msgError.value);
    return;
  }

  try {
    const response = await api.post("/expense/search", {
      userId: userId,
      dateInitial,
      dateFinally
    });

    const data = response.data.expenses;

    allExpenses.value = data;
    valueCard.value = allExpenses.value
      .filter((e) => e.category === "card")
      .reduce((sum, e) => sum + e.value, 0)
      .toFixed(2);
    valueHome.value = allExpenses.value
      .filter((e) => e.category === "home")
      .reduce((sum, e) => sum + e.value, 0)
      .toFixed(2);
    valueFood.value = allExpenses.value
      .filter((e) => e.category === "food")
      .reduce((sum, e) => sum + e.value, 0)
      .toFixed(2);
    valueOther.value = allExpenses.value
      .filter((e) => e.category === "other")
      .reduce((sum, e) => sum + e.value, 0)
      .toFixed(2);

    console.log(valueCard.value);
  } catch (error: any) {
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message;

      if (status >= 400) {
        msgError.value = message;
        console.error(msgError.value);
        return;
      }

      if (status >= 500) {
        msgError.value = message;
        console.error(msgError.value);
      }
    } else {
      msgError.value = "Erro desconhecido, tente novamente mais tarde.";
      console.error(msgError.value);
    }
  }
});
</script>
<template>
  <section class="w-[90%] flex flex-col overflow-hidden mt-5">
    <h1
      class="text-2xl uppercase w-full h-[20%] text-center font-bold italic tracking-wider mb-[30px]"
    >
      Despesas
    </h1>
    <div
      id="container-dates"
      class="w-full uppercase mb-[20px] flex justify-evenly items-center"
    >
      <label for="date-initial" class="flex flex-col">
        <span>Data inicial: </span>
        <input type="date" id="date-initial" v-model="dateInitial"/>
      </label>
      <label for="date-finally" class="flex flex-col">
        <span>data final: </span>
        <input type="date" id="date-finally" v-model="dateFinally"/>
      </label>
    </div>
    <section class="flex flex-wrap gap-2.5">
      <Card
        category="Cartões"
        :fullValue="valueCard"
        class="bg-blue-400 text-white"
      />
      <Card
        category="Alimentação"
        :fullValue="valueFood"
        class="bg-green-300"
      />
      <Card category="Casa" :fullValue="valueHome" class="bg-yellow-300" />
      <Card category="Outras" :fullValue="valueOther" class="bg-gray-300" />
    </section>
  </section>
</template>
