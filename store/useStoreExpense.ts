import { defineStore } from "pinia";
import api from "~/server/utils/axios/api";

const useExpenseStore = defineStore("Expense", {
  state: () => ({
    dateInitial: undefined as string | undefined,
    dateFinally: undefined as string | undefined,
    userId: undefined as string | undefined,
    expenses: [] as any[],
    valueCard: "0" as string,
    valueHome: "0" as string,
    valueFood: "0" as string,
    valueOthers: "0" as string,
  }),
  actions: {
    async searchExpenses() {
      try {
        const response = await api.post("/expense/search", {
          userId: this.userId,
          dateInitial: this.dateInitial,
          dateFinally: this.dateFinally
        });

        const data = response.data.expenses;
        this.expenses = data;

        const submitCategory = (category: string): string => {
          return this.expenses
            .filter((e) => e.category === category)
            .reduce((sum, e) => sum + e.value, 0)
            .toFixed(2);
        };

        this.valueCard = submitCategory("card");
        this.valueHome = submitCategory("home");
        this.valueFood = submitCategory("food");
        this.valueOthers = submitCategory("other");
      } catch (error: any) {
        if (error.response) {
          const status = error.response.status;
          const message = error.response.data?.message;

          if (status >= 400 && status < 500) {
            console.error(message);
            return;
          }

          if (status >= 500) {
            console.error(message);
            return;
          }
        } else {
          console.error(
            "Erro desconhecido ao conectar o servidor tente novamente mais tarde.",
            error
          );
        }
      }
    },
  },
});

export default useExpenseStore;
