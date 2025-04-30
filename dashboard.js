function toggleSidebar() {
  let sidebar = document.getElementById("sidebar");
  let mainContent = document.getElementById("main-content");
  
  if (sidebar.style.width === "250px") {
    sidebar.style.width = "0";
    mainContent.style.marginLeft = "0";
  } else {
    sidebar.style.width = "250px";
    mainContent.style.marginLeft = "250px";
  }
}

// Close sidebar when clicking outside
document.addEventListener("click", function(event) {
    let sidebar = document.getElementById("sidebar");
    let mainContent = document.getElementById("main-content");
    let menuButton = document.querySelector(".menu-btn");

    if (!sidebar.contains(event.target) && event.target !== menuButton) {
        sidebar.classList.remove("open");
        mainContent.classList.remove("shift");
    }
});