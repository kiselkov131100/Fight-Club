document.querySelector("#firstFighter").innerHTML =
  localStorage.getItem("firstFighter");
document.querySelector("#secondFighter").innerHTML =
  localStorage.getItem("secondFighter");
document.querySelector("button").addEventListener("click", () => {
  localStorage.clear();
  window.location.reload();
});
