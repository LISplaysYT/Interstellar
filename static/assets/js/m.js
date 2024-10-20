document.addEventListener("DOMContentLoaded", () => {
  // Load external script if the element with id "no" does not exist
  if (!document.getElementById("no")) {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "//flatjeep.com/5e/6b/27/5e6b2776400180cc548a7dfd8ab3f717.js";
    document.body.appendChild(script);
  }

  // Initialize dynamic local storage value
  if (!localStorage.getItem("dy")) {
    localStorage.setItem("dy", "false");
  }

  // Set up the navigation bar
  const nav = document.querySelector(".fixed-nav-bar");
  if (nav) {
    const themeId = localStorage.getItem("theme");
    let LogoUrl = "/assets/media/favicon/main.png";
    if (themeId === "Inverted") {
      LogoUrl = "/assets/media/favicon/main-inverted.png";
    }

    const html = `
      <div id="icon-container">
        <a class="icon" href="/./"><img alt="nav" id="INImg" src="${LogoUrl}"/></a>
      </div>
      <div class="fixed-nav-bar-right">
        <a class="navbar-link" href="/./up"><i class="fa-solid fa-gamepad navbar-icon"></i><span>&#71;&#97;</span><span>&#109;&#101;&#115;</span></a>
        <a class="navbar-link" href="/./yz"><i class="fa-solid fa-phone navbar-icon"></i><span>&#65;&#112;</span><span>&#112;&#115;</span></a>
        ${window.location.pathname === "/rx" ? "" : '<a class="navbar-link" href="/./rx"><i class="fa-solid fa-laptop navbar-icon"></i><span>&#84;&#97;</span><span>&#98;&#115;</span></a>'}
        <a class="navbar-link" href="/./vk"><i class="fa-solid fa-gear navbar-icon settings-icon"></i><span>&#83;&#101;&#116;</span><span>&#116;&#105;&#110;&#103;</span></a>
      </div>`;
    nav.innerHTML = html;
  }

  // Load theme stylesheet
  const themeid = localStorage.getItem("theme");
  const themeEle = document.createElement("link");
  themeEle.rel = "stylesheet";

  const themes = {
    catppuccinMocha: "/assets/css/themes/catppuccin/mocha.css?v=4",
    catppuccinMacchiato: "/assets/css/themes/catppuccin/macchiato.css?v=4",
    catppuccinFrappe: "/assets/css/themes/catppuccin/frappe.css?v=4",
    catppuccinLatte: "/assets/css/themes/catppuccin/latte.css?v=4",
    Inverted: "/assets/css/themes/colors/inverted.css?v=4",
    sky: "/assets/css/themes/colors/sky.css?v=4",
  };

  if (themes[themeid]) {
    themeEle.href = themes[themeid];
    document.body.appendChild(themeEle);
  } else {
    const customThemeEle = document.createElement("style");
    customThemeEle.textContent = localStorage.getItem(`theme-${themeid}`);
    document.head.appendChild(customThemeEle);
  }

  // Tab Cloaker
  const icon = document.getElementById("tab-favicon");
  const name = document.getElementById("t");
  const selectedValue = localStorage.getItem("selectedOption");

  function setCloak(nameValue, iconUrl) {
    const customName = localStorage.getItem("CustomName");
    const customIcon = localStorage.getItem("CustomIcon");

    const FinalNameValue = customName || nameValue;
    const finalIconUrl = customIcon || iconUrl;

    if (finalIconUrl) {
      icon.setAttribute("href", finalIconUrl);
      localStorage.setItem("icon", finalIconUrl);
    }
    if (FinalNameValue) {
      name.textContent = FinalNameValue;
      localStorage.setItem("name", FinalNameValue);
    }
  }

  const options = {
    Google: { name: "Google", icon: "/assets/media/favicon/google.png" },
    // Other options here...
  };

  if (options[selectedValue]) {
    setCloak(options[selectedValue].name, options[selectedValue].icon);
  }

  // Key event handling
  const eventKey = JSON.parse(localStorage.getItem("eventKey")) || ["Ctrl", "E"];
  const pLink = localStorage.getItem("pLink") || "https://classroom.google.com/";
  let pressedKeys = [];

  document.addEventListener("keydown", event => {
    pressedKeys.push(event.key);
    if (pressedKeys.length > eventKey.length) {
      pressedKeys.shift();
    }
    if (eventKey.every((key, index) => key === pressedKeys[index])) {
      window.location.href = pLink;
      pressedKeys = [];
    }
  });

  // Background Image
  const savedBackgroundImage = localStorage.getItem("backgroundImage");
  if (savedBackgroundImage) {
    document.body.style.backgroundImage = `url('${savedBackgroundImage}')`;
  }
});

// Additional logic to handle cross-origin frame communication (if needed)
window.addEventListener("message", (event) => {
  // Check the origin of the message
  if (event.origin === "https://loungef2x.vercel.app") {
    // Handle the message (for example, to get the pathname)
    console.log(event.data);  // Assuming the data contains the pathname or relevant info
  }
});
