<script setup lang="ts">
import useExpenseStore from "~/store/useStoreExpense";
const expenseStore = useExpenseStore();
import { formatCategory, formatPayment, formateValue } from "#imports";

watchEffect(() => {
  if (!expenseStore.expenses) {
    expenseStore.searchExpenses();
  }
});

const expenses = computed(() => expenseStore.expenses);

const formatDate = (date: string) => {
  const formatDate = date.slice(0, 10);
  const day = formatDate.split("-")[2];
  const month = formatDate.split("-")[1];
  const year = formatDate.split("-")[0];
  return `${day}/${month}/${year}`;
};
</script>
<template>
  <section class="w-[90%] h-[400px] flex flex-col items-center mt-[20px]  mb-[30px] overflow-y-auto">
    <h1
      class="uppercase font-semibold italic text-xl tracking-wider mb-[15px] bg-gray-100"
    >
      Histórico de despesas
    </h1>

    <table class="w-full border-collapse border-none text-xs">
      <thead>
        <tr class="w-full">
          <th class="w-1/4 uppercase">Data</th>
          <th class="w-1/4 uppercase">Lançamento</th>
          <th class="w-1/4 uppercase">valor</th>
          <th class="w-1/4">
            <span class="material-symbols-outlined">edit</span>
          </th>
        </tr>
      </thead>
      <tbody
        class="odd:bg-gray-200"
        v-for="(expense, index) in expenses"
        :key="index"
      >
        <tr class="text-center uppercase font-semibold">
          <td class="py-2 whitespace-nowrap overflow-hidden text-ellipsis">
            {{ formatDate(expense.date) }}
          </td>
          <td class="py-2 whitespace-nowrap overflow-hidden text-ellipsis">
            {{ expense.description }} <br> {{ formatPayment(expense.payment) }}
          </td>
          <td class="py-2 whitespace-nowrap overflow-hidden text-ellipsis">
            R$ {{ formateValue(expense.value) }}
          </td>
          <td>
          <span class="material-symbols-outlined"><nuxt-link :to="`/dashboard/edit-expense/${expense._id}`">settings</nuxt-link></span>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
<style scoped>
.material-symbols-outlined {
  font-size: small;
}
</style>
