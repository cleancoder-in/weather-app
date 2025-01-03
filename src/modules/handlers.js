import dom from "./dom.js";

const handlers = (() => {
  const submitBtn = document.querySelector(".form__submit-btn");
  const homeBtn = document.querySelector(".nav__logo");

  function load() {
    document.addEventListener("DOMContentLoaded", () => {
      dom.renderApp();
    });

    submitBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      let locationText = document.getElementById("searchbar").value;
      if (!locationText) {
        alert("please enter the location");
        return;
      }
      dom.renderApp(locationText);
      document.getElementById("searchbar").value = "";
    });

    homeBtn.addEventListener("click", () => {
      dom.renderApp();
    });
  }

  return {
    load,
  };
})();

export default handlers;
