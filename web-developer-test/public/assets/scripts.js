const buildNavigation = async () => {
  // Please fetch and use the data found in https://cdn.searchkings.ca/public-asset/js/test.json to build the navigation

  try {
    //fetch JSON data
    const response = await fetch(
      "https://cdn.searchkings.ca/public-asset/js/test.json"
    );
    const data = await response.json();

    //Sort nav-items by order
    let navItems = data.navigation.sort((a, b) => a.order - b.order);

    navItems = navItems.filter((item) => item.label !== "Home");

    //find nav
    const nav = document.getElementById("navigation");
    nav.classList.add("navbar", "navbar-expand-md", "navbar-dark");

    const container = document.createElement("div");
    container.classList.add("container-fluid");

    //Bootstrap create toggle button
    const toggleButton = document.createElement("button");
    toggleButton.classList.add("navbar-toggler");
    toggleButton.setAttribute("type", "button");
    toggleButton.setAttribute("data-bs-toggle", "collapse");
    toggleButton.setAttribute("data-bs-target", "#navbarNavDropdown");
    toggleButton.setAttribute("aria-controls", "navbarNavDropdown");
    toggleButton.setAttribute("aria-expanded", "false");
    toggleButton.setAttribute("aria-label", "Toggle navigation");

    const toggleIcon = document.createElement("span");
    toggleIcon.classList.add("navbar-toggler-icon");
    toggleButton.appendChild(toggleIcon);

    //Create collapsible navigation menu
    const collapseDiv = document.createElement("div");
    collapseDiv.classList.add("collapse", "navbar-collapse");
    collapseDiv.setAttribute("id", "navbarNavDropdown");

    const ul = document.createElement("ul");
    ul.classList.add("navbar-nav", "mx-auto", "gap-5");

    //Loop through each nav item
    navItems.forEach((item) => {
      const li = document.createElement("li");
      li.classList.add("nav-item", "text-light");

      if (item.submenu && item.submenu.length > 0) {
        li.classList.add("dropdown");

        const dropdownLink = document.createElement("a");
        dropdownLink.classList.add("nav-link", "dropdown-toggle");
        dropdownLink.href = "#";
        dropdownLink.setAttribute("role", "button");
        dropdownLink.setAttribute("data-bs-toggle", "dropdown");
        dropdownLink.setAttribute("aria-expanded", "false");
        dropdownLink.textContent = item.label;

        const dropdownMenu = document.createElement("ul");
        dropdownMenu.classList.add("dropdown-menu");

        item.submenu.forEach((subItem) => {
          const subLi = document.createElement("li");
          const subA = document.createElement("a");
          subA.classList.add("dropdown-item");
          subA.href = subItem.url;
          subA.textContent = subItem.label;

          subLi.appendChild(subA);
          dropdownMenu.appendChild(subLi);
        });
        li.appendChild(dropdownLink);
        li.appendChild(dropdownMenu);
      } else {
        const a = document.createElement("a");
        a.classList.add("nav-link");
        a.href = item.url;
        a.textContent = item.label;
        if (item.active) {
          a.classList.add("active");
        }
        li.appendChild(a);
      }

      ul.appendChild(li);
    });

    collapseDiv.appendChild(ul);
    container.appendChild(toggleButton);
    container.appendChild(collapseDiv);
    nav.appendChild(container);

    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      link.style.color = "white";
    });

    const activeLink = document.querySelector(".nav-link.active");
    if (activeLink) {
      activeLink.style.color = "lightgray";
    }
  } catch (error) {
    console.error("Error building navigation:", error);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  buildNavigation();
});
