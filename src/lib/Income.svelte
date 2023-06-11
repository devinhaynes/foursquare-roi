<script>
  import Form from "./Form.svelte";
  import { roi } from "./store";

  const { income } = $roi;
</script>

<div class="Income square">
  <h1 class="section-header">Income</h1>
  <Form square="income" />
</div>
