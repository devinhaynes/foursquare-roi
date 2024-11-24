<script lang="ts">
  export let square;

  import { roi } from "./store";
  import NumberInput from "./NumberInput.svelte";

  function capitalize(value: string) {
    // Split string by hyphen
    let stringArr = value.split("-");
    stringArr = stringArr.map((str) => {
      const firstLetter = str.charAt(0);
      const remainingLetters = str.slice(1);
      return firstLetter.toUpperCase() + remainingLetters;
    });
    return stringArr.join(" ");
  }
</script>

<form action="">
  {#each Object.keys($roi[square]) as squareKey}
    <div class="form-group">
      <label for={squareKey.toLowerCase()}>{capitalize(squareKey)}</label>
      <NumberInput {square} key={squareKey} name={squareKey} />
    </div>
  {/each}
</form>

<style>
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  }

  form {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
    margin-inline: auto;
  }
</style>
