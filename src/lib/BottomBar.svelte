<script>
  import squareMethodIcon from "../assets/square-method-icon.svg";
  import webIcon from "../assets/web-icon.svg";
  import saveIcon from "../assets/save-icon.svg";
  import favoriteIcon from "../assets/favorite-icon.svg";
  import profileIcon from "../assets/profile-icon.svg";

  export let view;
</script>

<div class="BottomBar">
  <ul class="BottomBar__wrapper">
    <li><img src={webIcon} alt="" /></li>
    <li>
      <button
        on:click={() =>
          view === "square" ? (view = "list") : (view = "square")}
        ><img src={squareMethodIcon} alt="" /></button
      >
    </li>
    <li><img src={saveIcon} alt="" /></li>
    <li><img src={favoriteIcon} alt="" /></li>
    <li><img src={profileIcon} alt="" /></li>
  </ul>
</div>

<style>
  .BottomBar {
    width: 100%;
    position: fixed;
    bottom: 0;
    background-color: white;
    color: var(--black);
  }

  .BottomBar__wrapper {
    display: flex;
    justify-content: space-between;
    list-style-type: none;
    max-width: var(--max-width);
    margin-inline: auto;
    padding: 1rem 10px;
  }

  img {
    max-height: 30px;
  }
</style>
