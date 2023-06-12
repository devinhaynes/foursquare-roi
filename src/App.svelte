<script lang="ts">
  import CashFlow from "./lib/CashFlow.svelte";
  import CashOnCashRoi from "./lib/CashOnCashROI.svelte";
  import Expenses from "./lib/Expenses.svelte";
  import Header from "./lib/Header.svelte";
  import HouseInfo from "./lib/HouseInfo.svelte";
  import Income from "./lib/Income.svelte";
  import Totals from "./lib/Totals.svelte";
  import BottomBar from "./lib/BottomBar.svelte";

  type TComponent =
    | "HouseInfo"
    | "Income"
    | "Expenses"
    | "CashFlow"
    | "CashOnCashROI"
    | "Totals";

  interface IComponent {
    prev: TComponent;
    next: TComponent;
  }

  interface IComponents {
    HouseInfo: IComponent;
    Income: IComponent;
    Expenses: IComponent;
    CashFlow: IComponent;
    CashOnCashROI: IComponent;
    Totals: IComponent;
  }

  let component: TComponent = "HouseInfo";

  let components: IComponents = {
    HouseInfo: {
      prev: "HouseInfo",
      next: "Income",
    },
    Income: {
      prev: "HouseInfo",
      next: "Expenses",
    },
    Expenses: {
      prev: "Income",
      next: "CashFlow",
    },
    CashFlow: {
      prev: "Expenses",
      next: "CashOnCashROI",
    },
    CashOnCashROI: {
      prev: "CashFlow",
      next: "Totals",
    },
    Totals: {
      prev: "CashFlow",
      next: "Totals",
    },
  };

  let view = "square";
</script>

<Header />
<main>
  {#if view === "square"}
    {#if component === "HouseInfo"}
      <HouseInfo />
    {/if}
    {#if component === "Income"}
      <Income />
    {/if}
    {#if component === "Expenses"}
      <Expenses />
    {/if}
    {#if component === "CashFlow"}
      <CashFlow />
    {/if}
    {#if component === "CashOnCashROI"}
      <CashOnCashRoi />
    {/if}
    {#if component === "Totals"}
      <Totals />
    {/if}
    <!-- <div class="bottom-buttons">
      <div class="bottom-buttons__wrapper">
        <button on:click={() => (component = components[component].prev)}
          >Prev</button
        >
        <button on:click={() => (component = components[component].next)}
          >Next</button
        >
      </div>
    </div> -->
  {/if}
  {#if view === "list"}
    <HouseInfo />
    <Income />
    <Expenses />
    <CashFlow />
    <CashOnCashRoi />
    <Totals />
  {/if}
</main>
<BottomBar bind:view />
