function fetchdeficiencyData() {
  fetch("https://api.agridoot.co.in:8443/dpm/deficiencys")
    .then((response) => response.json())
    .then((data) => {
      // Check if the response status is true
      if (data.response_status) {
        // Get the list of deficiencys
        const deficiencys = data.deficiencyList;

        // Populate the table with the retrieved data
        const tableBody = document.getElementById("submitted_data");
        deficiencys.forEach((deficiency) => {
          const newRow = document.createElement("tr");
          newRow.innerHTML = `
                        <td>${deficiency.deficiency_id}</td>
                        <td>${deficiency.deficiency_name}</td>
                        <td>
                            <button class="btn btn-info btn-sm" onclick="viewDetail(${deficiency.deficiency_id}, '${deficiency.deficiency_name}')">Edit</button>
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

// Call the function to fetch deficiency data when the page loads
fetchdeficiencyData();

// Function to submit new deficiency data to the server
document
  .getElementById("deficiency_register")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    // Get form data
    var deficiencyName = document.getElementById("deficiency_name").value;

    // Send data to the server
    sendDataToServer(deficiencyName);
  });

// Function to open update form
function openUpdateForm(deficiencyId, deficiencyName) {
  // Redirect to the update page with deficiency ID as a parameter
  window.location.href = `../html/update_deficiency.html?deficiency_id=${deficiencyId}`;
}

// Function to view deficiency detail
function viewDetail(deficiencyId, deficiencyName) {
  // Implement your logic to view deficiency detail
  window.location.href = `../html/update_deficiency.html?deficiency_id=${deficiencyId}`;
}

// Function to send new deficiency data to the server
function sendDataToServer(deficiencyName) {
  fetch("https://api.agridoot.co.in:8443/dpm/deficiency_register", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle response from the server
      if (data.response_status) {
        // Refresh the table with updated data
        document.getElementById("submitted_data").innerHTML = "";
        fetchdeficiencyData();
      } else {
        console.error(data.response_message);
      }
    })
    .catch((error) => {
      console.error("Error sending data to server:", error);
    });
}
