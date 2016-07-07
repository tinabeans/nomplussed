Zepto(function($){
  // grab all the elements inside .nomplussed-is and dump the contents in an array
  var listOfQuips = [];
  var quipToShow = 0;

  $.each($('.nomplussed-is li'), function(index, item){
    listOfQuips.push($(item).html());

    if(index !== 0) {
      $(item).remove();
    }
  })

  console.log(listOfQuips);

  var awesomeTimeout;

  function nextQuip() {
    // animate out current quip
    $('.nomplussed-is li').remove();

    // put in the next quip
    $('.nomplussed-is').html('<li>' + listOfQuips[quipToShow] + '</li>');

    // cue up the next quip
    if(quipToShow >= listOfQuips.length - 1) {
      quipToShow = 0;
    }
    else {
      quipToShow++;
    }

    // wait 5 seconds
    awesomeTimeout = window.setTimeout(nextQuip, 1000);
  }

  nextQuip();
})