<script setup lang="ts">
import useExpenseStore from "~/store/useStoreExpense";
const expenseStore = useExpenseStore();

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
  <section class="w-[90%] h-[300px] flex flex-col items-center mt-[20px]">
    <h1 class="uppercase font-semibold italic text-xl tracking-wider mb-[15px] bg-gray-100">
      Histórico de despesas
    </h1>

    <table class="w-full border-collapse border-none">
      <thead>
        <tr class="w-full">
          <th class="w-1/4 uppercase text-left">Data</th>
          <th class="w-2/4 uppercase text-left">Lançamento</th>
          <th class="w-1/4 uppercase text-left">valor</th>
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
            {{ expense.description }}
          </td>
          <td class="py-2 whitespace-nowrap overflow-hidden text-ellipsis">
            R$ {{ expense.value.toFixed(2) }}
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
