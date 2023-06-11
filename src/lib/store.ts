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
      percentage: 1
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
  'investments': {
    'down-payment': {
      value: 0,
      hasPercentage: true,
      percentageBasedOn: {
        square: "house-info",
        key: "house-cost"
      },
      percentage: 20
    },
    'closing-costs': {
      value: 0,
      hasPercentage: false
    },
    repairs: {
      value: 0,
      hasPercentage: false
    }
  },
  totals: {
    'annual-cashflow': {
      get value() {return (getStore(roi).cashflow["monthly-income"].value - getStore(roi).cashflow["monthly-expenses"].value) * 12},
      hasPercentage: false
    },
    'total-investment': {
      get value() {return Object.values(getStore(roi).investments).map((entry: {value: number, hasPercentage: boolean}) => entry.value).reduce((a: number, b: number) => a + b)},
      hasPercentage: false
    },
    'cash-on-cash-roi': {
      get value() {return (getStore(roi).totals["annual-cashflow"].value / getStore(roi).totals["total-investment"].value) * 100},
      hasPercentage: false,
      isPercentage: true
    }
  }
});