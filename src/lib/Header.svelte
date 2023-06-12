<script lang="ts">
  import logo from "../assets/logo.svg";
  import squareIcon from "../assets/square-method-icon.svg";
  import listIcon from "../assets/list-view-icon.svg";

  export let view = "square";
</script>

<div class="header">
  <div class="header__wrapper">
    <div class="header__logo">
      <img src={logo} class="logo" alt="FourSquare Logo" />
      <span>ROI Calculator</span>
    </div>
    <!-- <div class="header__view">
      <button
        on:click={() =>
          view === "square" ? (view = "list") : (view = "square")}
      >
        <img src={view === "square" ? squareIcon : listIcon} alt="" />
      </button>
    </div> -->
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

  .header__wrapper {
    max-width: var(--max-width);
    margin-inline: auto;
    padding-block: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .header__logo {
    display: flex;
    align-items: center;
  }

  .logo {
    height: 50px;
  }

  .header__view > button {
    background-color: white;
    height: fit-content;
    padding: 10px;
  }

  .header__view img {
    height: 30px;
  }
</style>
