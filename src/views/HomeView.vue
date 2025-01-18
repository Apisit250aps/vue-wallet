<script setup lang="ts">
import { useTransactionStore, type ITransaction } from "@/stores/transaction"
import Swal from "sweetalert2"
import { ref } from "vue"
const statements = useTransactionStore()
const { addTransaction, deleteTransaction } = statements
const form = ref<Partial<ITransaction>>({
  amount: 0,
  type: "expense",
  category: "",
  description: ""
})

const modal = ref<HTMLDialogElement>()

const thaiDate = (date: Date) => {
  const event = new Date(date)

  // Thai uses Buddhist calendar and 24-hour time
  return event.toLocaleString("th-TH", { timeZone: "Asia/Bangkok" })
  // Expected output: "20/12/2555, 03:00:00"
}

const handleSubmit = async (e: Event) => {
  e.preventDefault()
  modal.value!.close()
  const response = await addTransaction(form.value as ITransaction)

  if (!response) return

  const { status, message } = response
  Swal.fire({
    title: message,
    icon: status as "success" | "error",
    confirmButtonText: "Okay"
  })
  if (status == "success") {
    form.value = {
      amount: 0,
      type: "expense",
      category: "",
      description: ""
    }
  }
}
</script>

<template>
  <dialog id="my_modal_3" class="modal" ref="modal">
    <div class="modal-box">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
      </form>
      <h3 class="text-lg font-bold">Transaction</h3>
      <form @submit="handleSubmit">
        <label class="form-control w-full">
          <div class="label">
            <span class="label-text">Amount</span>
          </div>
          <input
            type="number"
            placeholder="Type here"
            class="input input-bordered w-full"
            v-model="form.amount"
            min="0"
          />
        </label>
        <label class="form-control w-full">
          <div class="label">
            <span class="label-text">Type</span>
          </div>
          <select class="input input-bordered w-full" v-model="form.type">
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </label>
        <label class="form-control w-full">
          <div class="label">
            <span class="label-text">Category</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            class="input input-bordered w-full"
            v-model="form.category"
            list="cats"
          />
          <datalist id="cats" class="z-[50]">
            <option
              v-for="(item, index) in statements.category"
              :key="index"
              :value="item"
            >
              {{ item }}
            </option>
          </datalist>
        </label>

        <label class="form-control w-full">
          <div class="label">
            <span class="label-text">Description (optional)</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            class="input input-bordered w-full"
            v-model="form.description"
          />
        </label>
        <div class="text-right mt-3">
          <button class="btn btn-outline bg-green-400 text-white">Save</button>
        </div>
      </form>
    </div>
  </dialog>

  <div class="card">
    <div class="card-body">
      <div class="card-title flex justify-between">
        <h3>Transactions</h3>
        <div class="card-actions">
          <button class="btn btn-outline" onclick="my_modal_3.showModal()">
            <i class="bx bx-message-square-add"></i>
          </button>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="table">
          <!-- head -->
          <thead>
            <tr>
              <th>#</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Category</th>
              <th class="hidden lg:block">Description</th>
              <th>Date Time</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in statements.transactions" :key="index">
              <th>{{ index + 1 }}</th>
              <td>{{ item.amount }}</td>
              <td>
                <div
                  class="badge text-white"
                  :class="{
                    'badge-error': item.type === 'expense',
                    'badge-success': item.type === 'income'
                  }"
                >
                  {{ item.type }}
                </div>
              </td>
              <td>
                <div class="badge badge-outline">
                  {{ item.category || "untitled" }}
                </div>
              </td>
              <td class="hidden lg:block">{{ item.description }}</td>
              <td>{{ thaiDate(item.created_at) }}</td>
              <td>
                <button
                  class="btn btn-error btn-outline hover:text-white"
                  @click="deleteTransaction(item.id)"
                >
                  <i class="bx bx-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>