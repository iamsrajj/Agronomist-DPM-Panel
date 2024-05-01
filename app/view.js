$(document).ready(function () {
  var current_fs, next_fs, previous_fs; // fieldsets
  var opacity;
  var current = 1;
  var steps = $("fieldset").length;
  var urlParams = new URLSearchParams(window.location.search);
  var diseaseId = urlParams.get("disease_id");
  console.log("Disease ID:", diseaseId);

  // Function to fetch and populate existing disease data
  function populateDiseaseData(diseaseId) {
    $.ajax({
      url: "https://api.agridoot.co.in:8443/dpm/diseases",
      type: "GET",
      success: function (response) {
        console.log("Disease List:", response.diseaseList);

        // Find the data for the specific disease ID
        var specificDisease = response.diseaseList.find(function (disease) {
          return disease.disease_id == diseaseId;
        });

        if (specificDisease) {
          console.log("Data for Disease ID", diseaseId + ":", specificDisease);

          // Populate the form fields with the data from specificDisease
          $("#summary").val(specificDisease.summary);
          $("#symptoms").val(specificDisease.symptoms);
          $("#life_cycle").val(specificDisease.life_cycle);
          $("#crop_list").val(specificDisease.crop_list);
          $("#min_atmtemp").val(specificDisease.min_atmtemp);
          $("#max_atmtemp").val(specificDisease.max_atmtemp);
          $("#dur_atmtemp").val(specificDisease.dur_atmtemp);
          $("#min_hum").val(specificDisease.min_hum);
          $("#max_hum").val(specificDisease.max_hum);
          $("#dur_hum").val(specificDisease.dur_hum);
          $("#min_lwet").val(specificDisease.min_lwet);
          $("#max_lwet").val(specificDisease.max_lwet);
          $("#dur_lwet").val(specificDisease.dur_lwet);
          $("#min_smoist").val(specificDisease.min_smoist);
          $("#max_smoist").val(specificDisease.max_smoist);
          $("#dur_smoist").val(specificDisease.dur_smoist);
          $("#min_stemp").val(specificDisease.min_stemp);
          $("#max_stemp").val(specificDisease.max_stemp);
          $("#dur_stemp").val(specificDisease.dur_stemp);
          $("#min_lux").val(specificDisease.min_lux);
          $("#max_lux").val(specificDisease.max_lux);
          $("#dur_lux").val(specificDisease.dur_lux);
          $("#min_uv").val(specificDisease.min_uv);
          $("#max_uv").val(specificDisease.max_uv);
          $("#dur_uv").val(specificDisease.dur_uv);
          $("#min_rainfall").val(specificDisease.min_rainfall);
          $("#max_rainfall").val(specificDisease.max_rainfall);
          $("#dur_rainfall").val(specificDisease.dur_rainfall);
          $("#min_windspeed").val(specificDisease.min_windspeed);
          $("#max_windspeed").val(specificDisease.max_windspeed);
          $("#dur_windspeed").val(specificDisease.dur_windspeed);
          $("#other_name1").val(specificDisease.other_name1);
          $("#min_other1").val(specificDisease.min_other1);
          $("#max_other1").val(specificDisease.max_other1);
          $("#dur_other1").val(specificDisease.dur_other1);
          $("#other_name2").val(specificDisease.other_name2);
          $("#min_other2").val(specificDisease.min_other2);
          $("#max_other2").val(specificDisease.max_other2);
          $("#dur_other2").val(specificDisease.dur_other2);
          $("#other_name3").val(specificDisease.other_name3);
          $("#min_other3").val(specificDisease.min_other3);
          $("#max_other3").val(specificDisease.max_other3);
          $("#dur_other3").val(specificDisease.dur_other3);
          $("#basic_orgtreat").val(specificDisease.basic_orgtreat);
          $("#sev_chetreat").val(specificDisease.sev_chetreat);
          $("#pre_cultreat").val(specificDisease.pre_cultreat);
          $("#image_urls").val(specificDisease.image_urls);

          // Call setProgressBar to set the progress bar based on current step
          setProgressBar(current);
        } else {
          console.log("Disease ID not found:", diseaseId);
          // Handle case when disease ID is not found
        }
      },
      error: function (xhr, status, error) {
        // Handle error if data retrieval fails
        alert("Error fetching disease data: " + error);
        console.error("Error fetching disease data:", error);
      },
    });
  }

  // Call populateDiseaseData when the document is ready to populate existing data
  populateDiseaseData(diseaseId);

  // Function to update the disease data
  function updateDiseaseData() {
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

    // Send an AJAX request to update the disease data
    $.ajax({
      url: "https://api.agridoot.co.in:8443/dpm/update_dis",
      type: "PUT",
      data: updatedData,
      success: function (response) {
        alert("Disease data updated successfully!");
        console.log("Disease data updated successfully!", response);
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
    // Call the function to update disease data
    updateDiseaseData();
    return false; // Prevent form submission
  });
});
