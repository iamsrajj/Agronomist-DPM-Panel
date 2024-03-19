document.addEventListener("DOMContentLoaded", function () {
  const signUpForm = document.getElementById("signupForm");

  signUpForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(signUpForm);

    // Validate mobile number
    function validateMobileNumber(mobileNumber) {
      return mobileNumber.length === 10;
    }

    // Validate password
    function validatePassword(password) {
      return /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(
        password
      );
    }

    // Check if both mobile number and password are valid
    const mobileNumber = formData.get("mob");
    const password = formData.get("password");
    if (!validateMobileNumber(mobileNumber)) {
      alert("Mobile number must be 10 digits long!");
      return;
    }
    if (!validatePassword(password)) {
      alert(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one digit, and one special character."
      );
      return;
    }

    // Send the data to the API endpoint for signup
    fetch("http://103.76.249.121:3000/signup", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); // Parse JSON response
        } else if (response.status === 404) {
          throw new Error("User already registered");
        } else if (response.status === 500) {
          throw new Error("Server error occurred");
        } else {
          throw new Error("Failed to sign up");
        }
      })

      .then((data) => {
        console.log("Signup successful:", data);
        window.location.href = "login.html"; // Redirect to login page
      })
      .catch((error) => {
        console.error("Signup failed:", error);
        if (error.message === "User already registered") {
          alert("User already registered. Please login.");
        } else if (error.message === "Server error occurred") {
          alert("Sign Up Failed | Please try again later.");
        }
      });
  });

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(loginForm);

    loginUser(formData);
  });

  function loginUser(formData) {
    fetch("http://103.76.249.121:3000/signin", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); // Parse JSON response
        } else {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
      })
      .then((data) => {
        console.log("Login successful:", data);
        const userId = data.userDetails.user_id; // Extract user ID from response data
        redirectToDiseasePage(userId);
      })
      .catch((error) => {
        console.error("Login failed:", error);
        handleLoginError(error);
      });
  }

  function redirectToDiseasePage(userId) {
    window.location.href = `../html/dashboard.html?user_id=${userId}`; // Redirect to disease page with user ID
  }

  function handleLoginError(error) {
    let errorMessage = "Failed to login. Please try again later.";
    if (error.message.includes("401")) {
      errorMessage = "Invalid username or password. Please try again.";
    } else if (error.message.includes("500")) {
      errorMessage = "Server error occurred. Please try again later.";
    }
    alert(errorMessage);
  }

  const signInBtn = document.querySelector("#sign-in-btn");
  const signUpBtn = document.querySelector("#sign-up-btn");
  const container = document.querySelector(".container");

  signUpBtn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
  });

  signInBtn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
  });
});
