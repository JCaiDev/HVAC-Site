// const buildNavigation = async () => {
//   // Please fetch and use the data found in https://cdn.searchkings.ca/public-asset/js/test.json to build the navigation

//   try {
//     const response = await fetch(
//       "https://cdn.searchkings.ca/public-asset/js/test.json"
//     );
//     const data = await response.json();

//     //Sorting the nav-items by "order"
//     let navItems = data.navigation.sort((a, b) => a.order - b.order);

//     navItems = navItems.filter((item) => item.label !== "Home");

//     const nav = document.getElementById("navigation");

//     const container = document.createElement("div");
//     container.classList.add("container-fluid");

//     //Creating bootstrap toggle button
//     const toggleButton = document.createElement("button");
//     toggleButton.classList.add("navbar-toggler");
//     toggleButton.setAttribute("type", "button");
//     toggleButton.setAttribute("data-bs-toggle", "collapse");
//     toggleButton.setAttribute("data-bs-target", "#navbarNavDropdown");
//     toggleButton.setAttribute("aria-controls", "navbarNavDropdown");
//     toggleButton.setAttribute("aria-expanded", "false");
//     toggleButton.setAttribute("aria-label", "Toggle navigation");

//     const toggleIcon = document.createElement("span");
//     toggleIcon.classList.add("navbar-toggler-icon");
//     toggleButton.appendChild(toggleIcon);

//     //Create collapsible navigation menu
//     const collapseDiv = document.createElement("div");
//     collapseDiv.classList.add("collapse", "navbar-collapse");
//     collapseDiv.setAttribute("id", "navbarNavDropdown");

//     const ul = document.createElement("ul");
//     ul.classList.add("navbar-nav", "mx-auto", "gap-5");

//     navItems.forEach((item) => {
//       const li = document.createElement("li");
//       li.classList.add("nav-item", "text-light");

//       if (item.submenu && item.submenu.length > 0) {
//         li.classList.add("dropdown");

//         const dropdownLink = document.createElement("a");
//         dropdownLink.classList.add("nav-link", "dropdown-toggle");
//         dropdownLink.href = "#";
//         dropdownLink.setAttribute("role", "button");
//         dropdownLink.setAttribute("data-bs-toggle", "dropdown");
//         dropdownLink.setAttribute("aria-expanded", "false");
//         dropdownLink.textContent = item.label;

//         const dropdownMenu = document.createElement("ul");
//         dropdownMenu.classList.add("dropdown-menu");

//         item.submenu.forEach((subItem) => {
//           const subLi = document.createElement("li");
//           const subA = document.createElement("a");
//           subA.classList.add("dropdown-item");
//           subA.href = subItem.url;
//           subA.textContent = subItem.label;

//           subLi.appendChild(subA);
//           dropdownMenu.appendChild(subLi);
//         });
//         li.appendChild(dropdownLink);
//         li.appendChild(dropdownMenu);
//       } else {
//         const a = document.createElement("a");
//         a.classList.add("nav-link");
//         a.href = item.url;
//         a.textContent = item.label;
//         if (item.active) {
//           a.classList.add("active");
//         }
//         li.appendChild(a);
//       }

//       ul.appendChild(li);
//     });

//     collapseDiv.appendChild(ul);
//     container.appendChild(toggleButton);
//     container.appendChild(collapseDiv);
//     nav.appendChild(container);

//     const navLinks = document.querySelectorAll(".nav-link");
//     navLinks.forEach((link) => {
//       link.style.color = "white";
//     });

//     const activeLink = document.querySelector(".nav-link.active");
//     if (activeLink) {
//       activeLink.style.color = "lightgray";
//     }
//   } catch (error) {
//     console.error("Error building navigation:", error);
//   }
// };

const generateNavSubMenu = (item) => {
  let submenuHTML = ``;

  item.submenu.forEach((subItem) => {
    submenuHTML += `
      <li>
        <a
          class="dropdown-item"
          href="${subItem.url}"
        >
          ${subItem.label}
        </a>
      </li>
    `;
  });
  return submenuHTML;
};

const generateNavDropdown = (item) => {
  return `
    <li class="nav-item text-light dropdown">
      <a
        class="nav-link dropdown-toggle text-white"
        href="#"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"      
      >
        ${item.label}
      </a>
      <ul class="dropdown-menu">
        ${generateNavSubMenu(item)}
      </ul>
    </li>
  `;
};

const generateNavItem = (item) => {
  return `
    <li>
      <a class="nav-link text-white href="${item.url}">
        ${item.label}
      </a>
    </li>
  `;
};

const generateNavItems = (navItems) => {
  let navItemsHTML = ``;

  navItems.forEach((item) => {
    const isDropDown = item.submenu && item.submenu.length > 0;

    if (isDropDown) {
      navItemsHTML += generateNavDropdown(item);
    } else {
      navItemsHTML += generateNavItem(item);
    }
  });

  return navItemsHTML;
};

const generateNavigation = (navigation) => {
  const navItems = navigation
    .sort((a, b) => a.order - b.order)
    .filter((item) => item.label !== "Home");

  return `
    <div class="container-fluid">
      <button
        type="button"
        class="navbar-toggler"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav mx-auto gap-5">
          ${generateNavItems(navItems)}
        </ul>
      </div>
    </div>
  `;
};

const buildNavigation = async () => {
  try {
    const response = await fetch(
      "https://cdn.searchkings.ca/public-asset/js/test.json"
    );
    const data = await response.json();

    document.getElementById("navigation").innerHTML = generateNavigation(
      data.navigation
    );
  } catch (error) {
    console.error("Error building navigation:", error);
  }
};

//Branch Locator Script
const branchLocator = () => {
  const buttons = document.querySelectorAll("#branch-locator button");
  const iframe = document.getElementById("map");

  let activeButton = buttons[0];
  iframe.src = activeButton.getAttribute("data-iframe-src");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      if (button !== activeButton) {
        activeButton.classList.remove("active");
        button.classList.add("active");

        activeButton = button;
        iframe.src = button.getAttribute("data-iframe-src");
      }
    });
  });
};

document.addEventListener("DOMContentLoaded", () => {
  buildNavigation();
  branchLocator();
});

document.getElementById("current-year").innerText = new Date().getFullYear();
