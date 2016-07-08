$(function($){
  // grab all the elements inside .nomplussed-is and dump the contents in an array
  var listOfQuips = [];
  var quipIndex = 0;

  // used for hiding random letters
  var spans = [];
  var spansTrackingArray = [];

  var newQuipTimeout;
  var newQuipTimeoutLength = 5000;

  var switchLetterTimeoutLength = 7;

  var showingQuip;

  $.each($('.nomplussed-is li'), function(index, item){
    listOfQuips.push($(item).html());

    if(index !== 0) {
      $(item).remove();
    }
  })

  function hideQuip() {
    showingQuip = false;

    // animate out current quip

    // first, make prepararations!
    convertTextToSpans()

    // make a collection of all the spans
    spans = $('.nomplussed-is li span');

    // make an array of incrementing numbers equal to the # of characters - 1
    for(var i=0; i<spans.length; i++) {
      spansTrackingArray.push(i);
    }

    // hide random letter
    switchRandomLetter();

    // keep track of which quip we're on
    if(quipIndex >= listOfQuips.length - 1) {
      quipIndex = 0;
    }
    else {
      quipIndex++;
    }
  }

  function switchRandomLetter(){
    // randomly choose an index out of this array
    var randomIndex = Math.floor(Math.random() * spansTrackingArray.length);

    // use that number to select one of the spans and give it a class of 'invisible'
    var randomSpanIndex = spansTrackingArray[randomIndex];
    $(spans[randomSpanIndex]).toggleClass('invisible');

    // delete that number out of the tracking array so it doesnt get chosen again
    spansTrackingArray.splice(randomIndex, 1);

    // set a timeout for a very short amount of time like 50ms, then repeat.
    var switchLetterTimeout;

    // repeat until the array of incrementing numbers is empty
    if(spansTrackingArray.length > 0) {
      switchLetterTimeout = window.setTimeout(switchRandomLetter, switchLetterTimeoutLength);
      console.log('removing letter at ' + randomSpanIndex);
    }
    else {
      console.log('done');
      if (showingQuip) {
        newQuipTimeout = window.setTimeout(hideQuip, newQuipTimeoutLength);
      }
      else {
        showQuip();
      }
    }
  }

  function convertTextToSpans(withInvisibleClass) {
    // wrap each letter in a span
    var quipCharArray = $('.nomplussed-is li').text().split('');
    var quipWithSpans = '';

    $.each(quipCharArray, function(index, item) {
      if (withInvisibleClass) {
        var letterWrappedInSpan = '<span class="invisible">' + item + '</span>';
      }
      else {
        var letterWrappedInSpan = '<span>' + item + '</span>';
      }
      quipWithSpans += letterWrappedInSpan;
    })

    $('.nomplussed-is li').html(quipWithSpans);
  }

  function showQuip() {
    showingQuip = true;

    // when all spans are invisible, empty the li
    $('.nomplussed-is li').empty();

    // put in the new quip
    $('.nomplussed-is li').html(listOfQuips[quipIndex]);

    convertTextToSpans(true);

    // make a collection of all the spans
    spans = $('.nomplussed-is li span');

    // make an array of incrementing numbers equal to the # of characters - 1
    for(var i=0; i<spans.length; i++) {
      spansTrackingArray.push(i);
    }

    // hide random letter
    switchRandomLetter();
  }

  // start the countdown
  newQuipTimeout = window.setTimeout(hideQuip, newQuipTimeoutLength);
})