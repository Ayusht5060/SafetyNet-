function login() {
  let username = document.getElementById("username").value.trim();
  let password = document.getElementById("password").value.trim();
  let role = document.getElementById("role").value;
  let errorMessage = document.getElementById("error-message");
  
  // Predefined credentials
  let users = {
    "user": { username: "user", password: "12345" },
    "authority": { username: "admin", password: "12345" }
  };
  
  // Validation
  if (username === "" || password === "") {
    errorMessage.textContent = "⚠️ Please fill in all fields!";
    return;
  }
  
  // Check credentials
  if (role in users && username === users[role].username && password === users[role].password) {
    if (role === "user") {
      window.location.href = "intro.html";
    } else if (role === "authority") {
      window.location.href = "authority_dashboard.html";
    }
  } else {
    errorMessage.textContent = "❌ Invalid username or password!";
  }
}