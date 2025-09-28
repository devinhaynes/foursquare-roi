import { MdDeleteSweep, MdImportExport, MdSave } from "react-icons/md";
import { PageHeader } from "../components/PageHeader";

const PropertiesPage = () => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const castFormat = (n: number) => formatter.format(n);
  const fakeProperties = {
    property_cost: castFormat(100000),
    rent: castFormat(1000),
    additional_income: castFormat(0),
    total_income: castFormat(1000),
    tax: castFormat(0),
    insurance: castFormat(0),
    utilities: castFormat(0),
    vacancy: {
      value: castFormat(30),
      selector: "auto",
    },
    monthly_repairs: {
      value: castFormat(80),
      selector: "auto",
    },
    capex: {
      value: castFormat(80),
      selector: "auto",
    },
    property_management: {
      value: castFormat(100),
      selector: "auto",
    },
    mortgage: castFormat(600),
    other: castFormat(0),
    total_expenses: castFormat(890),
    down_payment: {
      value: 20000,
      selector: "auto",
    },
    closing_costs: {
      value: 5000,
      selector: "auto",
    },
    repairs: 0,
    monthly_cashflow: castFormat(110),
    annual_cashflow: castFormat(1320),
    roi: 5.28,
  };

  return (
    <div className="font-sans flex flex-col gap-8 mb-20 relative min-h-screen md:mr-4">
      <PageHeader
        header="properties"
        toolbar={[
          { icon: MdImportExport, name: "import", action: () => {} },
          { icon: MdSave, name: "save", action: () => {} },
          { icon: MdDeleteSweep, name: "delete", action: () => {} },
        ]}
      />
      <div className="flex flex-wrap gap-4 px-2 md:px-0">
        <div className="flex flex-col gap-4 p-4 bg-white dark:bg-zinc-950 outline-1 outline-zinc-300 dark:outline-zinc-800 rounded-lg max-w-[30em] md:dark:shadow-[0_0_8px_-2px_#1e1e1e] md:shadow-[0_0_12px_#c3c3c3]">
          <div className="flex justify-between ">
            <h2 className="text-lg ">House 1</h2>
            <p
              className={`px-2 py-1 rounded-lg ${
                fakeProperties.roi > 0
                  ? "bg-emerald-400 dark:bg-emerald-700"
                  : fakeProperties.roi < 0
                  ? "bg-rose-400 dark:bg-rose-700"
                  : "bg-zinc-200 dark:bg-zinc-800"
              }`}
            >
              {fakeProperties.roi}%
            </p>
          </div>
          <div>
            <div className="flex flex-wrap gap-4">
              <div>
                <p>Monthly Income</p>
                <p>{fakeProperties.total_income}</p>
              </div>
              <div>
                <p>Monthly Expenses</p>
                <p>{fakeProperties.total_expenses}</p>
              </div>
              <div>
                <p>Monthly Cashflow</p>
                <p>{fakeProperties.monthly_cashflow}</p>
              </div>
              <div>
                <p>Annual Cashflow</p>
                <p>{fakeProperties.total_income}</p>
              </div>
              <div>
                <p>Total Investments</p>
                <p>
                  {castFormat(
                    fakeProperties.repairs +
                      fakeProperties.closing_costs.value +
                      fakeProperties.down_payment.value
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 p-4 bg-white dark:bg-zinc-950 outline-1 outline-zinc-300 dark:outline-zinc-800 rounded-lg max-w-[30em] md:dark:shadow-[0_0_8px_-2px_#1e1e1e] md:shadow-[0_0_12px_#c3c3c3]">
          <div className="flex justify-between ">
            <h2 className="text-lg ">House 2</h2>
            <p
              className={`px-2 py-1 rounded-lg ${
                fakeProperties.roi > 0
                  ? "bg-emerald-400 dark:bg-emerald-700"
                  : fakeProperties.roi < 0
                  ? "bg-rose-400 dark:bg-rose-700"
                  : "bg-zinc-200 dark:bg-zinc-800"
              }`}
            >
              {fakeProperties.roi}%
            </p>
          </div>

          <div>
            <div className="flex flex-wrap gap-4">
              <div>
                <p>Monthly Income</p>
                <p>{fakeProperties.total_income}</p>
              </div>
              <div>
                <p>Monthly Expenses</p>
                <p>{fakeProperties.total_expenses}</p>
              </div>
              <div>
                <p>Monthly Cashflow</p>
                <p>{fakeProperties.monthly_cashflow}</p>
              </div>
              <div>
                <p>Annual Cashflow</p>
                <p>{fakeProperties.total_income}</p>
              </div>
              <div>
                <p>Total Investments</p>
                <p>
                  {castFormat(
                    fakeProperties.repairs +
                      fakeProperties.closing_costs.value +
                      fakeProperties.down_payment.value
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 p-4 bg-white dark:bg-zinc-950 outline-1 outline-zinc-300 dark:outline-zinc-800 rounded-lg max-w-[30em] md:dark:shadow-[0_0_8px_-2px_#1e1e1e] md:shadow-[0_0_12px_#c3c3c3]">
          <div className="flex justify-between ">
            <h2 className="text-lg ">House 3</h2>
            <p
              className={`px-2 py-1 rounded-lg ${
                fakeProperties.roi > 0
                  ? "bg-emerald-400 dark:bg-emerald-700"
                  : fakeProperties.roi < 0
                  ? "bg-rose-400 dark:bg-rose-700"
                  : "bg-zinc-200 dark:bg-zinc-800"
              }`}
            >
              {fakeProperties.roi}%
            </p>
          </div>

          <div>
            <div className="flex flex-wrap gap-4">
              <div>
                <p>Monthly Income</p>
                <p>{fakeProperties.total_income}</p>
              </div>
              <div>
                <p>Monthly Expenses</p>
                <p>{fakeProperties.total_expenses}</p>
              </div>
              <div>
                <p>Monthly Cashflow</p>
                <p>{fakeProperties.monthly_cashflow}</p>
              </div>
              <div>
                <p>Annual Cashflow</p>
                <p>{fakeProperties.total_income}</p>
              </div>
              <div>
                <p>Total Investments</p>
                <p>
                  {castFormat(
                    fakeProperties.repairs +
                      fakeProperties.closing_costs.value +
                      fakeProperties.down_payment.value
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 p-4 bg-white dark:bg-zinc-950 outline-1 outline-zinc-300 dark:outline-zinc-800 rounded-lg max-w-[30em] md:dark:shadow-[0_0_8px_-2px_#1e1e1e] md:shadow-[0_0_12px_#c3c3c3]">
          <div className="flex justify-between ">
            <h2 className="text-lg ">House 4</h2>
            <p
              className={`px-2 py-1 rounded-lg ${
                fakeProperties.roi > 0
                  ? "bg-emerald-400 dark:bg-emerald-700"
                  : fakeProperties.roi < 0
                  ? "bg-rose-400 dark:bg-rose-700"
                  : "bg-zinc-200 dark:bg-zinc-800"
              }`}
            >
              {fakeProperties.roi}%
            </p>
          </div>

          <div>
            <div className="flex flex-wrap gap-4">
              <div>
                <p>Monthly Income</p>
                <p>{fakeProperties.total_income}</p>
              </div>
              <div>
                <p>Monthly Expenses</p>
                <p>{fakeProperties.total_expenses}</p>
              </div>
              <div>
                <p>Monthly Cashflow</p>
                <p>{fakeProperties.monthly_cashflow}</p>
              </div>
              <div>
                <p>Annual Cashflow</p>
                <p>{fakeProperties.total_income}</p>
              </div>
              <div>
                <p>Total Investments</p>
                <p>
                  {castFormat(
                    fakeProperties.repairs +
                      fakeProperties.closing_costs.value +
                      fakeProperties.down_payment.value
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertiesPage;
