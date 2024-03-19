$(document).ready(function () {
  var current_fs, next_fs, next_fss, previous_fs; // fieldsets
  var opacity;
  var current = 1;
  var steps = $("fieldset").length;
  var urlParams = new URLSearchParams(window.location.search);
  var pestId = urlParams.get("pest_id");
  console.log("Pest ID:", pestId);

  // Function to update the disease data
  function updateDiseaseData() {
    // Prepare the updated data here, for example:
    var updatedData = {
      // Add your updated data fields here
      // For demonstration, let's assume you have a form with input fields with IDs 'summary', 'symptoms', etc.
      summary: $("#summary").val(),
      symptoms: $("#symptoms").val(),
      life_cycle: $("#life_cycle").val(),
      crop_list: $("#crop_list").val(),
      min_atmtemp: +$("#min_atmtemp").val(), // Parse as integer
      max_atmtemp: +$("#max_atmtemp").val(), // Convert to number
      min_hum: +$("#min_hum").val(), // Convert to number
      max_hum: +$("#max_hum").val(), // Convert to number
      min_lwet: +$("#min_lwet").val(), // Convert to number
      max_lwet: +$("#max_lwet").val(), // Convert to number
      min_smoist: +$("#min_smoist").val(), // Convert to number
      max_smoist: +$("#max_smoist").val(), // Convert to number
      min_other: +$("#min_other").val(), // Convert to number
      max_other: +$("#max_other").val(), // Convert to number // Parse as integer
      other_name: $("#other_name").val(),
      basic_orgtreat: $("#basic_orgtreat").val(),
      sev_chetreat: $("#sev_chetreat").val(),
      pre_cultreat: $("#pre_cultreat").val(),

      pest_id: pestId,
      // Add other fields as needed
    };

    // Send an AJAX request to update the disease data
    $.ajax({
      type: "PUT",
      url: "http://103.76.249.121:3000/update_pest",
      data: updatedData,
      success: function (response) {
        alert("Pest data updated successfully!");
        console.log("Pest data updated successfully!", response);
        // Optionally, you can redirect the user or perform other actions upon successful update
      },
      error: function (xhr, status, error) {
        if (xhr.status === 404) {
          alert("Error updating pest data: Endpoint not found");
          console.error("Error updating pest data: Endpoint not found");
        } else {
          alert("Error updating pest data...");
          console.error("Error updating pest data:", error);
        }
        if (status.status === 404) {
          alert("Error updating pest data: Endpoint not found");
          console.error("Error updating pest data: Endpoint not found");
        } else {
          alert("Error updating pest data...");
          console.error("Error updating pest data:", error);
        }
      },
    });
  }

  $(".submit").click(function () {
    current_fs = $(this).parent();
    next_fs = $(this).parent().next();

    // Add validation logic here if needed

    // Show the next fieldset
    next_fs.show();

    // Hide the current fieldset with style
    current_fs.animate(
      { opacity: 0 },
      {
        step: function (now) {
          // for making fieldset appear animation
          opacity = 1 - now;

          current_fs.css({
            display: "none",
            position: "relative",
          });
          next_fs.css({ opacity: opacity });
        },
        duration: 600,
      }
    );
    setProgressBar(++current);
  });

  $(".previous").click(function () {
    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev();

    // Show the previous fieldset
    previous_fs.show();

    // Hide the current fieldset with style
    current_fs.animate(
      { opacity: 0 },
      {
        step: function (now) {
          // for making fieldset appear animation
          opacity = 1 - now;

          current_fs.css({
            display: "none",
            position: "relative",
          });
          previous_fs.css({ opacity: opacity });
        },
        duration: 600,
      }
    );
    setProgressBar(--current);
  });

  function setProgressBar(curStep) {
    var percent = parseFloat(100 / steps) * curStep;
    percent = percent.toFixed();
    $(".progress-bar").css("width", percent + "%");
  }

  $(".submit").click(function () {
    // Call the function to update disease data
    updateDiseaseData();
    return false; // Prevent form submission
  });
});
