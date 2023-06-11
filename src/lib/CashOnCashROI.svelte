<script>
  import Form from "./Form.svelte";
  import { roi } from "./store";

  const cashOnCashRoi = $roi["investments"];
</script>

<div class="CashOnCashROI square">
  <h1 class="section-header">Investments</h1>
  <Form square="investments" />
</div>
