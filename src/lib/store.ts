import { writable, get as getStore, type Writable } from "svelte/store";
import { type User } from "firebase/auth";

const defaultValues = {value: null,
hasPercentage: false,
isPercentage: false,
percentageBasedOn: null,
percentage: 0,
usePercentage: false,
disabled: false}

export const roi = writable({
  'house-info': {
    'house-cost': defaultValues
  },
  income: {
    rent: defaultValues,
    'additional-income': defaultValues
  },
  expenses: {
    tax: defaultValues,
    insurance: defaultValues,
    utilities: defaultValues,
    vacancy: {
      value: null,
      hasPercentage: true,
      percentageBasedOn: {
        square: "house-info",
        key: "house-cost"
      },
      usePercentage: true,
      isPercentage: false,
      percentage: 1,
      disabled: false
    },
    repairs: {
      value: null,
      hasPercentage: true,
      percentageBasedOn: {
        square: "income",
        key: "rent"
      },
      usePercentage: true,
      percentage: 10,
      isPercentage: false,
      disabled: false
    },
    'capital-expenditures': {
      value: null,
      hasPercentage: true,
      percentageBasedOn: {
        square: "income",
        key: "rent"
      },
      usePercentage: true,
      percentage: 10
    },
    'property-manager': {
      value: null,
      hasPercentage: true,
      percentageBasedOn: {
        square: "income",
        key: "rent"
      },
      usePercentage: true,
      percentage: 10
    },
    mortgage: {
      value: null,
      hasPercentage: false
    },
    other: {
      value: null,
      hasPercentage: false
    }
  },
  cashflow: {
    'monthly-income': {
      get value() {return Object.values(getStore(roi).income).map((entry: {value: number, hasPercentage: boolean}) => entry.value).reduce((a: number, b: number) => a + b)},
      hasPercentage: false,
      disabled: true
    },
    'monthly-expenses': {
      get value() {return Object.values(getStore(roi).expenses).map((entry: {value: number, hasPercentage: boolean}) => entry.value).reduce((a: number, b: number) => a + b)},
      hasPercentage: false,
      disabled: true
    },
    'monthly-cashflow': {
      get value() {return getStore(roi).cashflow['monthly-income'].value - getStore(roi).cashflow['monthly-expenses'].value},
      hasPercentage: false,
      disabled: true
    }
  },
  'investments': {
    'down-payment': {
      value: null,
      usePercentage: true,
      hasPercentage: true,
      percentageBasedOn: {
        square: "house-info",
        key: "house-cost"
      },
      percentage: 20
    },
    'closing-costs': {
      value: null,
      hasPercentage: false
    },
    repairs: {
      value: null,
      hasPercentage: false
    }
  },
  totals: {
    'annual-cashflow': {
      get value() {return (getStore(roi).cashflow["monthly-income"].value - getStore(roi).cashflow["monthly-expenses"].value) * 12},
      hasPercentage: false,
      disabled: true
    },
    'total-investment': {
      get value() {return Object.values(getStore(roi).investments).map((entry: {value: number, hasPercentage: boolean}) => entry.value).reduce((a: number, b: number) => a + b)},
      hasPercentage: false,
      disabled: true
    },
    'cash-on-cash-roi': {
      get value() {return ((getStore(roi).totals["annual-cashflow"].value / getStore(roi).totals["total-investment"].value) * 100).toFixed(2)},
      hasPercentage: false,
      isPercentage: true,
      disabled: true
    }
  }
});

export const user: Writable<User> = writable();