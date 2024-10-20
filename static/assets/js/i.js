window.addEventListener("load", () => {
  navigator.serviceWorker.register("../sw.js?v=10-02-2024", {
    scope: "/a/",
  });
});

const form = document.getElementById("fv");
const input = document.getElementById("iv");

if (form && input) {
  form.addEventListener("submit", async event => {
    event.preventDefault();

    // Use window.location.pathname to avoid cross-origin issues
    const currentPath = window.location.pathname; // Get current path from the same origin

    if (currentPath === "/rx") {
      processUrl(input.value, "");
    } else {
      processUrl(input.value, "/rx");
    }
  });
}

function processUrl(value, path) {
  let url = value.trim();
  const engine = localStorage.getItem("engine");
  const searchUrl = engine ? engine : "https://www.google.com/search?q=";

  if (!isUrl(url)) {
    url = searchUrl + url;
  } else if (!(url.startsWith("https://") || url.startsWith("http://"))) {
    url = `https://${url}`;
  }

  sessionStorage.setItem("GoUrl", __uv$config.encodeUrl(url));
  const dy = localStorage.getItem("dy");

  if (dy === "true") {
    window.location.href = `/a/q/${__uv$config.encodeUrl(url)}`;
  } else if (path) {
    window.location.href = path; // Use window.location.href
  } else {
    window.location.href = `/a/${__uv$config.encodeUrl(url)}`;
  }
}

function go(value) {
  processUrl(value, "/rx");
}

function blank(value) {
  processUrl(value);
}

function dy(value) {
  processUrl(value, `/a/q/${__uv$config.encodeUrl(value)}`);
}

function isUrl(val = "") {
  return /^http(s?):\/\//.test(val) || (val.includes(".") && val.substr(0, 1) !== " ");
}
