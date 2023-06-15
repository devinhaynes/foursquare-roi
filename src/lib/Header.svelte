<script lang="ts">
  import logo from "../assets/logo.svg";
  import arrow from "../assets/arrow-icon.svg";
  import house from "../assets/house-icon.svg";
  import expenses from "../assets/expenses-icon.svg";
  import income from "../assets/income-icon.svg";
  import cashflow from "../assets/cashflow-icon.svg";

  export let view;
  export let component;

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

<div class="header">
  <div class="wrapper">
    <div class="logo">
      <img src={logo} class="logo-img" alt="FourSquare Logo" />
      <span>ROI Calculator</span>
    </div>
    {#if view === "square"}
      <div class="bottom">
        <ul>
          <li>
            <button on:click={() => handleNavigation("prev")}>
              <img class="nav-image arrow" src={arrow} alt="" />
            </button>
          </li>
          <li>
            <button on:click={() => handleNavigation("HouseInfo")}>
              <img class="nav-image" src={house} alt="" />
            </button>
          </li>
          <li>
            <button on:click={() => handleNavigation("Income")}>
              <img class="nav-image" src={income} alt="" />
            </button>
          </li>
          <li>
            <button on:click={() => handleNavigation("Expenses")}>
              <img class="nav-image" src={expenses} alt="" />
            </button>
          </li>
          <li>
            <button on:click={() => handleNavigation("CashFlow")}>
              <img class="nav-image" src={cashflow} alt="" />
            </button>
          </li>
          <li>
            <button on:click={() => handleNavigation("Investments")}>
              <img class="nav-image" src={house} alt="" />
            </button>
          </li>
          <li>
            <button on:click={() => handleNavigation("Totals")}>
              <img class="nav-image" src={house} alt="" />
            </button>
          </li>
          <li>
            <button on:click={() => handleNavigation("next")}>
              <img class="nav-image arrow" src={arrow} alt="" />
            </button>
          </li>
        </ul>
      </div>
    {/if}
  </div>
</div>

<style>
  .header {
    background-color: white;
    padding-inline: 10px;
    color: var(--black);
  }

  .header span {
    padding-inline: 1rem;
    font-size: 1.25rem;
    font-weight: 600;
  }

  .wrapper {
    max-width: var(--max-width);
    margin-inline: auto;
    padding-block: 0.5rem;
  }

  .logo {
    display: flex;
    align-items: center;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--gray);
  }

  .logo-img {
    height: 50px;
  }

  .nav-image {
    max-width: 30px;
  }

  .arrow {
    max-width: 1rem;
  }

  li:nth-child(1) .nav-image {
    rotate: -90deg;
  }

  li:nth-last-child(1) .nav-image {
    rotate: 90deg;
  }

  ul {
    display: flex;
    gap: 0.25rem;
    align-items: center;
    justify-content: space-between;
    list-style: none;
    padding-top: 1rem;
  }
</style>
