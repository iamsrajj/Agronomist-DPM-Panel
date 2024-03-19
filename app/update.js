$(document).ready(function () {
  var current_fs, next_fs, next_fss, previous_fs; // fieldsets
  var opacity;
  var current = 1;
  var steps = $("fieldset").length;
  var urlParams = new URLSearchParams(window.location.search);
  var diseaseId = urlParams.get("disease_id");
  console.log("Disease ID:", diseaseId);

  // Function to update the disease data
  function updateDiseaseData() {
    // Prepare the updated data here, for example:
    var updatedData = {
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

      disease_id: diseaseId,
      // Add other fields as needed
    };

    // Send an AJAX request to update the disease data
    $.ajax({
      url: "http://103.76.249.121:3000/update_dis",
      type: "PUT",
      data: updatedData,
      success: function (response) {
        alert("Disease data updated successfully!");
        console.log("Disease data updated successfully!", response);
        // Optionally, you can redirect the user or perform other actions upon successful update
      },
      error: function (xhr, status, error) {
        if (xhr.status === 404) {
          alert("Error updating disease data: Endpoint not found");
          console.error("Error updating disease data: Endpoint not found");
        } else {
          alert("Error updating disease data...");
          console.error("Error updating disease data:", error);
        }
        if (status.status === 404) {
          alert("Error updating disease data: Endpoint not found");
          console.error("Error updating disease data: Endpoint not found");
        } else {
          alert("Error updating disease data...");
          console.error("Error updating disease data:", error);
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
