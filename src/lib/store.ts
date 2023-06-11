import { writable, get as getStore } from "svelte/store";

export const roi = writable({
  'house-info': {
    'house-cost': {
      value: 0,
      hasPercentage: false
    }
  },
  income: {
    rent: {
      value: 0,
      hasPercentage: false
    },
    'additional-income': {
      value: 0,
      hasPercentage: false
    }
  },
  expenses: {
    tax: {
      value: 0,
      hasPercentage: false
    },
    insurance: {
      value: 0,
      hasPercentage: false
    },
    utilities: {
      value: 0,
      hasPercentage: false
    },
    vacancy: {
      value: 0,
      hasPercentage: true,
      percentageBasedOn: {
        square: "house-info",
        key: "house-cost"
      },
      percentage: 10
    },
    repairs: {
      value: 0,
      hasPercentage: true,
      percentageBasedOn: {
        square: "income",
        key: "rent"
      },
      percentage: 10
    },
    'capital-expenditures': {
      value: 0,
      hasPercentage: true,
      percentageBasedOn: {
        square: "income",
        key: "rent"
      },
      percentage: 10
    },
    'property-manager': {
      value: 0,
      hasPercentage: true,
      percentageBasedOn: {
        square: "income",
        key: "rent"
      },
      percentage: 10
    },
    mortgage: {
      value: 0,
      hasPercentage: false
    },
    other: {
      value: 0,
      hasPercentage: false
    }
  },
  cashflow: {
    'monthly-income': {
      get value() {return Object.values(getStore(roi).income).map((entry: {value: number, hasPercentage: boolean}) => entry.value).reduce((a: number, b: number) => a + b)},
      hasPercentage: false
    },
    'monthly-expenses': {
      get value() {return Object.values(getStore(roi).expenses).map((entry: {value: number, hasPercentage: boolean}) => entry.value).reduce((a: number, b: number) => a + b)},
      hasPercentage: false
    }
  },
  'cash-on-cash-roi': {
    'down-payment': {
      value: 0,
      hasPercentage: false
    },
    'closing-costs': {
      value: 0,
      hasPercentage: false
    },
    repairs: {
      value: 0,
      hasPercentage: false
    }
  }
});