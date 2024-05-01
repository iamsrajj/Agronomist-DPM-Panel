function fetchdisorderData() {
  fetch("https://api.agridoot.co.in:8443/dpm/disorders")
    .then((response) => response.json())
    .then((data) => {
      // Check if the response status is true
      if (data.response_status) {
        // Get the list of disorders
        const disorders = data.disorderList;

        // Populate the table with the retrieved data
        const tableBody = document.getElementById("submitted_data");
        disorders.forEach((disorder) => {
          const newRow = document.createElement("tr");
          newRow.innerHTML = `
                        <td>${disorder.disorder_id}</td>
                        <td>${disorder.disorder_name}</td>
                        <td>
                            <button class="btn btn-info btn-sm" onclick="viewDetail(${disorder.disorder_id}, '${disorder.disorder_name}')">Edit</button>
                        </td>`;
          tableBody.appendChild(newRow);
        });
      } else {
        console.error(data.response_message);
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

// Call the function to fetch disorder data when the page loads
fetchdisorderData();

// Function to submit new disorder data to the server
document
  .getElementById("disorder_register")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    // Get form data
    var disorderName = document.getElementById("disorder_name").value;

    // Send data to the server
    sendDataToServer(disorderName);
  });

// Function to open update form
function openUpdateForm(disorderId, disorderName) {
  // Redirect to the update page with disorder ID as a parameter
  window.location.href = `../html/update_disorder.html?disorder_id=${disorderId}`;
}

// Function to view disorder detail
function viewDetail(disorderId, disorderName) {
  // Implement your logic to view disorder detail
  window.location.href = `../html/update_disorder.html?disorder_id=${disorderId}`;
}

// Function to send new disorder data to the server
function sendDataToServer(disorderName) {
  fetch("https://api.agridoot.co.in:8443/dpm/disorder_register", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle response from the server
      if (data.response_status) {
        // Refresh the table with updated data
        document.getElementById("submitted_data").innerHTML = "";
        fetchdisorderData();
      } else {
        console.error(data.response_message);
      }
    })
    .catch((error) => {
      console.error("Error sending data to server:", error);
    });
}
