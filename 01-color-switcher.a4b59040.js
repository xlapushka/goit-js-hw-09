const t={btnStart:document.querySelector("[data-start]"),btnStop:document.querySelector("[data-stop]"),body:document.querySelector("body"),interval:1e3};let e;function d(){return`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}t.btnStop.setAttribute("disabled","disabled"),t.btnStart.addEventListener("click",(function(){let r=d();t.body.setAttribute("style",`background-color: ${r}`),e=setInterval((()=>{let e=d();t.body.setAttribute("style",`background-color: ${e}`)}),t.interval),t.btnStart.setAttribute("disabled","disabled"),t.btnStop.removeAttribute("disabled","disabled")})),t.btnStop.addEventListener("click",(function(){clearInterval(e),t.btnStop.setAttribute("disabled","disabled"),t.btnStart.removeAttribute("disabled","disabled")}));
//# sourceMappingURL=01-color-switcher.a4b59040.js.map
