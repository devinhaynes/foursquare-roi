<script lang="ts">
  import { roi } from "./store";

  export let name: string;
  export let square = "";
  export let key = "";

  const input = $roi[square][key];

  const {
    hasPercentage,
    percentage,
    percentageBasedOn,
    usePercentage,
    isPercentage,
    disabled,
  } = input;

  let { value } = input;

  

  if (hasPercentage && usePercentage) {
    value =
      $roi[percentageBasedOn.square][percentageBasedOn.key].value *
      (percentage * 0.01);
    roi.set({
      ...$roi,
      [square]: {
        ...$roi[square],
        [key]: {
          ...$roi[square][key],
          value,
        },
      },
    });
  }

  function formatCurrency(value: number) {
    // Format decimal points without adding currency symbol
    return value.toLocaleString("en-US", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
  const formattedValue = formatCurrency(value || 0);

  function unformatCurrency(value: string) {
    return parseFloat(value.replace(/[^0-9.-]+/g, ""));
  }

  function handleChange(event: Event) {
    const target =  event.target as HTMLInputElement;
    const value = unformatCurrency(target.value);
    if (hasPercentage) {
      // Handle Infinity error when based-on value is 0
      let newPercentageValue = Math.floor(
        (value /
          $roi[percentageBasedOn.square][percentageBasedOn.key].value) *
          100
      );

      if (newPercentageValue === Infinity) newPercentageValue = null;

      return roi.set({
        ...$roi,
        [square]: {
          ...$roi[square],
          [key]: {
            ...$roi[square][key],
            value,
            percentage: newPercentageValue,
            usePercentage: false,
          },
        },
      });
    }

    roi.set({
      ...$roi,
      [square]: {
        ...$roi[square],
        [key]: {
          ...$roi[square][key],
          value,
          usePercentage: false,
        },
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
          usePercentage: true,
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
        value={formatCurrency($roi[square][key].value || 0)}
        on:change={handleChange}
        id={name}
        data-type="number"
      />
    </div>
    <div class="input">
      <input
        on:change={handlePercentageChange}
        class="percent"
        value={percentage}
        max={100}
        min={0}
        type="number"
      />
      <span>%</span>
    </div>
  </div>
{:else if isPercentage}
  <div class="input">
    <input {disabled} {value} class={name} />
    <span>%</span>
  </div>
{:else}
  <div class="input">
    <span>$</span>
    <input
      {disabled}
      value={formatCurrency($roi[square][key].value || 0)} 
      on:change={handleChange}
      class={name}
      data-type="number"
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
    border-radius: .25rem;
    overflow: hidden;
    max-width: 20ch;
  }

  .input > span {
    background-color: white;
    color: var(--black);
    display: grid;
    place-content: center;
    padding: 0.25rem;
  }

  .percent {
    width: 4ch;
    background-color: white;
    border: none;

    /* Next sibling is span element */
    &:has(+ span) {
      padding-inline: .25rem;
    }
  }

  input {
    text-align: right;
    width: 100%;
    font-size: 1.25rem;
  }

  input[data-type="number"] {
    padding: 0.25rem 0.5rem;
    font-size: 1.25rem;
    border: none;
  }

  input:disabled {
    background-color: white;
  }
</style>
