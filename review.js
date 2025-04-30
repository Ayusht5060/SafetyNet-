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
// Submit Review
function submitReview() {
  const place = document.getElementById("place").value;
  const reviewText = document.getElementById("review").value;
  const reviewsDiv = document.getElementById("reviews");
  
  if (place === "" || reviewText === "") {
    alert("Please select a place and write a review!");
    return;
  }
  
  // Create review box
  const reviewBox = document.createElement("div");
  reviewBox.classList.add("review-box");
  reviewBox.innerHTML = `<strong>${place}:</strong> ${reviewText}`;
  
  // Append the new review
  reviewsDiv.appendChild(reviewBox);
  
  // Clear input fields
  document.getElementById("place").value = "";
  document.getElementById("review").value = "";
}