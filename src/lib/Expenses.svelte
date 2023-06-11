<script>
  import Form from "./Form.svelte";
  import { roi } from "./store";

  const { expenses } = $roi;
</script>

<div class="Expenses square">
  <h1 class="section-header">Expenses</h1>
  <Form square="expenses" />
</div>
