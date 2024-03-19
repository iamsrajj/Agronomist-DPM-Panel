function fetchpestData() {
  fetch("http://103.76.249.121:3000/pests")
    .then((response) => response.json())
    .then((data) => {
      // Check if the response status is true
      if (data.response_status) {
        // Get the list of pest
        const pest = data.pestList;

        // Populate the table with the retrieved data
        const tableBody = document.getElementById("submitted_data");
        pest.forEach((pest) => {
          const newRow = document.createElement("tr");
          newRow.innerHTML = `
                        <td>${pest.pest_id}</td>
                        <td>${pest.pest_name}</td>
                        <td>${pest.scientific_name}</td>
                        <td>
                            <button class="btn btn-primary btn-sm" onclick="openUpdateForm(${pest.pest_id}, '${pest.pest_name}', '${pest.scientific_name}')">Update</button>
                            <button class="btn btn-info btn-sm" onclick="viewDetail('${pest.pest_name}', '${pest.scientific_name}')">View</button>
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

// Call the function to fetch pest data when the page loads
fetchpestData();

// Function to submit new pest data to the server
document
  .getElementById("pest_register")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    // Get form data
    var pestName = document.getElementById("pest_name").value;
    var scientificName = document.getElementById("scientific_name").value;

    // Send data to the server
    sendDataToServer(pestName, scientificName);
  });

// Function to open update form
function openUpdateForm(pestId, pestName, scientificName) {
  // Redirect to the update page with pest ID as a parameter
  window.location.href = `../html/pest_update.html?pest_id=${pestId}`;
}

// Function to view pest detail
function viewDetail(pestName, scientificName) {
  // Implement your logic to view pest detail
  console.log("View detail for:", pestName, scientificName);
}

// Function to send new pest data to the server
function sendDataToServer(pestName, scientificName) {
  // fetch("http://103.76.249.121:3000/addpest", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     pest_name: pestName,
  //     scientific_name: scientificName,
  //   }),
  // })
  fetch("http://103.76.249.121:3000/pest_register", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle response from the server
      if (data.response_status) {
        // Refresh the table with updated data
        document.getElementById("submitted_data").innerHTML = "";
        fetchpestData();
      } else {
        console.error(data.response_message);
      }
    })
    .catch((error) => {
      console.error("Error sending data to server:", error);
    });
}
