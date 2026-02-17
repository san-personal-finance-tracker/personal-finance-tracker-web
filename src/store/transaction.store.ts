import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { Transaction } from "../types/transactionType";

interface TransactionsStoreType {
  transactions: Transaction[];
  nextCursor: string | null;
  setInitial: (data: Transaction[], cursor: string | null) => void;
  append: (data: Transaction[], cursor: string | null) => void;
  reset: () => void;
}

export const useTransactionsStore = create<TransactionsStoreType>()(
  devtools((set) => ({
    transactions: [],
    nextCursor: null,

    setInitial: (data, cursor) =>
      set({
        transactions: data,
        nextCursor: cursor,
      }),

    append: (data, cursor) =>
      set((state) => ({
        transactions: [...state.transactions, ...data],
        nextCursor: cursor,
      })),

    reset: () =>
      set({
        transactions: [],
        nextCursor: null,
      }),
  })),
);
