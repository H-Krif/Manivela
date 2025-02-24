document.addEventListener("DOMContentLoaded", function () {
  const navList = document.querySelector(".nav-list");
  const navItems = navList.querySelectorAll("li");
  const mouseoverContainer = document.querySelector(
    ".current-mouseover-container"
  );
  const divs = Array.from(
    mouseoverContainer.querySelectorAll('div[class^="arx-"]')
  );
  const explanationContainer = document.querySelector(
    ".currentMouseoverExplanationContainer"
  );
  const explanationDivs = Array.from(
    explanationContainer.querySelectorAll("div[class^='specific-info-']")
  );
  const startingText = document.querySelector(".arx-spiti");
  const spitiDiv = document.querySelector(".specific-info-spiti");
  const sketchContainers = document.querySelectorAll(".sketch-container a");

  let currentLi = null;
  let highlightedLi = null;
  let highlightedNavItem = null;
  let mouseoverTimeout;

  const symbols = {
    hoverBackground: Symbol("hoverBackground"),
    mouseoverNav: Symbol("mouseoverNav"),
    mouseoutNav: Symbol("mouseoutNav"),
    mouseoverContainer: Symbol("mouseoverContainer"),
    mouseoutContainer: Symbol("mouseoutContainer"),
    mouseoverSketch: Symbol("mouseoverSketch"),
    mouseoutSketch: Symbol("mouseoutSketch"),
  };

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function addHoverBackground() {
    navItems.forEach((li) => {
      li.addEventListener("mouseover", function (e) {
        if (highlightedLi && highlightedLi !== li) {
          highlightedLi.classList.remove("hover-background");
        }
        li.classList.add("hover-background");
        highlightedLi = li;
        currentLi = li;
      });

      li.addEventListener("mouseout", function (e) {
        if (li !== currentLi) {
          li.classList.remove("hover-background");
        }
      });
    });
  }

  function handleMouseoverNav(e) {
    clearTimeout(mouseoverTimeout);
    const liParent = e.target.closest("li");
    if (liParent) {
      const targetDivClass = liParent.getAttribute("data-target");
      const targetDiv = mouseoverContainer.querySelector(
        `.arx-${targetDivClass}`
      );

      divs.forEach((div) => {
        if (div === targetDiv) {
          div.classList.add("active");
          div.classList.remove("hideit");
        } else {
          div.classList.remove("active");
          div.classList.add("hideit");
        }
      });

      // Ensure spitiDiv is shown if moving from current-mouseover-container
      explanationDivs.forEach((div) => {
        div.classList.remove("active");
        div.classList.add("hideit");
      });
      spitiDiv.classList.add("active");
      spitiDiv.classList.remove("hideit");

      // Add hover background to the linked nav item
      if (highlightedNavItem && highlightedNavItem !== liParent) {
        highlightedNavItem.classList.remove("hover-background");
      }
      liParent.classList.add("hover-background");
      highlightedNavItem = liParent;
    }
  }

  async function handleMouseoutNav(e) {
    const liParent = e.target.closest("li");
    if (liParent) {
      mouseoverTimeout = setTimeout(async () => {
        const activeDiv = mouseoverContainer.querySelector(".active");
        if (activeDiv && !activeDiv.matches(":hover")) {
          activeDiv.classList.remove("active");
          activeDiv.classList.add("hideit");
          startingText.classList.add("active");
          startingText.classList.remove("hideit");
          if (currentLi) {
            currentLi.classList.remove("hover-background");
            currentLi = null;
          }
        }
      }, 2000);
    }
  }

  function handleMouseoverContainer(e) {
    if (e.target.tagName === "A") {
      clearTimeout(mouseoverTimeout);
      const anchor = e.target;
      const desc = anchor.getAttribute("data-desc");
      const targetDiv = explanationContainer.querySelector(
        `.specific-info-${desc}`
      );

      explanationDivs.forEach((div) => {
        if (div === targetDiv) {
          spitiDiv.classList.remove("active");
          spitiDiv.classList.add("hideit");
          div.classList.add("active");
          div.classList.remove("hideit");
        } else {
          div.classList.remove("active");
          div.classList.add("hideit");
        }
      });

      if (currentLi) {
        currentLi.classList.add("hover-background");
      }
    }
  }

  async function handleMouseoutContainer(e) {
    if (e.target.tagName === "A") {
      mouseoverTimeout = setTimeout(async () => {
        const activeDiv = explanationContainer.querySelector(".active");
        if (activeDiv && !activeDiv.matches(":hover")) {
          explanationDivs.forEach((div) => {
            div.classList.remove("active");
            div.classList.add("hideit");
          });
          divs.forEach((div) => {
            div.classList.remove("active");
            div.classList.add("hideit");
          });
          startingText.classList.add("active");
          startingText.classList.remove("hideit");
          spitiDiv.classList.add("active");
          spitiDiv.classList.remove("hideit");
          if (currentLi) {
            currentLi.classList.remove("hover-background");
            currentLi = null;
          }
          if (highlightedNavItem) {
            highlightedNavItem.classList.remove("hover-background");
            highlightedNavItem = null;
          }
        } else if (!activeDiv) {
          spitiDiv.classList.add("active");
          spitiDiv.classList.remove("hideit");
          if (currentLi) {
            currentLi.classList.remove("hover-background");
            currentLi = null;
          }
          if (highlightedNavItem) {
            highlightedNavItem.classList.remove("hover-background");
            highlightedNavItem = null;
          }
        }
      }, 2000);
    }
  }

  function handleMouseoverSketch(e) {
    clearTimeout(mouseoverTimeout);
    const anchor = e.target.closest("a");
    const targetDivClass = anchor.getAttribute("data-target");
    const targetDiv = mouseoverContainer.querySelector(
      `.arx-${targetDivClass}`
    );

    if (targetDiv) {
      divs.forEach((div) => {
        if (div === targetDiv) {
          div.classList.add("active");
          div.classList.remove("hideit");
        } else {
          div.classList.remove("active");
          div.classList.add("hideit");
        }
      });

      // Ensure spitiDiv is shown if moving from current-mouseover-container
      explanationDivs.forEach((div) => {
        div.classList.remove("active");
        div.classList.add("hideit");
      });
      spitiDiv.classList.add("active");
      spitiDiv.classList.remove("hideit");

      // Add hover background to the linked nav item
      const link = anchor.getAttribute("data-link");
      const linkedNavItem = navList.querySelector(`li[data-link="${link}"]`);
      if (linkedNavItem) {
        if (highlightedNavItem && highlightedNavItem !== linkedNavItem) {
          highlightedNavItem.classList.remove("hover-background");
        }
        linkedNavItem.classList.add("hover-background");
        highlightedNavItem = linkedNavItem;
      }
    }
  }

  async function handleMouseoutSketch(e) {
    const anchor = e.target.closest("a");
    if (anchor) {
      mouseoverTimeout = setTimeout(async () => {
        const activeDiv = mouseoverContainer.querySelector(".active");
        if (activeDiv && !activeDiv.matches(":hover")) {
          activeDiv.classList.remove("active");
          activeDiv.classList.add("hideit");
          startingText.classList.add("active");
          startingText.classList.remove("hideit");
        } else if (!activeDiv) {
          startingText.classList.add("active");
          startingText.classList.remove("hideit");
        }

        // Remove hover background from the linked nav item
        const link = anchor.getAttribute("data-link");
        const linkedNavItem = navList.querySelector(`li[data-link="${link}"]`);
        if (linkedNavItem) {
          linkedNavItem.classList.remove("hover-background");
          highlightedNavItem = null;
        }
      }, 2000);
    }
  }

  // Call the function to add hover background
  addHoverBackground();

  // Event listeners for navList
  navList.addEventListener("mouseover", handleMouseoverNav);
  navList.addEventListener("mouseout", handleMouseoutNav);

  // Event listeners for mouseoverContainer
  mouseoverContainer.addEventListener("mouseover", handleMouseoverContainer);
  mouseoverContainer.addEventListener("mouseout", handleMouseoutContainer);

  // Event listeners for sketchContainers
  sketchContainers.forEach((anchor) => {
    anchor.addEventListener("mouseover", handleMouseoverSketch);
    anchor.addEventListener("mouseout", handleMouseoutSketch);
  });
});
