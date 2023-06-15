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
    | "Investments"
    | "Totals";

  let component: TComponent = "HouseInfo";

  let view: "square" | "list" = "square";
</script>

<Header bind:view bind:component />
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
    {#if component === "Investments"}
      <CashOnCashRoi />
    {/if}
    {#if component === "Totals"}
      <Totals />
    {/if}
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
