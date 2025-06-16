<script lang="ts" setup>
	import { useRoute } from 'vue-router';
	import { onMounted } from 'vue';
	import api from '~/server/utils/axios/api';
	import { ref } from 'vue';
	import Profile from '~/components/layouts/Profile.vue';
	import Menu from '~/components/layouts/Menu.vue';
	import Error from '~/components/common/Error.vue';
	import Success from '~/components/common/Success.vue';
	import clearMessages from '~/composables/clearMessages';
	import useSendRedirect from '~/composables/sendRedirect';

	const route = useRoute();
	const id = route.params.id;
	const edit = ref<boolean>(true);
	const save = ref<boolean>(false);
	const excluded = ref<boolean>(false);
	const msgError = ref<string>('');
	const msgSuccess = ref<string>('');
	const isLoading = ref<boolean>(false);
	const isLoadingUpdate = ref<boolean>(false);
	const { sendRedirect } = useSendRedirect();
	const expense = ref({
		date: '',
		description: '',
		payment: '',
		value: '',
		category: '',
	});

	onMounted(async () => {
		try {
			const response = await api.get(`/expense/edit/${id}`);
			const data = response.data;

			expense.value.date = data.expense.date.slice(0, 10);
			expense.value.description = data.expense.description;
			expense.value.payment = data.expense.payment;
			expense.value.value = data.expense.value.toFixed(2);
			expense.value.category = data.expense.category;
		} catch (error) {}
	});

	const handleEdit = () => {
		edit.value = !edit.value;
		save.value = !save.value;
	};

	const handleDeleteExpense = async () => {
		isLoading.value = true;

		try {
			const response = await api.delete('/expense/exclude-expense', {
				data: { id: id },
			});

			const data = response.data;
			msgSuccess.value = data.message;
			clearMessages(msgSuccess);
			sendRedirect('/dashboard');
		} catch (error: any) {
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
				msgError.value =
					'Erro desconhecido, tente novamente mais tarde';
				clearMessages(msgError);
			}
		}
	};

	const handleUpdateExpense = async () => {
		if (
			!id ||
			!expense.value.description ||
			!expense.value.value ||
			!expense.value.payment ||
			!expense.value.date ||
			!expense.value.category
		) {
			msgError.value = 'Todos os campos devem ser preenchidos';
			clearMessages(msgError);
			return;
		}

		if (isNaN(Number(expense.value.value.replace(',', '.')))) {
			msgError.value = 'Digite um valor real';
			clearMessages(msgError);
			return;
		}

		const numberValue = Number(expense.value.value.replace(',', '.'));

		try {
			isLoadingUpdate.value = true;

			const response = await api.put('/expense/edit', {
				id,
				description: expense.value.description.trim().toLowerCase(),
				value: numberValue,
				payment: expense.value.payment.trim().toLowerCase(),
				date: expense.value.date,
				category: expense.value.category.trim().toLowerCase(),
			});

			const data = response.data.message;
			msgSuccess.value = data;
			clearMessages(msgSuccess);
			sendRedirect('/dashboard');
		} catch (error: any) {
			isLoadingUpdate.value = false;

			console.error(error);

			if (error.response) {
				const status = error.response.status;
				const message = error.response.data?.message;

				if (status >= 400) {
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
				msgError.value =
					'Erro desconhecido ao tentar conexão com o servidor, tente novamente mais tarde';
				clearMessages(msgError);
			}
		}
	};
</script>
<template>
	<main
		class="w-screen h-screen flex flex-col items-center bg-gray-200 lg:w-[calc(100%-15%)] lg:ml-[15%] lg:justify-center relative"
	>
		<Profile class="lg:hidden" />
		<Menu />
		<section
			class="w-[100%] h-[60vh] flex flex-col items-center mt-[30px] lg:w-[40%]"
		>
			<form
				class="w-[90%] h-[100%] bg-blue-600 rounded-3xl flex flex-col items-center justify-evenly lg:shadow-2xl lg:shadow-blue-500 text-white font-semibold"
			>
				<label
					class="w-[80%] flex flex-col gap-3"
					for="date"
				>
					<span
						class="uppercase font-semibold tracking-wider text-white"
						>Data Lançamento:
					</span>
					<input
						class="border-b border-white outline-none focus:border-green-300"
						:disabled="edit"
						type="date"
						v-model="expense.date"
					/>
				</label>
				<label
					class="w-[80%] flex flex-col gap-3"
					for="descryption"
				>
					<span
						class="uppercase font-semibold tracking-wider text-white"
						>Descrição</span
					>
					<input
						class="border-b border-white outline-none focus:border-green-300"
						:disabled="edit"
						type="text"
						v-model="expense.description"
					/>
				</label>
				<label
					class="w-[80%] flex flex-col gap-3"
					for="payment"
				>
					<span
						class="uppercase font-semibold tracking-wider text-white"
						>Método Pagamento</span
					>
					<select
						name="payment"
						id="payment"
						v-model="expense.payment"
						class="outline-none border-b-2 border-white text-center text-lg text-white uppercase tracking-wider font-semibold bg-blue-600"
						:disabled="edit"
					>
						<option value="card">Cartão</option>
						<option value="money">Dinheiro</option>
						<option value="pix">pix</option>
						<option value="cheque">cheque</option>
					</select>
				</label>
				<label
					class="w-[80%] flex flex-col gap-3"
					for="value"
				>
					<span
						class="uppercase font-semibold tracking-wider text-white"
						>valor</span
					>
					<input
						class="border-b border-white outline-none focus:border-green-300"
						:disabled="edit"
						type="text"
						v-model="expense.value"
					/>
				</label>
				<select
					name="category"
					id="category"
					class="w-[50%] uppercase p-2 font-semibold text-white bg-blue-600 text-center"
					:disabled="edit"
					v-model="expense.category"
				>
					<option
						selected
						value=""
					>
						Selecione uma categoria
					</option>
					<option value="food">Alimentação</option>
					<option value="home">Casa</option>
					<option value="financing-and-consortium">
						Financiamento / Consorcio
					</option>
					<option value="leisure">Lazer</option>
					<option value="other">Outras</option>
				</select>
				<div class="flex gap-5">
					<button
						class="w-[150px] h-[50px] uppercase tracking-wider font-semibold bg-yellow-600 rounded-2xl text-white cursor-pointer"
						:class="save ? 'hidden' : 'block'"
						type="button"
						@click.prevent="handleEdit"
					>
						editar
					</button>
					<button
						class="w-[150px] h-[50px] uppercase tracking-wider font-semibold cursor-pointer"
						:class="
							save
								? 'flex items-center justify-center bg-green-600 text-white rounded-2xl text-shadow-2xs '
								: 'hidden'
						"
						type="button"
						@click="handleUpdateExpense"
					>
						{{ isLoadingUpdate ? 'salvando' : 'salvar' }}
						<svg
							class="w-4 h-4 animate-spin ml-3"
							:class="isLoadingUpdate ? 'block' : 'hidden'"
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
					<button
						class="w-[150px] h-[50px] uppercase tracking-wider font-semibold bg-red-700 rounded-2xl text-white flex items-center justify-center transition-all duration-500 cursor-pointer"
						type="button"
						:disabled="isLoading"
						@click="handleDeleteExpense"
					>
						{{ isLoading ? 'excluindo' : 'excluir' }}
						<svg
							class="w-4 h-4 animate-spin ml-3"
							:class="isLoading ? 'block' : 'hidden'"
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
				</div>
			</form>
			<Error
				:message="msgError"
				:visible="!!msgError"
			/>
			<Success
				:message="msgSuccess"
				:visible="!!msgSuccess"
			/>
		</section>
	</main>
</template>
