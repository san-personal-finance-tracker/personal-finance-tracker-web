import React from "react";
import ListTransaction from "../components/ListTransaction";
import { useEffect, useState } from "react";
import { FinanceService } from "../services/finance.service";
import type {
  FilterFormData,
  TransactionsResponse,
} from "../types/transactionType";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { FloatLabel } from "primereact/floatlabel";
import { useForm, Controller } from "react-hook-form";
import { Inplace, InplaceContent, InplaceDisplay } from "primereact/inplace";
import { InputText } from "primereact/inputtext";
import FinoButton from "../components/FinoButton";
import { useTransactionsStore } from "../store/transaction.store";

const AllTransactions: React.FC = () => {
  const { transactions, nextCursor, setInitial, append, reset } =
    useTransactionsStore();

  // Initialize React Hook Form
  const { control, watch, setValue } = useForm<FilterFormData>({
    defaultValues: {
      type: "all",
      category: "all",
      sort: "desc",
    },
  });

  // Watch form values
  const watchedType = watch("type");
  const watchedCategory = watch("category");
  const watchedSort = watch("sort");
  const watchedSearch = watch("search");

  const typeOptions = [
    { label: "All", value: "all" },
    { label: "Income", value: "INCOME" },
    { label: "Expense", value: "EXPENSE" },
  ];
  const sortOptions = [
    { label: "Ascending", value: "asc" },
    { label: "Descending", value: "desc" },
  ];
  const expenseCategoryOptions = [
    { label: "All", value: "all" },
    { label: "Food", value: "food" },
    { label: "Transport", value: "transport" },
    { label: "Shopping", value: "shopping" },
    { label: "Entertainment", value: "entertainment" },
    { label: "Others", value: "others" },
  ];
  const incomeCategoryOptions = [
    { label: "All", value: "all" },
    { label: "Salary", value: "salary" },
    { label: "Freelance", value: "freelance" },
    { label: "Investment", value: "investment" },
    { label: "Others", value: "others" },
  ];
  const fetchTransactionsWithCursor = async ({
    type,
    category,
    sort,
    search,
    cursor,
  }: {
    type?: string | null;
    category?: string | null;
    sort?: string | null;
    search?: string | null;
    cursor?: string | null;
  }) => {
    const params: any = {
      limit: 3,
      sort: sort || "desc",
    };

    if (cursor) params.cursor = cursor;
    if (type && type !== "all") params.type = type;
    if (category && category !== "all") params.category = category;
    if (search) params.search = search;

    return FinanceService.getTransactionsWithCursor(params);
  };
  useEffect(() => {
    const loadInitial = async () => {
      reset();

      const { data } = await fetchTransactionsWithCursor({
        type: watchedType,
        category: watchedCategory,
        sort: watchedSort,
        search: watchedSearch,
      });

      setInitial(data.data, data?.meta?.nextCursor);
    };

    loadInitial();
  }, [watchedType, watchedCategory, watchedSort, watchedSearch]);

  const handleDelete = async (id: string) => {
    try {
      await FinanceService.deleteTransaction(id);
    } catch (error) {
      console.error("Failed to delete transaction", error);
    }
  };
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  console.log(transactions);
  console.log(nextCursor);
  const handleLoadMore = async () => {
    if (!nextCursor) return;

    const { data } = await fetchTransactionsWithCursor({
      type: watchedType,
      category: watchedCategory,
      sort: watchedSort,
      search: watchedSearch,
      cursor: nextCursor,
    });

    append(data.data, data?.meta?.nextCursor);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="pb-6 text-lg font-medium!">All Transactions</h2>
        {/* <p className="text-gray-500">{data?.meta?.total} transactions</p> */}
      </div>
      <div className="rounded-2xl border border-[#d1d5db] transition-all duration-200 p-4 flex flex-col gap-8 bg-white">
        <div className="flex items-center justify-between gap-2 h-[40px]">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <i className="pi pi-filter font-medium! bg-[#4478fc] text-white text-sm! rounded-lg p-2 w-[40px] h-[40px] flex! items-center! justify-center!" />
              <div>
                <p className="font-medium text-sm">Filters</p>
                <p className="text-xs text-gray-500">
                  Filter your transactions
                </p>
              </div>
            </div>
            <i
              className="pi pi-refresh cursor-pointer text-[#4478fc] bg-[#eff6ff] rounded-lg p-2 flex! items-center! justify-center! w-[40px] h-[40px]"
              onClick={() => {
                setValue("type", "all");
                setValue("category", "all");
                setValue("sort", "desc");
                setValue("search", "");
              }}
            ></i>
          </div>
          <Inplace
            closable
            onClose={() => {
              setValue("search", "");
            }}
          >
            <InplaceDisplay>
              <span
                className="inline-flex items-center gap-2 cursor-pointer
               text-[#4478fc] rounded-lg select-none"
              >
                <i className="pi pi-search text-sm!" />
                <span className="text-xs leading-none">Search</span>
              </span>
            </InplaceDisplay>

            <InplaceContent>
              <InputText
                className="h-[40px]!"
                value={watchedSearch}
                onChange={(e) => setValue("search", e.target.value)}
                autoFocus
              />
            </InplaceContent>
          </Inplace>
        </div>
        <div className="flex justify-between items-center gap-2 flex-wrap">
          <div className="w-[30%]">
            <FloatLabel>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <Dropdown
                    id="type-filter"
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e.value);
                      setValue("category", "all");
                    }}
                    options={typeOptions}
                    optionLabel="label"
                    className="w-full"
                  />
                )}
              />
              <label htmlFor="type-filter">Type</label>
            </FloatLabel>
          </div>
          <div className="w-[30%]">
            <FloatLabel>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Dropdown
                    id="category-filter"
                    value={field.value}
                    onChange={(e) => field.onChange(e.value)}
                    options={
                      watchedType === "EXPENSE"
                        ? expenseCategoryOptions
                        : incomeCategoryOptions
                    }
                    optionLabel="label"
                    className="w-full"
                  />
                )}
              />
              <label htmlFor="category-filter">Category</label>
            </FloatLabel>
          </div>
          <div className="w-[30%]">
            <FloatLabel>
              <Controller
                name="sort"
                control={control}
                render={({ field }) => (
                  <Dropdown
                    id="sort-filter"
                    value={field.value}
                    onChange={(e) => field.onChange(e.value)}
                    options={sortOptions}
                    optionLabel="label"
                    className="w-full"
                  />
                )}
              />
              <label htmlFor="sort-filter">Sort</label>
            </FloatLabel>
          </div>
        </div>
      </div>
      <ListTransaction
        transactions={transactions}
        formatDate={formatDate}
        handleDelete={handleDelete}
      />
      {nextCursor && (
        <div className="flex justify-center">
          <FinoButton
            variant="secondary"
            label="Load More"
            className="mt-3!"
            onClick={handleLoadMore}
          />
        </div>
      )}
    </div>
  );
};

export default AllTransactions;
