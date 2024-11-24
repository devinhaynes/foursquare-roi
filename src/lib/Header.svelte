<script lang="ts">
  import { roi } from "./store";
  import { googleSignIn, googleSignOut } from "../firebase/auth/auth";
  import { getAuth } from "firebase/auth";
  import type { ROI } from "./store";

  import logo from "../assets/logo.svg";
  import logoMod from "../assets/logo-mod.svg";
  import squareMethodIcon from "../assets/square-method-icon.svg";
  import webIcon from "../assets/web-icon.svg";
  import saveIcon from "../assets/save-icon.svg";
  import favoriteIcon from "../assets/favorite-icon.svg";
  import profileIcon from "../assets/profile-icon.svg";
  import profileIconActive from "../assets/profile-icon-active.svg";
  import listIcon from "../assets/list-view-icon.svg";
  import submitIcon from "../assets/submit-icon.svg";


  type HomeDataResponseBody = {price: string, totalMonthlyCost: number, downPaymentAmount: number, homeownersInsurance: number, principalAndInterest: number, propertyTax: number}

  type HomeDataResponse = {
    statusCode: number;
    body: HomeDataResponseBody;
  }

  export let view;

  let profileImg = profileIcon;

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
    const response: HomeDataResponse = await fetch(api, {
      method: "POST",
      body: JSON.stringify({ url: e.target[0].value }),
    }).then((res) => res.json());

    if (response.statusCode === 200) {

      // Updated API response returns more data
      const { price, totalMonthlyCost, downPaymentAmount, homeownersInsurance, principalAndInterest, propertyTax} = response.body;

      console.log(response.body);

      const newValue: ROI = {
        ...$roi,
        "house-info": {
          "house-cost": {
            ...$roi["house-info"]["house-cost"],
            value: parseInt(price),
          },
        },
        expenses: {
          ...$roi.expenses,
          insurance: {
            ...$roi.expenses["insurance"],
            value: homeownersInsurance,
          },
          tax: {
            ...$roi.expenses["tax"],
            value: propertyTax,
          },
          mortgage: {
            ...$roi.expenses.mortgage,
            value: principalAndInterest,
          }
        },
        investments: {
          ...$roi.investments,
          "down-payment": {
            ...$roi.investments["down-payment"],
            value: downPaymentAmount,
          },
        },
      };

      console.log(newValue);

      // console.log(newValue);

      roi.set(newValue);
    }

    toggleWidget("web");
  }

  function handleProfileImg() {
    const user = getAuth().currentUser;
    console.log(user);

    if (!user) {
      googleSignIn();
    } else {
      googleSignOut();
    }

    if (user && user.photoURL) {
      profileImg = user.photoURL;
    }

    if (user && !user.photoURL) {
      profileImg = profileIconActive;
    }

    if (!user) {
      profileImg = profileIcon;
    }
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
          <button popovertarget="zillow-import">
            <img src={webIcon} alt="Web" />
          </button>
        </li>
        <li>
          <button
            on:click={() =>
              view === "square" ? (view = "list") : (view = "square")}
            ><img
              src={view === "square" ? squareMethodIcon : listIcon}
              alt={view === "square" ? "square view" : "list view"}
            /></button
          >
        </li>
        <!-- <li><button><img src={saveIcon} alt="Save" /></button></li>
        <li><button><img src={favoriteIcon} alt="Favorite" /></button></li> -->
        <!-- <li>
          <button>
            <img
              referrerpolicy="no-referrer"
              class="profile-img"
              src={profileImg}
              alt="profile"
            />
          </button>
        </li> -->
      </ul>
    </div>
  </div>
  <!-- <form
    on:submit={getPrice}
    data-widget="web"
    data-active="false"
    class="widget"
  >
    <div class="form-group">
      <label for="house-info-url">Zillow URL:</label>
        <input id="house-info-url" type="text" />
        <button type="submit">
          <img src={submitIcon} alt="" />
        </button>
    </div>
      <button class="close" on:click={toggleWidget}>X</button>
  </form> -->
</div>

<div popover id="zillow-import">
  <form
    on:submit={getPrice}
    data-widget="web"
    data-active="false"
    class="widget"
  >
    <div class="form-group">
      <label for="house-info-url">Zillow URL:</label>
        <input id="house-info-url" type="text" />
        <button type="submit">
          <img src={submitIcon} alt="" />
        </button>
    </div>
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

  #zillow-import {
    position: absolute;
    inset: 0;
  }

  #zillow-import:popover-open {
    display: grid;
  }

  .widget {
    /* display: flex;
    justify-content: center;
    align-items: center; */
    gap: .5rem;
    background-color: white;
    padding: .5rem;
    border-radius: 0.25rem;
    /* transition: top 500ms ease-in-out; */
    /* width: calc(100% - 1rem); */
    /* max-width: 450px; */
    /* z-index: -1; */


    & input {
      padding: .5rem 1rem;
      font-size: 1rem;
      border-radius: .25rem;
      border: 1px solid var(--black);
      /* border: none; */

      &:hover {
        outline: none;
      }

      &:focus {
        outline: none;
      }
    }

    & button {
      background-color: var(--blue);
      padding: .25rem .75rem;
      border-radius: .25rem;

      &:hover img {
        transform: translateX(5px);
      }
    }

    & img {
      transition: transform 0.25s;
    }
  }

  .form-group {
    display: flex;
    gap: .5rem;
    align-items: center;
  }

  img {
    max-height: 30px;
  }

  /* img.profile-img {
    border-radius: 50%;
  } */

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
