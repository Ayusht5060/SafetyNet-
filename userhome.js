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

document.addEventListener("click", function(event) {
  let sidebar = document.getElementById("sidebar");
  let mainContent = document.getElementById("main-content");
  let menuButton = document.querySelector(".menu-btn");
  
  if (!sidebar.contains(event.target) && event.target !== menuButton) {
    sidebar.style.width = "0";
    mainContent.style.marginLeft = "0";
  }
});

function goToChatbot() {
  window.location.href = "chatbot.html";
}

function goToComplaint() {
  window.location.href = "complaint.html";
}

function uploadVideo() {
  alert("✅ Video uploaded successfully! It will be reviewed by the authority.");
}