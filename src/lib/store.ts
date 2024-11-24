import { writable, get as getStore, type Writable, get } from "svelte/store";
import { type User } from "firebase/auth";

type PercentageBasedOn = {
  square: string;
  key: string;
};

type InputValue = {
  value: number;
  hasPercentage: boolean;
  isPercentage: boolean;
  percentageBasedOn: PercentageBasedOn;
  percentage: number;
  usePercentage: boolean;
  disabled: boolean;
};

export type ROI = {
  "house-info": {
    "house-cost": InputValue;
  };
  income: {
    rent: InputValue;
    "additional-income": InputValue;
  };
  expenses: {
    tax: InputValue;
    insurance: InputValue;
    utilities: InputValue;
    vacancy: InputValue;
    repairs: InputValue;
    "capital-expenditures": InputValue;
    "property-manager": InputValue;
    mortgage: {
      value: number;
      hasPercentage: boolean;
    };
    other: {
      value: number;
      hasPercentage: boolean;
    };
  };
  cashflow: {
    "monthly-income": {
      value: number;
      hasPercentage: boolean;
      disabled: boolean;
    };
    "monthly-expenses": {
      value: number;
      hasPercentage: boolean;
      disabled: boolean;
    };
    "monthly-cashflow": {
      value: number;
      hasPercentage: boolean;
      disabled: boolean;
    };
  };
  investments: {
    "down-payment": {
      value: number;
      usePercentage: boolean;
      hasPercentage: boolean;
      percentageBasedOn: {
        square: string;
        key: string;
      };
      percentage: number;
    };
    "closing-costs": {
      value: number;
      hasPercentage: boolean;
    };
    repairs: {
      value: number;
      hasPercentage: boolean;
    };
  };
  totals: {
    "annual-cashflow": {
      value: number;
      hasPercentage: boolean;
      disabled: boolean;
    };
    "total-investment": {
      value: number;
      hasPercentage: boolean;
      disabled: boolean;
    };
    "cash-on-cash-roi": {
      value: string;
      hasPercentage: boolean;
      isPercentage: boolean;
      disabled: boolean;
    };
  };
};

const defaultInputs: InputValue = {
  value: null,
  hasPercentage: false,
  isPercentage: false,
  percentageBasedOn: null,
  percentage: 0,
  usePercentage: false,
  disabled: false,
};

export const roi: Writable<ROI> = writable<ROI>({
  "house-info": {
    "house-cost": defaultInputs,
  },
  income: {
    rent: defaultInputs,
    "additional-income": defaultInputs,
  },
  expenses: {
    tax: defaultInputs,
    insurance: defaultInputs,
    utilities: defaultInputs,
    vacancy: {
      value: null,
      hasPercentage: true,
      percentageBasedOn: {
        square: "house-info",
        key: "house-cost",
      },
      usePercentage: true,
      isPercentage: false,
      percentage: 1,
      disabled: false,
    },
    repairs: {
      value: null,
      hasPercentage: true,
      percentageBasedOn: {
        square: "income",
        key: "rent",
      },
      usePercentage: true,
      percentage: 10,
      isPercentage: false,
      disabled: false,
    },
    "capital-expenditures": {
      value: null,
      hasPercentage: true,
      percentageBasedOn: {
        square: "income",
        key: "rent",
      },
      usePercentage: true,
      percentage: 10,
      isPercentage: false,
      disabled: false,
    },
    "property-manager": {
      value: null,
      hasPercentage: true,
      percentageBasedOn: {
        square: "income",
        key: "rent",
      },
      usePercentage: true,
      percentage: 10,
      isPercentage: false,
      disabled: false,
    },
    mortgage: {
      value: null,
      hasPercentage: false,
    },
    other: {
      value: null,
      hasPercentage: false,
    },
  },
  cashflow: {
    "monthly-income": {
      get value() {
        return Object.values(getStore<ROI>(roi).income)
          .map(
            (entry: { value: number; hasPercentage: boolean }) => entry.value
          )
          .reduce((a: number, b: number) => a + b);
      },
      hasPercentage: false,
      disabled: true,
    },
    "monthly-expenses": {
      get value() {
        return Object.values(getStore<ROI>(roi).expenses)
          .map(
            (entry: { value: number; hasPercentage: boolean }) => entry.value
          )
          .reduce((a: number, b: number) => a + b);
      },
      hasPercentage: false,
      disabled: true,
    },
    "monthly-cashflow": {
      get value() {
        return (
          getStore(roi).cashflow["monthly-income"].value -
          getStore(roi).cashflow["monthly-expenses"].value
        );
      },
      hasPercentage: false,
      disabled: true,
    },
  },
  investments: {
    "down-payment": {
      value: null,
      usePercentage: true,
      hasPercentage: true,
      percentageBasedOn: {
        square: "house-info",
        key: "house-cost",
      },
      percentage: 20,
    },
    "closing-costs": {
      value: null,
      hasPercentage: false,
    },
    repairs: {
      value: null,
      hasPercentage: false,
    },
  },
  totals: {
    "annual-cashflow": {
      get value() {
        return (
          (getStore(roi).cashflow["monthly-income"].value -
            getStore(roi).cashflow["monthly-expenses"].value) *
          12
        );
      },
      hasPercentage: false,
      disabled: true,
    },
    "total-investment": {
      get value() {
        return Object.values(getStore(roi).investments)
          .map(
            (entry: { value: number; hasPercentage: boolean }) => entry.value
          )
          .reduce((a: number, b: number) => a + b);
      },
      hasPercentage: false,
      disabled: true,
    },
    "cash-on-cash-roi": {
      get value() {
        return (
          (getStore(roi).totals["annual-cashflow"].value /
            getStore(roi).totals["total-investment"].value) *
          100
        ).toFixed(2);
      },
      hasPercentage: false,
      isPercentage: true,
      disabled: true,
    },
  },
});

export const user: Writable<User> = writable();
