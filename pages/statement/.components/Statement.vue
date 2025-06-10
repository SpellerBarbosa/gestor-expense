<script setup lang="ts">
import { ref } from "vue";
import api from "~/server/utils/axios/api";
import useProfileStore from "~/store/useProfileStore";
import { formatDate, formateValue, formatPayment, formatCategory } from "#imports";
import { computed } from "vue";
import jspdf, { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

const date = new Date();
const primaryDay = new Date(date.getFullYear(), date.getMonth(), 1)
  .toISOString()
  .slice(0, 10);
const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)
  .toISOString()
  .slice(0, 10);
const dateInitial = ref<string>(primaryDay);
const dateFinally = ref<string>(lastDay);
const useProfile = useProfileStore();
const expenses = ref()
const category = ref<string>('')
const filteredExpenses = computed(()=>{
  if(!category.value) return expenses.value || [];
  return(expenses.value || []).filter(
    (e: any) => e.category === category.value
  )
})


onMounted(async () => {
  const response = await api.post("/expense/search", {
    userId: useProfile._id,
    dateInitial: dateInitial.value,
    dateFinally: dateFinally.value,
  });

  const data = response.data;
  expenses.value = data.expenses
});

const generetePDF = () =>{
  const doc = new jsPDF();

  doc.text("Relatorio de Despesas", 14, 10);

  const rows = filteredExpenses.value.map((exp: any) =>[
    formatDate(exp.date),
    exp.description,
    formateValue(exp.value),
    formatPayment(exp.payment),
    formatCategory(exp.category)
  ]);

  autoTable(doc, {
    head:[["Date", "Descrição", "Valor", "Pagamento", "Categoria"]],
    body: rows,
    startY: 20
  });

  doc.save("relatorio_despesas.pdf");
};

</script>
<template>
  <section class="w-screen h-[80vh] lg:h-[100vh] mb-[10vh] overflow-auto">

    <h1 class="w-[100%] h-20 text-center text-4xl uppercase mt-[25px] font-bold tracking-wider text-shadow-2xs italic font-poppins mb-[25px]">Relatorio de despesas</h1>

    <article class="w-full h-[50px] flex justify-evenly items-center gap-">
      <label for="dateInitial">
        <span>De: </span>
        <input type="date" placeholder="DD/MM/AAAA" v-model="dateInitial" />
      </label>
      <label for="dateInitial">
        <span>Até: </span>
        <input type="date" placeholder="DD/MM/AAAA" v-model="dateFinally" />
      </label>
    </article>
    <table class="w-[100%] uppercase text-[12px] text-center table-fixed border-collapse: border-separate lg:text-[15px]">
      <thead class="w-[95%]">
        <tr class="h-10">
          <th class="w-1/5">data</th>
          <th class="w-1/5">descrição</th>
          <th class="w-1/5">valor</th>
          <th class="w-1/5">PG</th>
          <th class="w-1/5">
            <select name="filter" id="filter" v-model="category" class="w-1/5" >
              <option value="" selected>Filtrar</option>
              <option :value="expense.category" v-for="(expense, index) in expenses" :key="index">{{ formatCategory(expense.category) }}</option>
            </select>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="h-12 odd:bg-gray-300" v-for="(expense, index) in filteredExpenses" :key="index">
          <td>{{ formatDate(expense.date) }}</td>
          <td>{{ expense.description }}</td>
          <td>{{ formateValue(expense.value) }}</td>
          <td>{{ formatPayment(expense.payment) }}</td>
          <td class="overflow-hidden">{{ formatCategory(expense.category) }}</td>
        </tr>
      </tbody>
    </table>
    <button @click="generetePDF" class=" bg-blue-500 text-white font-semibold px-4 py-2 rounded ml-[50%] -translate-x-[50%] mt-[20px] mb-[20px]">
      Baixar PDF
    </button>
  </section>
</template>
