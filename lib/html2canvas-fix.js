// Monkey patch to remove LAB colors before html2canvas renders
export function cleanLabColors() {
  const all = document.querySelectorAll("*");

  all.forEach(el => {
    const style = window.getComputedStyle(el);

    ["color", "backgroundColor", "borderColor", "shadowColor"].forEach(prop => {
      const v = style[prop];
      if (v && v.includes("lab(")) {
        el.style[prop] = "rgb(0,0,0)";
      }
    });
  });
}
