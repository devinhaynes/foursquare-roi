<script lang="ts">
  import arrow from "../assets/arrow-icon.svg";
  import house from "../assets/house-icon.svg";
  import expenses from "../assets/expenses-icon.svg";
  import income from "../assets/income-icon.svg";
  import cashflow from "../assets/cashflow-icon.svg";
  import investments from "../assets/investments-icon.svg";
  import totals from "../assets/totals-icon.svg";

  export let view: "square" | "list";

  export let component: TComponent;

  type TComponent =
    | "HouseInfo"
    | "Income"
    | "Expenses"
    | "CashFlow"
    | "Investments"
    | "Totals";

  type TTarget =
    | "prev"
    | "next"
    | "HouseInfo"
    | "Income"
    | "Expenses"
    | "CashFlow"
    | "Investments"
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
    Investments: IComponent;
    Totals: IComponent;
  }

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
      next: "Investments",
    },
    Investments: {
      prev: "CashFlow",
      next: "Totals",
    },
    Totals: {
      prev: "CashFlow",
      next: "Totals",
    },
  };

  function handleNavigation(target: TTarget) {
    switch (target) {
      case "prev":
        if (view === "square") {
          component = components[component].prev;
        }
        break;
      case "next":
        if (view === "square") {
          component = components[component].next;
        }
        break;
      case "HouseInfo":
        if (view === "square") {
          component = "HouseInfo";
        }
        break;

      case "Income":
        if (view === "square") {
          component = "Income";
        }
        break;
      case "Expenses":
        if (view === "square") {
          component = "Expenses";
        }
        break;
      case "CashFlow":
        if (view === "square") {
          component = "CashFlow";
        }
        break;
      case "Investments":
        if (view === "square") {
          component = "Investments";
        }
        break;
      case "Totals":
        if (view === "square") {
          component = "Totals";
        }
        break;
      default:
        return;
    }
  }
</script>

<div class="BottomBar">
  <div class="wrapper">
    <ul>
      <li class="nav-link">
        <button class="nav-button" on:click={() => handleNavigation("prev")}>
          <img class="nav-image arrow" src={arrow} alt="" />
        </button>
      </li>
      <li class="nav-link">
        <button
          class="nav-button"
          on:click={() => handleNavigation("HouseInfo")}
        >
          <img class="nav-image" src={house} alt="" />
          <span>House Info</span>
        </button>
      </li>
      <li class="nav-link">
        <button class="nav-button" on:click={() => handleNavigation("Income")}>
          <img class="nav-image" src={income} alt="" />
          <span>Income</span>
        </button>
      </li>
      <li class="nav-link">
        <button
          class="nav-button"
          on:click={() => handleNavigation("Expenses")}
        >
          <img class="nav-image" src={expenses} alt="" />
          <span>Expenses</span>
        </button>
      </li>
      <li class="nav-link">
        <button
          class="nav-button"
          on:click={() => handleNavigation("CashFlow")}
        >
          <img class="nav-image" src={cashflow} alt="" />
          <span>Cashflow</span>
        </button>
      </li>
      <li class="nav-link">
        <button
          class="nav-button"
          on:click={() => handleNavigation("Investments")}
        >
          <img class="nav-image" src={investments} alt="" />
          <span>Investments</span>
        </button>
      </li>
      <li class="nav-link">
        <button class="nav-button" on:click={() => handleNavigation("Totals")}>
          <img class="nav-image" src={totals} alt="" />
          <span>Totals</span>
        </button>
      </li>
      <li class="nav-link">
        <button class="nav-button" on:click={() => handleNavigation("next")}>
          <img class="nav-image arrow" src={arrow} alt="" />
        </button>
      </li>
    </ul>
  </div>
</div>

<style>
  .BottomBar {
    width: 100%;
    position: fixed;
    bottom: 0;
    color: var(--black);
    isolation: isolate;
  }

  .wrapper {
    display: flex;
    justify-content: space-between;
    list-style-type: none;
    max-width: var(--max-width);
    margin-inline: auto;
    padding: 0 10px;
    background-color: white;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
  }

  .nav-image {
    max-width: 30px;
  }

  .arrow {
    max-width: 1rem;
  }

  ul {
    display: flex;
    gap: 0.25rem;
    align-items: center;
    justify-content: space-around;
    list-style: none;
    padding-block: 1rem;
    width: 100%;
  }

  li:nth-child(1) .nav-image {
    rotate: -90deg;
  }

  li:nth-last-child(1) .nav-image {
    rotate: 90deg;
  }

  .nav-button {
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .nav-button > span {
    font-size: 0.75rem !important;
    width: 0;
    height: 0;
    opacity: 0;
    background-color: var(--black);
    color: white;
    position: absolute;
    top: 0;
    left: -50%;
    padding: 0.5rem 1rem;
    transform: translateY(calc(-100% + 0.25rem));
    outline: 1px solid white;
  }

  .nav-button:hover > span {
    width: auto;
    height: auto;
    opacity: 1;
  }
</style>
