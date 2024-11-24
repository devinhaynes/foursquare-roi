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

{#if view === "square"}
  <div class="BottomBar">
    <div class="wrapper">
      <ul>
        <li class="nav-link">
          <button class="nav-button" on:click={() => handleNavigation("prev")}>
            <img class="nav-image arrow" src={arrow} alt="" />
            
          </button>
          <span class="popover-label">Prev</span>
        </li>
        <li class="nav-link">
          <button
            class="nav-button"
            on:click={() => handleNavigation("HouseInfo")}
          >
          <div class="ghost"></div>
            <img class="nav-image" src={house} alt="" />
            
          </button>
          <span class="popover-label">House Info</span>
        </li>
        <li class="nav-link">
          <button
            class="nav-button"
            on:click={() => handleNavigation("Income")}
          >
          <div class="ghost"></div>
            <img class="nav-image" src={income} alt="" />
            
          </button>
          <span class="popover-label">Income</span>
        </li>
        <li class="nav-link">
          <button
            class="nav-button"
            on:click={() => handleNavigation("Expenses")}
          >
          <div class="ghost"></div>
            <img class="nav-image" src={expenses} alt="" />
            
          </button>
          <span class="popover-label">Expenses</span>
        </li>
        <li class="nav-link">
          <button
            class="nav-button"
            on:click={() => handleNavigation("CashFlow")}
          >
            <div class="ghost"></div>
            <img class="nav-image" src={cashflow} alt="" />
            
          </button>
          <span class="popover-label">Cashflow</span>
        </li>
        <li class="nav-link">
          <button
            class="nav-button"
            on:click={() => handleNavigation("Investments")}
          >
            <div class="ghost"></div>
            <img class="nav-image" src={investments} alt="" />
          </button>
          <span class="popover-label">Investments</span>
        </li>
        <li class="nav-link">
          <button
            class="nav-button"
            on:click={() => handleNavigation("Totals")}
          >
            <div class="ghost"></div>
            <img class="nav-image" src={totals} alt="" />
          </button>
          <span class="popover-label">Totals</span>
        </li>
        <li class="nav-link">
          <button class="nav-button" on:click={() => handleNavigation("next")}>
            <img class="nav-image arrow" src={arrow} alt="" />
            
          </button>
          <span class="popover-label">Next</span>
        </li>
      </ul>
    </div>
  </div>
{/if}

<style>
  .BottomBar {
    width: 100%;
    position: fixed;
    bottom: 0;
    color: var(--black);
    isolation: isolate;
    background-color: white;
  }

  .wrapper {
    list-style-type: none;
    width: fit-content;
    max-width: var(--max-width);
    margin-inline: auto;
    padding: 0 10px;
    background-color: white;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
  }

  .nav-image {
    max-width: 35px;
  }

  .arrow {
    border-radius: 50%;
    outline: 2px solid var(--black);
    outline-offset: -1px;
    padding: .5rem;
    transition: background-color .25s ease-in-out, outline-offset .15s ease-in-out;

    &:hover {
      background-color: rgba(0,0,0,.1);
      outline-offset: 2px;
    }
  }

  ul {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    list-style: none;
    padding-block: 1.25rem;
    width: 100%;
  }

  li {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 75px;
  }

  li:nth-child(1) .nav-image {
    rotate: -90deg;
  }

  li:nth-last-child(1) .nav-image {
    rotate: 90deg;
  }

  .nav-link {
    &:hover .popover-label {
      opacity: 1;
      
    }
  }

  .nav-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: .125rem;
    position: relative;

    & .ghost {
      opacity: 0;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      width: 150%;
      height: 150%;
      transition: opacity 0.25s;
      background-color: rgba(0, 0, 0, 0.1);
      border-radius: .25rem;
    }

    &:focus {
      outline: none;
    }

    &:focus .ghost {
      opacity: 1;
    }
  }

  .popover-label {
    font-size: 0.75rem;
    opacity: 0;
    background-color: var(--black);
    color: white;
    padding: .15rem .5rem;
    border-radius: .25rem;
    transition: opacity 0.25s;
    position: absolute;
    bottom: 0;
  }
</style>
