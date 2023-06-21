<script lang="ts">
  import { roi } from "./store";

  import logo from "../assets/logo.svg";
  import squareMethodIcon from "../assets/square-method-icon.svg";
  import webIcon from "../assets/web-icon.svg";
  import saveIcon from "../assets/save-icon.svg";
  import favoriteIcon from "../assets/favorite-icon.svg";
  import profileIcon from "../assets/profile-icon.svg";
  import listIcon from "../assets/list-view-icon.svg";
  import submitIcon from "../assets/submit-icon.svg";

  export let view;

  function toggleWidget(element) {
    const widget = document.querySelector(`.widget[data-widget=${element}`);

    if (widget.getAttribute("data-active") == "true") {
      widget.setAttribute("data-active", "false");
      widget.removeAttribute("style");
      return;
    }

    if (widget.getAttribute("data-active") == "false") {
      widget.setAttribute("data-active", "true");
      widget.setAttribute("style", "top: 75px;");
    }
  }

  const api = "https://4g327brbdd.execute-api.us-east-1.amazonaws.com/beta";

  async function getPrice(e: SubmitEvent) {
    e.preventDefault();
    console.log(e.target[0].value);
    const response = await fetch(api, {
      method: "POST",
      body: JSON.stringify({ url: e.target[0].value }),
    }).then((res) => res.json());

    if (response.statusCode === 200) {
      roi.set({
        ...$roi,
        "house-info": {
          "house-cost": {
            ...$roi["house-info"]["house-cost"],
            value: parseInt(response.body),
          },
        },
      });
    }

    toggleWidget("web");
  }
</script>

<div class="header">
  <div class="wrapper">
    <div class="logo">
      <img src={logo} class="logo-img" alt="FourSquare Logo" />
      <span>ROI Calculator</span>
    </div>
    <div class="bottom">
      <ul class="wrapper">
        <li>
          <button on:click={() => toggleWidget("web")}>
            <img src={webIcon} alt="" />
          </button>
        </li>
        <li>
          <button
            on:click={() =>
              view === "square" ? (view = "list") : (view = "square")}
            ><img
              src={view === "square" ? squareMethodIcon : listIcon}
              alt=""
            /></button
          >
        </li>
        <li><button><img src={saveIcon} alt="" /></button></li>
        <li><button><img src={favoriteIcon} alt="" /></button></li>
        <li><button><img src={profileIcon} alt="" /></button></li>
      </ul>
    </div>
  </div>
  <form
    on:submit={getPrice}
    data-widget="web"
    data-active="false"
    class="widget"
  >
    <label for="house-info-url">URL:</label>
    <input id="house-info-url" type="text" />
    <button type="submit"><img src={submitIcon} alt="" /></button>
  </form>
</div>

<style>
  .header {
    background-color: white;
    padding-inline: 10px;
    color: var(--black);
    isolation: isolate;
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
    border-bottom: 1px solid var(--gray);
    padding: 1rem;
  }

  .logo-img {
    height: 50px;
  }

  .logo > span {
    display: none;
  }

  .bottom {
    background-color: white;
  }

  .wrapper {
    display: flex;
    justify-content: space-between;
    list-style-type: none;
    max-width: var(--max-width);
    margin-inline: auto;
    padding: 0 10px;
    background-color: white;
  }

  .widget {
    position: absolute;
    top: -80px;
    right: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    background-color: white;
    padding: 1rem;
    border-radius: 0.75rem;
    transition: top 500ms ease-in-out;
    width: calc(100% - 1rem);
    max-width: 500px;
    z-index: -1;
  }

  .widget input {
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    border: 2px solid var(--black);
  }

  .widget button {
    background-color: var(--blue);
    padding: 0.25rem 0.75rem;
  }

  img {
    max-height: 30px;
  }

  button {
    padding: 1rem;
    display: grid;
    place-content: center;
  }

  li {
    position: relative;
  }

  @media (min-width: 40em) {
    .logo > span {
      display: block;
    }
  }
</style>
