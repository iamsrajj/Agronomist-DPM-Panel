$(document).ready(function () {
  var current_fs, next_fs, previous_fs; // fieldsets
  var opacity;
  var current = 1;
  var steps = $("fieldset").length;
  var urlParams = new URLSearchParams(window.location.search);
  var deficiencyId = urlParams.get("deficiency_id");
  console.log("Deficiency ID:", deficiencyId);

  // Function to fetch and populate existing deficiency data
  function populateDeficiencyData(deficiencyId) {
    $.ajax({
      url: "https://api.agridoot.co.in:8443/dpm/deficiencys",
      type: "GET",
      success: function (response) {
        console.log("Deficiency List:", response.deficiencyList);

        // Find the data for the specific deficiency ID
        var specificDeficiency = response.deficiencyList.find(function (
          deficiency
        ) {
          return deficiency.deficiency_id == deficiencyId;
        });

        if (specificDeficiency) {
          console.log(
            "Data for Deficiency ID",
            deficiencyId + ":",
            specificDeficiency
          );

          // Populate the form fields with the data from specificDeficiency
          $("#summary").val(specificDeficiency.summary);
          $("#symptoms").val(specificDeficiency.symptoms);
          $("#crop_list").val(specificDeficiency.crop_list);
          $("#caused_by").val(specificDeficiency.caused_by);
          $("#causes").val(specificDeficiency.causes);
          $("#preventive_meas").val(specificDeficiency.preventive_meas);
          $("#basic_orgtreat").val(specificDeficiency.basic_orgtreat);
          $("#sev_chetreat").val(specificDeficiency.sev_chetreat);
          $("#pre_cultreat").val(specificDeficiency.pre_cultreat);
          $("#image_urls").val(specificDeficiency.image_urls);

          // Call setProgressBar to set the progress bar based on current step
          setProgressBar(current);
        } else {
          console.log("Deficiency ID not found:", deficiencyId);
          // Handle case when deficiency ID is not found
        }
      },
      error: function (xhr, status, error) {
        // Handle error if data retrieval fails
        alert("Error fetching deficiency data: " + error);
        console.error("Error fetching deficiency data:", error);
      },
    });
  }

  // Call populateDeficiencyData when the document is ready to populate existing data
  populateDeficiencyData(deficiencyId);

  // Function to update the deficiency data
  function updateDeficiencyData() {
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
    };

    // Send an AJAX request to update the deficiency data
    $.ajax({
      url: "https://api.agridoot.co.in:8443/dpm/update_deficiency",
      type: "PUT",
      data: updatedData,
      success: function (response) {
        alert("Deficiency data updated successfully!");
        console.log("Deficiency data updated successfully!", response);
        // Optionally, you can redirect the user or perform other actions upon successful update
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
    // Call the function to update deficiency data
    updateDeficiencyData();
    return false; // Prevent form submission
  });
});
