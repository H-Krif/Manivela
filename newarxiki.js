document.addEventListener("DOMContentLoaded", function () {
  const parentList = document.getElementsByClassName("nav-list");
  const divs = Array.from(document.querySelectorAll('div[class^="arx-"]'));

  Array.from(parentList).forEach((list) => {
    list.addEventListener("mouseover", function (e) {
      if (e.target.classList.contains("navigation-link")) {
        const liParent = e.target.closest("li");
        const targetDivClass = liParent.getAttribute("data-target");
        const targetDiv = document.querySelector(`.arx-${targetDivClass}`);

        divs.forEach((div) => {
          if (div === targetDiv) {
            div.classList.remove("hideit");
            div.classList.add("active");
          } else {
            div.classList.remove("active");
            div.classList.add("hideit");
          }
        });
      }
    });

    list.addEventListener("mouseout", function (e) {
      if (e.target.classList.contains("navigation-link")) {
        const liParent = e.target.closest("li");
        const targetDivClass = liParent.getAttribute("data-target");
        const targetDiv = document.querySelector(`.arx${targetDivClass}`);

        targetDiv.classList.remove("active");
        targetDiv.classList.add("hideit");
      }
    });
  });
});
