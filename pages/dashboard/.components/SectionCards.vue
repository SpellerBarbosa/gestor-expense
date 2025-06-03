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
  <section class="w-[90%] h-[350px] flex flex-col overflow-hidden mt-5 lg:h-[400px]">
    <h1
      class="text-2xl uppercase w-full h-[20%] text-center font-bold italic tracking-wider mb-[30px]"
    >
      Despesas
    </h1>
    <div
      id="container-dates"
      class="w-full uppercase mb-[20px] flex justify-evenly items-center lg:justify-start gap-10"
    >
      <label for="date-initial" class="flex flex-col">
        <span>De: </span>
        <input type="date" id="date-initial" v-model="dateInitial" class=""/>
      </label>
      <label for="date-finally" class="flex  flex-col">
        <span>até: </span>
        <input type="date" id="date-finally" v-model="dateFinally" />
      </label>
    </div>
    <section class="flex flex-wrap gap-2.5">
      <Card
        category="Cartões"
        icon="credit_card"
        color="bg-blue-200 text-blue-500 border-none shadow-md shadow-blue-200"
        :fullValue="useExpense.valueCard"
        class="bg-gray-50"
      />
      <Card
        category="Alimentação"
        icon="restaurant"
        color="bg-green-200 text-green-600 border-none shadow-md shadow-green-200 text-[8px]"
        :fullValue="useExpense.valueFood"
        class="bg-gray-50"
      />
      <Card
        category="Casa"
        icon="house"
        color="bg-purple-200 border-none text-purple-600 shadow-md shadow-purple-200"
        :fullValue="useExpense.valueHome"
        class="bg-gray-50"
      />
      <Card
        category="Outras"
        icon="storefront"
        color="bg-yellow-100 border-none text-yellow-600 shadow-md shadow-yellow-200"
        :fullValue="useExpense.valueOthers"
        class="bg-gray-50"
      />
    </section>
  </section>
</template>
