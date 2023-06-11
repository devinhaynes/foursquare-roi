<script>
  import Form from "./Form.svelte";
  import NumberInput from "./NumberInput.svelte";
  import { roi } from "./store";

  // const { income, expenses } = $roi;

  // const incomeValue = Object.values(income).reduce((a, b) => a + b);
  // const expensesValue = Object.values(expenses).reduce((a, b) => a + b);
  console.log($roi);
</script>

<div class="CashFlow square">
  <h1 class="section-header">Cash Flow</h1>
  <Form square="cashflow" />
  <!-- <form action="">
    <div class="form-group">
      <label for="cashflow-income">Monthly Income</label>
      <NumberInput
        value={incomeValue}
        square="CashFlow"
        name="cashflow-income"
        disabled
      />
    </div>
    <div class="form-group">
      <label for="cashflow-expenses">Monthly Expenses</label>
      <NumberInput
        value={expensesValue}
        square="CashFlow"
        name="cashflow-expenses"
        disabled
      />
    </div>
  </form> -->
</div>
