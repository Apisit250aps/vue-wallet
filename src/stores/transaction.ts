import apiClient from "@/api/client"
import { defineStore } from "pinia"
export interface ITransaction {
  id: string
  amount: number
  description: string
  type: string
  category: string
}
const useTransactionStore = defineStore("transaction", {
  state: () => ({
    transactions: []
  }),
  actions: {
    addTransactions: async (data: Partial<ITransaction>) => {
      const response = await apiClient({
        method: "POST",
        url: "/api/transactions",
        data: data
      })
      return
    }
  }
})