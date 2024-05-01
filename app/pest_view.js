$(document).ready(function () {
  var current_fs, next_fs, previous_fs; // fieldsets
  var opacity;
  var current = 1;
  var steps = $("fieldset").length;
  var urlParams = new URLSearchParams(window.location.search);
  var pestId = urlParams.get("pest_id");
  console.log("Pest ID:", pestId);

  // Function to fetch and populate existing pest data
  function populatePestData(pestId) {
    $.ajax({
      url: "https://api.agridoot.co.in:8443/dpm/pests",
      type: "GET",
      success: function (response) {
        console.log("Pest List:", response.pestList);

        // Find the data for the specific peste ID
        var specificPest = response.pestList.find(function (pest) {
          return pest.pest_id == pestId;
        });

        if (specificPest) {
          console.log("Data for Pest ID", pestId + ":", specificPest);

          // Populate the form fields with the data from specificPest
          $("#summary").val(specificPest.summary);
          $("#symptoms").val(specificPest.symptoms);
          $("#life_cycle").val(specificPest.life_cycle);
          $("#crop_list").val(specificPest.crop_list);
          $("#min_atmtemp").val(specificPest.min_atmtemp);
          $("#max_atmtemp").val(specificPest.max_atmtemp);
          $("#dur_atmtemp").val(specificPest.dur_atmtemp);
          $("#min_hum").val(specificPest.min_hum);
          $("#max_hum").val(specificPest.max_hum);
          $("#dur_hum").val(specificPest.dur_hum);
          $("#min_lwet").val(specificPest.min_lwet);
          $("#max_lwet").val(specificPest.max_lwet);
          $("#dur_lwet").val(specificPest.dur_lwet);
          $("#min_smoist").val(specificPest.min_smoist);
          $("#max_smoist").val(specificPest.max_smoist);
          $("#dur_smoist").val(specificPest.dur_smoist);
          $("#min_stemp").val(specificPest.min_stemp);
          $("#max_stemp").val(specificPest.max_stemp);
          $("#dur_stemp").val(specificPest.dur_stemp);
          $("#min_lux").val(specificPest.min_lux);
          $("#max_lux").val(specificPest.max_lux);
          $("#dur_lux").val(specificPest.dur_lux);
          $("#min_uv").val(specificPest.min_uv);
          $("#max_uv").val(specificPest.max_uv);
          $("#dur_uv").val(specificPest.dur_uv);
          $("#min_rainfall").val(specificPest.min_rainfall);
          $("#max_rainfall").val(specificPest.max_rainfall);
          $("#dur_rainfall").val(specificPest.dur_rainfall);
          $("#min_windspeed").val(specificPest.min_windspeed);
          $("#max_windspeed").val(specificPest.max_windspeed);
          $("#dur_windspeed").val(specificPest.dur_windspeed);
          $("#other_name1").val(specificPest.other_name1);
          $("#min_other1").val(specificPest.min_other1);
          $("#max_other1").val(specificPest.max_other1);
          $("#dur_other1").val(specificPest.dur_other1);
          $("#other_name2").val(specificPest.other_name2);
          $("#min_other2").val(specificPest.min_other2);
          $("#max_other2").val(specificPest.max_other2);
          $("#dur_other2").val(specificPest.dur_other2);
          $("#other_name3").val(specificPest.other_name3);
          $("#min_other3").val(specificPest.min_other3);
          $("#max_other3").val(specificPest.max_other3);
          $("#dur_other3").val(specificPest.dur_other3);
          $("#basic_orgtreat").val(specificPest.basic_orgtreat);
          $("#sev_chetreat").val(specificPest.sev_chetreat);
          $("#pre_cultreat").val(specificPest.pre_cultreat);
          $("#image_urls").val(specificPest.image_urls);

          // Call setProgressBar to set the progress bar based on current step
          setProgressBar(current);
        } else {
          console.log("Pest ID not found:", pestId);
          // Handle case when pest ID is not found
        }
      },
      error: function (xhr, status, error) {
        // Handle error if data retrieval fails
        alert("Error fetching pest data: " + error);
        console.error("Error fetching pest data:", error);
      },
    });
  }

  // Call populatePestData when the document is ready to populate existing data
  populatePestData(pestId);

  // Function to update the pest data
  function updatePestData() {
    // Prepare the updated data here, for example:
    var updatedData = {
      summary: $("#summary").val(),
      symptoms: $("#symptoms").val(),
      life_cycle: $("#life_cycle").val(),
      crop_list: $("#crop_list").val(),
      min_atmtemp: +$("#min_atmtemp").val(),
      max_atmtemp: +$("#max_atmtemp").val(),
      dur_atmtemp: +$("#dur_atmtemp").val(),
      min_hum: +$("#min_hum").val(),
      max_hum: +$("#max_hum").val(),
      dur_hum: +$("#dur_hum").val(),
      min_lwet: +$("#min_lwet").val(),
      max_lwet: +$("#max_lwet").val(),
      dur_lwet: +$("#dur_lwet").val(),
      min_smoist: +$("#min_smoist").val(),
      max_smoist: +$("#max_smoist").val(),
      dur_smoist: +$("#dur_smoist").val(),
      min_stemp: +$("#min_stemp").val(),
      max_stemp: +$("#max_stemp").val(),
      dur_stemp: +$("#dur_stemp").val(),
      min_lux: +$("#min_lux").val(),
      max_lux: +$("#max_lux").val(),
      dur_lux: +$("#dur_lux").val(),
      min_uv: +$("#min_uv").val(),
      max_uv: +$("#max_uv").val(),
      dur_uv: +$("#dur_uv").val(),
      min_rainfall: +$("#min_rainfall").val(),
      max_rainfall: +$("#max_rainfall").val(),
      dur_rainfall: +$("#dur_rainfall").val(),
      min_windspeed: +$("#min_windspeed").val(),
      max_windspeed: +$("#max_windspeed").val(),
      dur_windspeed: +$("#dur_windspeed").val(),
      other_name1: $("#other_name1").val(),
      min_other1: +$("#min_other1").val(),
      max_other1: +$("#max_other1").val(),
      dur_other1: +$("#dur_other1").val(),
      other_name2: $("#other_name2").val(),
      min_other2: +$("#min_other2").val(),
      max_other2: +$("#max_other2").val(),
      dur_other2: +$("#dur_other2").val(),
      other_name3: $("#other_name3").val(),
      min_other3: +$("#min_other3").val(),
      max_other3: +$("#max_other3").val(),
      dur_other3: +$("#dur_other3").val(),
      basic_orgtreat: $("#basic_orgtreat").val(),
      sev_chetreat: $("#sev_chetreat").val(),
      pre_cultreat: $("#pre_cultreat").val(),
      image_urls: $("#image_urls").val(),
    };

    // Send an AJAX request to update the pest data
    $.ajax({
      url: "https://api.agridoot.co.in:8443/dpm/update_pest",
      type: "PUT",
      data: updatedData,
      success: function (response) {
        alert("Pest data updated successfully!");
        console.log("Pest data updated successfully!", response);
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
    // Call the function to update pest data
    updatePestData();
    return false; // Prevent form submission
  });
});
