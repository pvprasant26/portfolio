(function () {
  const CORRECT = "Pra2026";
  const KEY = "pp_auth";

  if (sessionStorage.getItem(KEY) === "1") return;

  // Overlay styles
  var style = document.createElement("style");
  style.textContent = [
    "#pp-overlay{position:fixed;inset:0;background:#111f2c;display:flex;align-items:center;justify-content:center;z-index:999999;font-family:sans-serif;}",
    "#pp-box{background:#fff;border-radius:10px;padding:40px 36px;width:320px;max-width:90vw;text-align:center;box-shadow:0 8px 40px rgba(0,0,0,.4);}",
    "#pp-box h2{margin:0 0 8px;font-size:20px;color:#111f2c;}",
    "#pp-box p{margin:0 0 24px;color:#555;font-size:14px;}",
    "#pp-pw{width:100%;padding:10px 14px;border:1.5px solid #ccc;border-radius:6px;font-size:15px;box-sizing:border-box;outline:none;}",
    "#pp-pw:focus{border-color:#111f2c;}",
    "#pp-btn{margin-top:14px;width:100%;padding:11px;background:#111f2c;color:#fff;border:none;border-radius:6px;font-size:15px;cursor:pointer;font-weight:600;}",
    "#pp-btn:hover{background:#1e3a50;}",
    "#pp-err{color:#c0392b;font-size:13px;margin-top:10px;min-height:18px;}"
  ].join("");
  document.head.appendChild(style);

  // Overlay HTML
  var overlay = document.createElement("div");
  overlay.id = "pp-overlay";
  overlay.innerHTML = [
    '<div id="pp-box">',
    '  <h2>Prasant Poodipeddi</h2>',
    '  <p>Enter the password to view this portfolio.</p>',
    '  <input id="pp-pw" type="password" placeholder="Password" autocomplete="current-password" />',
    '  <button id="pp-btn">Enter</button>',
    '  <div id="pp-err"></div>',
    '</div>'
  ].join("");

  // Wait for body to exist
  function mount() {
    document.body.appendChild(overlay);
    var pw = document.getElementById("pp-pw");
    var btn = document.getElementById("pp-btn");
    var err = document.getElementById("pp-err");

    function attempt() {
      if (pw.value === CORRECT) {
        sessionStorage.setItem(KEY, "1");
        overlay.remove();
      } else {
        err.textContent = "Incorrect password. Please try again.";
        pw.value = "";
        pw.focus();
      }
    }

    btn.addEventListener("click", attempt);
    pw.addEventListener("keydown", function (e) {
      if (e.key === "Enter") attempt();
    });
    pw.focus();
  }

  if (document.body) {
    mount();
  } else {
    document.addEventListener("DOMContentLoaded", mount);
  }
})();
