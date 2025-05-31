<script setup lang="ts">
import Card from "./Card.vue";
import { watchEffect } from "vue";
import useProfileStore from "~/store/useProfileStore";
import useExpenseStore from "~/store/useStoreExpense";
import clearMessages from "~/composables/clearMessages";
import type { IExpense } from "~/server/utils/interfaces/interfaces";
import api from "~/server/utils/axios/api";

const useProfile = useProfileStore();
const userId = useProfile._id;
const date = new Date();
const primaryDay = new Date(date.getFullYear(), date.getMonth(), 1)
  .toISOString()
  .slice(0, 10);
const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)
  .toISOString()
  .slice(0, 10);
const dateInitial = ref<string>(primaryDay);
const dateFinally = ref<string>(lastDay);
const useExpense = useExpenseStore();
useExpense.dateInitial = dateInitial.value;
useExpense.dateFinally = dateFinally.value;
useExpense.userId = userId;

watch(
  [dateInitial, dateFinally],
  () => {
    useExpense.dateInitial = dateInitial.value;
    useExpense.dateFinally = dateFinally.value;
    useExpense.userId = userId;

    if (useExpense.userId) {
      useExpense.searchExpenses();
    }
  },
  { immediate: true }
);
</script>
<template>
  <section class="w-[90%] h-[350px] flex flex-col overflow-hidden mt-5">
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
        <input type="date" id="date-initial" v-model="dateInitial" />
      </label>
      <label for="date-finally" class="flex flex-col">
        <span>data final: </span>
        <input type="date" id="date-finally" v-model="dateFinally" />
      </label>
    </div>
    <section class="flex flex-wrap gap-2.5">
      <Card
        category="Cartões"
        :fullValue="useExpense.valueCard"
        class="bg-blue-400 text-white"
      />
      <Card
        category="Alimentação"
        :fullValue="useExpense.valueFood"
        class="bg-green-300"
      />
      <Card
        category="Casa"
        :fullValue="useExpense.valueHome"
        class="bg-yellow-300"
      />
      <Card
        category="Outras"
        :fullValue="useExpense.valueOthers"
        class="bg-gray-300"
      />
    </section>
  </section>
</template>
