import apiClient, { type IResponse } from "@/api/client"
import { AxiosError } from "axios"
import { defineStore } from "pinia"
import { computed, onMounted, ref } from "vue"
export interface ITransaction {
  id: string
  amount: number
  description: string
  type: string
  category: string
  created_at: Date
  updated_at: Date
}

export const useTransactionStore = defineStore("transaction", () => {
  const transactions = ref<ITransaction[]>([])
  const amount = computed(() =>
    transactions.value.reduce((sum, transaction) => {
      return (
        sum +
        (transaction.type === "income"
          ? transaction.amount
          : -transaction.amount)
      )
    }, 0)
  )

  const category = computed(() => [
    ...new Set(transactions.value.map((t) => t.category))
  ])
  
  onMounted(async () => {
    await fetchTransactions()
  })

  const fetchTransactions = async (): Promise<void> => {
    try {
      const response = await apiClient.get<IResponse<ITransaction[]>>(
        "/api/transactions"
      )
      const { data } = response

      // Update transactions if data is available

      if (data?.data) {
        const today = new Date().toISOString().split("T")[0] // Get today's date in 'YYYY-MM-DD' format

        // Filter transactions created today and reverse the order
        transactions.value = data.data
          .filter((transaction) =>
            transaction.created_at.toString().startsWith(today)
          )
          .reverse()
      } else {
        console.warn("No transactions found.")
      }
    } catch (error) {
      console.error("Error fetching transactions:", error)
    }
  }

  const addTransaction = async (
    transaction: ITransaction
  ): Promise<IResponse<ITransaction> | null> => {
    try {
      const response = await apiClient.post<IResponse<ITransaction>>(
        "/api/transactions",
        transaction
      )
      await fetchTransactions()
      return response.data
    } catch (error) {
      console.error(error)
      if (error instanceof AxiosError && error.response) {
        return error.response.data
      }
      return null
    }
  }

  const deleteTransaction = async (id: string): Promise<void> => {
    try {
      // ส่งคำขอเพื่อลบข้อมูลใน API
      await apiClient.delete(`/api/transactions/${id}`)

      // ลบรายการออกจาก `transactions` ในหน่วยความจำ
      transactions.value = transactions.value.filter(
        (transaction) => transaction.id !== id
      )

      console.log(`Transaction with ID ${id} deleted successfully.`)
    } catch (error) {
      console.error("Error deleting transaction:", error)
    }
  }

  const updateTransaction = async (
    transaction: ITransaction
  ): Promise<IResponse<ITransaction> | null> => {
    try {
      const response = await apiClient.put<IResponse<ITransaction>>(
        `/api/transactions/${transaction.id}`,
        transaction
      )

      await fetchTransactions()
      return response.data
    } catch (error) {
      console.error(error)
      if (error instanceof AxiosError && error.response) {
        return error.response.data
      }
      return null
    }
  }

  return {
    transactions,
    amount,
    category,
    fetchTransactions,
    addTransaction,
    deleteTransaction,
    updateTransaction
  }
})