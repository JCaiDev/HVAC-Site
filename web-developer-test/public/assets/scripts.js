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
      <a class="nav-link text-white" href="${item.url}">
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

//Build Navigation Script
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

//Branch Locator Code
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
