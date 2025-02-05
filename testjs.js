const linklis = document.querySelectorAll(".menu-li");
const contentDivs = document.querySelectorAll(".overlay");

linklis.forEach((item) => {
  item.addEventListener("mouseover", (e) => {
    const index = e.currentTarget.dataset.index;
    contentDivs.forEach((div) => div.classList.remove("visible"));
    const actualDiv = document.querySelector(`.overlay-content${index}`);

    if (actualDiv) {
      actualDiv.classList.add("visible");
    }
  });

  item.addEventListener("mouseout", (e) => {
    const index = e.currentTarget.dataset.index;
    const actualDiv = document.querySelector(`.overlay-content${index}`);
    actualDiv.classList.remove("visible");
  });
});
