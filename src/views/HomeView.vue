<script setup lang="ts">
import { ref } from "vue"

const form = ref<{
  amount: number
  type: string
  category: string
  description?: string
}>({
  amount: 0,
  type: "expense",
  category: "utilities",
  description: ""
})
</script>

<template>
  <dialog id="my_modal_3" class="modal">
    <div class="modal-box">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
      </form>
      <h3 class="text-lg font-bold">Transaction</h3>
      <form>
        <label class="form-control w-full">
          <div class="label">
            <span class="label-text">What is your name?</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            class="input input-bordered w-full"
            v-model="form.amount"
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
          <select class="input input-bordered w-full" v-model="form.category">
            <option value="utilities" selected>Utilities</option>
            <option value="rent">Rent</option>
            <option value="groceries">Groceries</option>
          </select>
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
          <button class="btn" onclick="my_modal_3.showModal()">
            <i class="bx bx-message-square-add"></i>
          </button>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="table">
          <!-- head -->
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
            </tr>
          </thead>
          <tbody>
            <!-- row 1 -->
            <tr class="bg-base-200">
              <th>1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Blue</td>
            </tr>
            <!-- row 2 -->
            <tr>
              <th>2</th>
              <td>Hart Hagerty</td>
              <td>Desktop Support Technician</td>
              <td>Purple</td>
            </tr>
            <!-- row 3 -->
            <tr>
              <th>3</th>
              <td>Brice Swyre</td>
              <td>Tax Accountant</td>
              <td>Red</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
