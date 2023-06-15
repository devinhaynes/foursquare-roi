<script lang="ts">
  import squareMethodIcon from "../assets/square-method-icon.svg";
  import webIcon from "../assets/web-icon.svg";
  import saveIcon from "../assets/save-icon.svg";
  import favoriteIcon from "../assets/favorite-icon.svg";
  import profileIcon from "../assets/profile-icon.svg";
  import listIcon from "../assets/list-view-icon.svg";
  import submitIcon from "../assets/submit-icon.svg";

  export let view: "square" | "list";

  function toggleWidget(element: string) {
    const widget = document.querySelector(`.widget[data-widget=${element}`);

    if (widget.getAttribute("data-active") == "true") {
      widget.setAttribute("data-active", "false");
      widget.removeAttribute("style");
      return;
    }

    if (widget.getAttribute("data-active") == "false") {
      widget.setAttribute("data-active", "true");
      widget.setAttribute("style", "top: -100px;");
    }
  }
</script>

<div class="BottomBar">
  <div class="bottom">
    <ul class="wrapper">
      <li>
        <button on:click={() => toggleWidget("web")}>
          <img src={webIcon} alt="" />
        </button>
        <form data-widget="web" data-active="false" class="widget">
          <label for="">URL:</label>
          <input type="text" />
          <button><img src={submitIcon} alt="" /></button>
        </form>
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

<style>
  .BottomBar {
    width: 100%;
    position: fixed;
    bottom: 0;
    color: var(--black);
    isolation: isolate;
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
    top: 150%;
    display: flex;
    align-items: center;
    gap: 1rem;
    background-color: white;
    padding: 1rem;
    border-radius: 0.75rem;
    transition: top 250ms ease-in-out;
    z-index: 3;
  }

  .widget::before {
    content: "";
    position: absolute;
    left: 11px;
    bottom: -14px;
    height: 35px;
    aspect-ratio: 1;
    background-color: white;
    rotate: 45deg;
    z-index: -1;
    border-radius: 0.25rem;
  }

  .widget input {
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    border: 2px solid var(--black);
  }

  .widget button {
    background-color: var(--blue);
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    border: 2px solid var(--black);
  }

  img {
    max-height: 30px;
  }

  button {
    padding: 1rem;
    display: grid;
    place-content: center;
  }

  button:active {
    border-top: 2px solid red;
  }

  li {
    position: relative;
  }
</style>
