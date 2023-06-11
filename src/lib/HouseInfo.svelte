<script>
  import Form from "./Form.svelte";
</script>

<div class="HouseInfo square">
  <h1 class="section-header">House Info</h1>
  <Form square="house-info" />
  <form action="">
    <div class="form-group">
      <label for="">Street Address</label><input type="text" />
    </div>
    <div class="form-group">
      <label for="">City</label><input type="text" />
    </div>
    <div class="form-group">
      <label for="">State</label><input type="text" />
    </div>
    <div class="form-group">
      <label for="">Zip</label><input type="text" />
    </div>
    <div class="form-group">
      <label for="">Link</label><input type="text" />
    </div>
  </form>
</div>

<style>
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2em;
  }
</style>
