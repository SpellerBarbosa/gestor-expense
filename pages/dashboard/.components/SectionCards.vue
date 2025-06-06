<script setup lang="ts">
import Card from "./Card.vue";
import useProfileStore from "~/store/useProfileStore";
import useExpenseStore from "~/store/useStoreExpense";

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
  <section
    class="w-[90%] h-[350px] flex flex-col overflow-hidden mt-5 lg:h-[400px]"
  >
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
        <input type="date" id="date-initial" v-model="dateInitial" class="" />
      </label>
      <label for="date-finally" class="flex flex-col">
        <span>até: </span>
        <input type="date" id="date-finally" v-model="dateFinally" />
      </label>
    </div>
    <section class="flex flex-wrap gap-2.5 mb-[50px]">
      <Card
        category="Consorcio & Financiamentos"
        icon="account_balance"
        iconStyle="rounded-full p-2 bg-blue-200 shadow-md lg:rounded-none lg:p-0 lg:shadow-none lg:bg-transparent"
        color="lg:bg-blue-200 text-blue-500 border-none lg:shadow-md shadow-blue-200"
        :fullValue="useExpense.valueFinancingAndConsortium"
        class="bg-gray-50"
      />
      <Card
        category="Alimentação"
        icon="restaurant"
        iconStyle="rounded-full p-2 bg-green-200 shadow-md lg:rounded-none lg:p-0 lg:shadow-none lg:bg-transparent"
        color="lg:bg-green-200 text-green-600 border-none lg:shadow-md shadow-green-200 text-[8px]"
        :fullValue="useExpense.valueFood"
        class="bg-gray-50"
      />
      <Card
        category="Casa"
        icon="house"
        iconStyle="rounded-full p-2 bg-purple-200 shadow-md lg:rounded-none lg:p-0 lg:shadow-none lg:bg-transparent"
        color="lg:bg-purple-200 border-none text-purple-600 lg:shadow-md shadow-purple-200"
        :fullValue="useExpense.valueHome"
        class="bg-gray-50"
      />
      <Card
        category="Outras"
        icon="storefront"
        iconStyle="rounded-full p-2 bg-yellow-200 shadow-md lg:rounded-none lg:p-0 lg:shadow-none lg:bg-transparent"
        color="lg:bg-yellow-100 border-none text-yellow-600 lg:shadow-md shadow-yellow-200"
        :fullValue="useExpense.valueOthers"
        class="bg-gray-50"
      />
      <Card
        category="Lazer"
        icon="beach_access"
        iconStyle="rounded-full p-2 bg-red-200 lg:rounded-none lg:p-0 lg:shadow-none lg:bg-transparent"
        color="lg:bg-red-200 border-none text-red-500 text-shadow-lg lg:shadow-md shadow-red-200"
        :fullValue="useExpense.valueLeisure"
        class="bg-gray-50"
      />
    </section>
  </section>
</template>
