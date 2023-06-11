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
      <NumberInput
        value={$roi[square][squareKey].value}
        {square}
        key={squareKey}
        name={squareKey}
        hasPercentage={$roi[square][squareKey].hasPercentage}
        percentageBasedOn={$roi[square][squareKey].percentageBasedOn}
        percentageValue={$roi[square][squareKey].percentage || 10}
      />
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
    display: flex;
    flex-direction: column;
    gap: 2em;
  }
</style>
