$(document).ready(function () {
  var current_fs, next_fs, next_fss, previous_fs; // fieldsets
  var opacity;
  var current = 1;
  var steps = $("fieldset").length;
  var urlParams = new URLSearchParams(window.location.search);
  var disorderId = urlParams.get("disorder_id");
  console.log("Disorder ID:", disorderId);

  // Function to update the disorder data
  function updateDisorderData() {
    // Prepare the updated data here, for example:
    var updatedData = {
      summary: $("#summary").val(),
      symptoms: $("#symptoms").val(),
      crop_list: $("#crop_list").val(),
      caused_by: $("#caused_by").val(),
      causes: $("#causes").val(),
      preventive_meas: $("#preventive_meas").val(),
      basic_orgtreat: $("#basic_orgtreat").val(),
      sev_chetreat: $("#sev_chetreat").val(),
      pre_cultreat: $("#pre_cultreat").val(),
      image_urls: $("#image_urls").val(),

      disorder_id: disorderId,
    };

    // Send an AJAX request to update the disease data
    $.ajax({
      type: "PUT",
      url: "https://api.agridoot.co.in:8443/dpm/update_disorder",
      data: updatedData,
      success: function (response) {
        alert("Disorder data updated successfully!");
        console.log("Disorder data updated successfully!", response);
        // Optionally, you can redirect the user or perform other actions upon successful update
      },
      error: function (xhr, status, error) {
        if (xhr.status === 404) {
          alert("Error updating disorder data: Endpoint not found");
          console.error("Error updating disorder data: Endpoint not found");
        } else {
          alert("Error updating disorder data...");
          console.error("Error updating disorder data:", error);
        }
        if (status.status === 404) {
          alert("Error updating disorder data: Endpoint not found");
          console.error("Error updating disorder data: Endpoint not found");
        } else {
          alert("Error updating disorder data...");
          console.error("Error updating disorder data:", error);
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
    updateDisorderData();
    return false; // Prevent form submission
  });
});
