<script setup lang="ts">
import useExpenseStore from '~/store/useStoreExpense';
const expenseStore = useExpenseStore()

const expenses = computed(()=> expenseStore.expenses);

console.log(expenses)
</script>
<template>
    <section class="border w-[90%] mt-[30px]">
        {{ expenses }}
    </section>
</template>