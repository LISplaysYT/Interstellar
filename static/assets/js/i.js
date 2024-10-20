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

    // Set currentPath to a specific URL (for example, a testing URL)
    const currentPath = "https://loungef2x.vercel.app/app"; // Replace this with your desired URL

    // Use the pathname from the specific URL
    const pathname = new URL(currentPath).pathname; // Extract the pathname from the URL
    
    // Check the pathname to determine the next action
    if (pathname === "/rx") {
      processUrl(input.value, ""); // No additional path
    } else {
      processUrl(input.value, "/rx"); // Redirect to /rx
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
    url = `https://${url}`; // Ensure URL has a protocol
  }

  sessionStorage.setItem("GoUrl", __uv$config.encodeUrl(url));
  const dy = localStorage.getItem("dy");

  if (dy === "true") {
    window.location.href = `/a/q/${__uv$config.encodeUrl(url)}`;
  } else if (path) {
    window.location.href = path; // Use provided path
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
