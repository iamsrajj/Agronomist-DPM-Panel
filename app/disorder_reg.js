// Function to extract query parameters from the URL
function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// Event listener for when the DOM content is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Get the registration form element
  const registerForm = document.getElementById("disorders_register");

  // Event listener for when the registration form is submitted
  registerForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(registerForm); // Get form data
    const userId = getQueryParam("user_id"); // Get user ID from query parameters

    // Append user_id to the form data
    formData.append("byuser_id", userId);

    // Send the data to the API endpoint for disease registration
    fetch("http://103.76.249.121:3000/disorder_register", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); // Parse JSON response
        } else if (response.status === 404) {
          throw new Error("Disorder already registered!");
        } else if (response.status === 500) {
          throw new Error("Server error occurred");
        } else {
          throw new Error("Failed to sign up");
        }
      })
      .then((data) => {
        console.log("Disease registration successful:", data);
        alert("Disorder registration successful!");
      })
      .catch((error) => {
        console.error("Disease registration failed:", error);
        // Handle error, such as displaying an error message to the user
        alert("Failed to register disorder. Please try again later.");
      });
  });
});
