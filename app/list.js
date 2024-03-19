function fetchDiseaseData() {
  fetch("http://103.76.249.121:3000/diseases")
    .then((response) => response.json())
    .then((data) => {
      // Check if the response status is true
      if (data.response_status) {
        // Get the list of diseases
        const diseases = data.diseaseList;

        // Populate the table with the retrieved data
        const tableBody = document.getElementById("submitted_data");
        diseases.forEach((disease) => {
          const newRow = document.createElement("tr");
          newRow.innerHTML = `
                        <td>${disease.disease_id}</td>
                        <td>${disease.disease_name}</td>
                        <td>${disease.botanical_name}</td>
                        <td>
                            <button class="btn btn-primary btn-sm" onclick="openUpdateForm(${disease.disease_id}, '${disease.disease_name}', '${disease.botanical_name}')">Update</button>
                            <button class="btn btn-info btn-sm" onclick="viewDetail('${disease.disease_name}', '${disease.botanical_name}')">View</button>
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

// Call the function to fetch disease data when the page loads
fetchDiseaseData();

// Function to submit new disease data to the server
document
  .getElementById("disease_register")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    // Get form data
    var diseaseName = document.getElementById("disease_name").value;
    var botanicalName = document.getElementById("botanical_name").value;

    // Send data to the server
    sendDataToServer(diseaseName, botanicalName);
  });

// Function to open update form
function openUpdateForm(diseaseId, diseaseName, botanicalName) {
  // Redirect to the update page with disease ID as a parameter
  window.location.href = `../html/update_dis.html?disease_id=${diseaseId}`;
}

// Function to view disease detail
function viewDetail(diseaseName, botanicalName) {
  // Implement your logic to view disease detail
  console.log("View detail for:", diseaseName, botanicalName);
}

// Function to send new disease data to the server
function sendDataToServer(diseaseName, botanicalName) {
  // fetch("http://103.76.249.121:3000/addDisease", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     disease_name: diseaseName,
  //     botanical_name: botanicalName,
  //   }),
  // })
  fetch("http://103.76.249.121:3000/dis_register", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle response from the server
      if (data.response_status) {
        // Refresh the table with updated data
        document.getElementById("submitted_data").innerHTML = "";
        fetchDiseaseData();
      } else {
        console.error(data.response_message);
      }
    })
    .catch((error) => {
      console.error("Error sending data to server:", error);
    });
}
