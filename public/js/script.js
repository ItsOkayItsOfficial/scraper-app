/*
 * Author: Alex P
 * URL: www.itsokayitsofficial.io
 *
 * Project Name: Scraper App - JS
 * Version: 1.0
 * Date: 11/19/17
 * URL: github.com/itsokayitsofficial/scraper-app
 */

// VARIABLES - browser window location
const baseURL = window.location.origin;

// SET - localStore items
localStorage.setItem('first', $('#next').attr('data-id'));

// onCLICK - next article
$(document).on('click', '#next', function () {
  // Get id from button
  var id = $(this).attr('data-id');
  // Get next article
  $.get(baseURL + "/next/" + id, buttons);
});

// onCLICK - previous article
$(document).on('click', '#prev', function () {
  // Get id from button
  var id = $(this).attr('data-id');
  // Get next article
  $.get(baseURL + "/prev/" + id, buttons);
});

// onCLICK - post new comment
$(document).on('click', '#post', function() {
  // Get id from button
  var id = $(this).attr('data-id');
  // Get the comment
  $comment = $("#comment");
  var comment = $comment.val().trim();
  // Clear the comment
  $comment.val('');
  // Get next article
  $.post(baseURL + "/comment/" + id, {
    comment: comment
  }, function (response) {
    // Update comments
    comments(response);
  });
});

// onCLICK - remove comment
$(document).on('click', '.remove', function () {
  // Get id from post button
  var id = $('#post').attr('data-id');
  // Get remove id
  var removeID = $(this).attr('data-id');
  // Get next article
  $.post(baseURL + "/remove/" + id, {
    id: removeID
  }, function (response) {
    // Update comments
    comments(response);
  });
  return false;
});

// RESPONSE - content from request
function buttons(response) {
  // Update content
  $('#picture>img').attr('src', response[0].imgURL);
  $('#content>h2').text(response[0].title);
  $('#content>p').text(response[0].synopsis);
  $('a.articleURL').attr('href', response[0].articleURL);
  // Update comments
  comments(response[0].comments);
  // Check if previous button exists
  $buttons = $('#buttons');
  if ($buttons.children().length === 1) {
    // Add button
    var $but = $('<button>').text('Previous').attr('id', 'prev').attr('data-id', response[0]._id);
    $buttons.prepend($but);
  } else {
    // Check if the new id is the first id
    if (response[0]._id === localStorage.getItem('first')) {
      // If so remove
      $('#prev').remove();
    } else {
      // Just update prev button id
      $('#prev').attr('data-id', response[0]._id);
    }
  }
  // Update next and post button id
  $('#next').attr('data-id', response[0]._id);
  $('#post').attr('data-id', response[0]._id);
}

// RESPONSE - comments from request
function comments(object) {
  $('#comment-holder').remove();
  var $commentHolder = $('<div>').attr('id', 'comment-holder');
  for (var i = 0; i < object.length; i++) {
    var $p = $('<p>').html('<span class="number">' + (i + 1) + '</span> ' + object[i].text + ' <a href="#" class="remove" data-id="' + object[i]._id + '">X</a>');
    $commentHolder.append($p);
  }
}