$(document).ready(function () {
  var current_fs, next_fs, previous_fs; // fieldsets
  var opacity;
  var current = 1;
  var steps = $("fieldset").length;
  var urlParams = new URLSearchParams(window.location.search);
  var disorderId = urlParams.get("disorder_id");
  console.log("Disorder ID:", disorderId);

  // Function to fetch and populate existing disorder data
  function populateDisorderData(disorderId) {
    $.ajax({
      url: "https://api.agridoot.co.in:8443/dpm/disorders",
      type: "GET",
      success: function (response) {
        console.log("Disorder List:", response.disorderList);

        // Find the data for the specific disorder ID
        var specificDisorder = response.disorderList.find(function (disorder) {
          return disorder.disorder_id == disorderId;
        });

        if (specificDisorder) {
          console.log(
            "Data for Disorder ID",
            disorderId + ":",
            specificDisorder
          );

          // Populate the form fields with the data from specificDisorder
          $("#summary").val(specificDisorder.summary);
          $("#symptoms").val(specificDisorder.symptoms);
          $("#crop_list").val(specificDisorder.crop_list);
          $("#caused_by").val(specificDisorder.caused_by);
          $("#causes").val(specificDisorder.causes);
          $("#preventive_meas").val(specificDisorder.preventive_meas);
          $("#basic_orgtreat").val(specificDisorder.basic_orgtreat);
          $("#sev_chetreat").val(specificDisorder.sev_chetreat);
          $("#pre_cultreat").val(specificDisorder.pre_cultreat);
          $("#image_urls").val(specificDisorder.image_urls);

          // Call setProgressBar to set the progress bar based on current step
          setProgressBar(current);
        } else {
          console.log("Disorder ID not found:", disorderId);
          // Handle case when disorder ID is not found
        }
      },
      error: function (xhr, status, error) {
        // Handle error if data retrieval fails
        alert("Error fetching disorder data: " + error);
        console.error("Error fetching disorder data:", error);
      },
    });
  }

  // Call populateDisorderData when the document is ready to populate existing data
  populateDisorderData(disorderId);

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
    };

    // Send an AJAX request to update the disorder data
    $.ajax({
      url: "https://api.agridoot.co.in:8443/dpm/update_disorder",
      type: "PUT",
      data: updatedData,
      success: function (response) {
        alert("Disorder data updated successfully!");
        console.log("Disorder data updated successfully!", response);
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
    // Call the function to update disorder data
    updateDisorderData();
    return false; // Prevent form submission
  });
});
