<script lang="ts">
  import { roi } from "./store";

  export let name: string;
  export let hasPercentage: boolean = false;
  export let disabled: boolean = false;
  export let square = "";
  export let key = "";
  export let value = 0;
  export let percentageValue = 10;
  export let percentageBasedOn = {
    square: "income",
    key: "rent",
  };
  export let isPercentage = false;

  if (hasPercentage) {
    roi.set({
      ...$roi,
      [square]: {
        ...$roi[square],
        [key]: {
          ...$roi[square][key],
          value:
            $roi[percentageBasedOn.square][percentageBasedOn.key].value *
            (percentageValue * 0.01),
        },
      },
    });
  }

  function handleChange(e) {
    if (hasPercentage) {
      // Handle Infinity error when based-on value is 0
      percentageValue = Math.floor(
        (e.target.value /
          $roi[percentageBasedOn.square][percentageBasedOn.key].value) *
          100
      );

      if (percentageValue === Infinity) percentageValue = null;

      return roi.set({
        ...$roi,
        [square]: {
          ...$roi[square],
          [key]: {
            ...$roi[square][key],
            value: parseInt(e.target.value),
            percentage: percentageValue,
          },
        },
      });
    }

    roi.set({
      ...$roi,
      [square]: {
        ...$roi[square],
        [key]: { ...$roi[square][key], value: parseInt(e.target.value) },
      },
    });
  }

  function handlePercentageChange(e) {
    roi.set({
      ...$roi,
      [square]: {
        ...$roi[square],
        [key]: {
          ...$roi[square][key],
          value:
            $roi[percentageBasedOn.square][percentageBasedOn.key].value *
            (e.target.value * 0.01),
          percentage: e.target.value,
        },
      },
    });
  }
</script>

{#if hasPercentage}
  <div class="input-group">
    <div class="input">
      <span>$</span>
      <input
        {disabled}
        {value}
        on:change={handleChange}
        id={name}
        type="number"
      />
    </div>
    <div class="input">
      <input
        on:change={handlePercentageChange}
        class="percent"
        value={percentageValue}
        type="number"
        max={100}
      />
      <span>%</span>
    </div>
  </div>
{:else if isPercentage}
  <div class="input">
    <input {disabled} {value} class={name} type="number" />
    <span>%</span>
  </div>
{:else}
  <div class="input">
    <span>$</span>
    <input
      {disabled}
      {value}
      on:change={handleChange}
      class={name}
      type="number"
    />
  </div>
{/if}

<style>
  .input-group {
    display: flex;
    gap: 0.25rem;
  }

  .input {
    display: flex;
  }

  .input > span {
    background-color: white;
    color: var(--black);
    display: grid;
    place-content: center;
    padding: 0.25rem 0.5rem;
    border-right: 2px solid var(--black);
  }

  .percent {
    width: 60px;
  }

  input {
    text-align: right;
  }

  input[type="number"] {
    padding: 0.25rem 0.5rem;
    font-size: 1.5rem;
    border: none;
  }

  input:disabled {
    background-color: white;
  }
</style>
