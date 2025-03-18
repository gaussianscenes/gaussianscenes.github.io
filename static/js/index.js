window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "./static/interpolation/stacked";
var NUM_INTERP_FRAMES = 240;

var interp_images = [];
function preloadInterpolationImages() {
  // for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
  //   var path = INTERP_BASE + '/' + String(i).padStart(6, '0') + '.jpg';
  //   interp_images[i] = new Image();
  //   interp_images[i].src = path;
  // }
}

function setInterpolationImage(i) {
  // var image = interp_images[i];
  // image.ondragstart = function() { return false; };
  // image.oncontextmenu = function() { return false; };
  // $('#interpolation-image-wrapper').empty().append(image);
}


$(document).ready(function() {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    var options = {
			slidesToScroll: 1,
			slidesToShow: 3,
			loop: true,
			infinite: false,
			autoplay: false,
			autoplaySpeed: 3000,
    }

    var options1 = {
			slidesToScroll: 1,
			slidesToShow: 1,
			loop: true,
			infinite: false,
			autoplay: false,
			autoplaySpeed: 3000,
    }

    var options2 = {
			slidesToScroll: 1,
			slidesToShow: 2,
			loop: true,
			infinite: false,
			autoplay: false,
			autoplaySpeed: 3000,
    }

    var options_teaser = {
			slidesToScroll: 1,
			slidesToShow: 3,
			loop: true,
			infinite: false,
			autoplay: false,
			autoplaySpeed: 3000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);
    var carousels = bulmaCarousel.attach('.carousel1', options1);
    var carousels = bulmaCarousel.attach('.carousel2', options2);
    var carousels = bulmaCarousel.attach('.carousel_teaser', options_teaser);

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
    	// Add listener to  event
    	carousels[i].on('before:show', state => {
    		console.log(state);
    	});
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.bulmaCarousel.on('before-show', function(state) {
    		console.log(state);
    	});
    }

    /*var player = document.getElementById('interpolation-video');
    player.addEventListener('loadedmetadata', function() {
      $('#interpolation-slider').on('input', function(event) {
        console.log(this.value, player.duration);
        player.currentTime = player.duration / 100 * this.value;
      })
    }, false);*/
    preloadInterpolationImages();

    $('#interpolation-slider').on('input', function(event) {
      setInterpolationImage(this.value);
    });
    setInterpolationImage(0);
    $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);

    bulmaSlider.attach();

})

var nerfbusters_dataset = 'picnic';
var nerfbusters_method = 'gsplat-comparison';
var nerfiller_dataset = 'norway';
var nerfiller_method = 'nerfiller-no-new-views-comparison';
var flexible_dataset = 'garden';
var flexible_method = '4';
var nerfbusters_activeVidID = 0;
var nerfiller_activeVidID = 0;
var flexible_activeVidID = 0;

function setComparisonVideo_nerfbusters(comparison_id) {
  // swap video to avoid flickering
  nerfbusters_activeVidID = 1 - nerfbusters_activeVidID;
  var video_active = document.getElementById("nerfbusters-comparison-video-" + nerfbusters_activeVidID);
  video_active.src = "videos/nerfbusters/" + nerfbusters_dataset + "-" + nerfbusters_method + ".mp4";
  video_active.load();

  var video_active_data = document.getElementById("nerfbusters-data-video-" + nerfbusters_activeVidID);
  video_active_data.src = "videos/nerfbusters-data/" + nerfbusters_dataset + ".mp4";
  video_active_data.load();

  // for all the buttons, set is-dark
  var buttons = document.getElementsByClassName("nerfbusters-button");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("is-dark");
    buttons[i].classList.add("is-light");
  }
  // for the selected buttons, set is-light
  var button = document.querySelector('.nerfbusters-button#'+ nerfbusters_dataset);
  button.classList.remove("is-light");
  button.classList.add("is-dark");
  var button = document.querySelector('.nerfbusters-button#'+ nerfbusters_method);
  button.classList.remove("is-light");
  button.classList.add("is-dark");

  document.getElementById('nerfbusters-baseline').textContent = button.textContent;
}

function setComparisonVideo_nerfiller(comparison_id) {
  // swap video to avoid flickering
  nerfiller_activeVidID = 1 - nerfiller_activeVidID;
  var video_active = document.getElementById("nerfiller-comparison-video-" + nerfiller_activeVidID);
  video_active.src = "videos/nerfiller/" + nerfiller_dataset + "-" + nerfiller_method + ".mp4";
  video_active.load();

  // for all the buttons, set is-dark
  var buttons = document.getElementsByClassName("nerfiller-button");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("is-dark");
    buttons[i].classList.add("is-light");
  }
  // for the selected buttons, set is-light
  var button = document.querySelector('.nerfiller-button#'+ nerfiller_dataset);
  button.classList.remove("is-light");
  button.classList.add("is-dark");
  var button = document.querySelector('.nerfiller-button#'+ nerfiller_method);
  button.classList.remove("is-light");
  button.classList.add("is-dark");

  document.getElementById('nerfiller-baseline').textContent = button.textContent;
}

function setComparisonVideo_flexible(comparison_id) {
  // swap video to avoid flickering
  flexible_activeVidID = 1 - flexible_activeVidID;
  var video_active = document.getElementById("flexible-comparison-video-" + flexible_activeVidID);
  video_active.src = "videos/flexible/" + flexible_dataset + "/" + flexible_method + "/" + "video.mp4";
  video_active.load();

  var image_active = document.getElementById("flexible-comparison-image-" + flexible_activeVidID);
  image_active.src = "videos/flexible/" + flexible_dataset + "/" + flexible_method + "/" + "image.jpg";

  var image_active = document.getElementById("flexible-comparison-screenshot-" + flexible_activeVidID);
  image_active.src = "videos/flexible/" + flexible_dataset + "/" + flexible_method + "/" + "screenshot.jpg";

  // for all the buttons, set is-dark
  var buttons = document.getElementsByClassName("flexible-button");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("is-dark");
    buttons[i].classList.add("is-light");
  }
  // for the selected buttons, set is-light
  var temp_flexible_method = "";
  if (flexible_method == "1") {
    temp_flexible_method = "one";
  } else if (flexible_method == "2") {
    temp_flexible_method = "two";
  } else if (flexible_method == "3") {
    temp_flexible_method = "three";
  } else if (flexible_method == "4") {
    temp_flexible_method = "four";
  }
  var button = document.querySelector('.flexible-button#'+ flexible_dataset);
  button.classList.remove("is-light");
  button.classList.add("is-dark");
  var button = document.querySelector('.flexible-button#'+ temp_flexible_method);
  button.classList.remove("is-light");
  button.classList.add("is-dark");
}

function setDataset_nerfbusters(datasetName) {
  nerfbusters_dataset = datasetName;
  setComparisonVideo_nerfbusters();
}

function setMethod_nerfbusters(methodName) {
  nerfbusters_method = methodName;
  setComparisonVideo_nerfbusters();
}

function setDataset_nerfiller(datasetName) {
  nerfiller_dataset = datasetName;
  setComparisonVideo_nerfiller();
}

function setMethod_nerfiller(methodName) {
  nerfiller_method = methodName;
  setComparisonVideo_nerfiller();
}


function setDataset_flexible(datasetName) {
  flexible_dataset = datasetName;
  setComparisonVideo_flexible();
}

function setMethod_flexible(methodName) {
  flexible_method = methodName;
  setComparisonVideo_flexible();
}
