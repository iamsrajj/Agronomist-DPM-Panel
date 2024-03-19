// JavaScript code to fetch user_id from the URL
document.getElementById("dash").addEventListener("click", function () {
  // Fetch user_id from the URL
  var urlParams = new URLSearchParams(window.location.search);
  var userId = urlParams.get("user_id");

  // Use the userId as needed
  console.log("User ID:", userId);
  // Redirect to the next page
  window.location.href = `../html/disease.html?user_id=${userId}`;
});
document.getElementById("disorder").addEventListener("click", function () {
  // Fetch user_id from the URL
  var urlParams = new URLSearchParams(window.location.search);
  var userId = urlParams.get("user_id");

  // Use the userId as needed
  console.log("User ID:", userId);
  // Redirect to the next page
  window.location.href = `../html/disorder.html?user_id=${userId}`;
});
document.getElementById("pest").addEventListener("click", function () {
  // Fetch user_id from the URL
  var urlParams = new URLSearchParams(window.location.search);
  var userId = urlParams.get("user_id");

  // Use the userId as needed
  console.log("User ID:", userId);
  // Redirect to the next page
  window.location.href = `../html/pest_register.html?user_id=${userId}`;
});

document.getElementById("deficiency").addEventListener("click", function () {
  // Fetch user_id from the URL
  var urlParams = new URLSearchParams(window.location.search);
  var userId = urlParams.get("user_id");

  // Use the userId as needed
  console.log("User ID:", userId);
  // Redirect to the next page
  window.location.href = `../html/deficiency_register.html?user_id=${userId}`;
});
