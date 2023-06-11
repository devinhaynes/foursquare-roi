<script>
  import Form from "./Form.svelte";
  import { roi } from "./store";

  const { cashflow } = $roi;
</script>

<div class="CashFlow square">
  <h1 class="section-header">Cash Flow</h1>
  <Form square="cashflow" />
</div>
