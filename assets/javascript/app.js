
     // Initial array of artists
     var artistNames = ["Dave Mathews", "Bon Jovi", "Motley Crue", "Sublime", "Def Leppard", "Rage Against the Machine", "Metallica", "Garth Brooks", "Rihanna", "Tenacious D", "Tupac", "Ice Cube", "Shania Twain", "Phil Collins", "Mumford and Sons", "Nirvanna", "Michael Jackson", "George Michael", "Beastie Boys", "Eminem"];

     // displayArtistInfo function re-renders the HTML to display the appropriate content
     function displayArtistInfo() {
        $("#artist-view").empty();
       var artist = $(this).attr("data-name");
       var queryURL = `https://api.giphy.com/v1/gifs/search?q=${artist}&api_key=s4jKHwUbdCkjUp8ymLXl2JRndgnCIF57&limit=10`;

       // Creates AJAX call for the specific movie button being clicked
       $.ajax({
         url: queryURL,
         method: "GET"
       }).then(function(response) {
         console.log(response);

         for (var i=0; i < response.data.length; i++) {
             var artistGif = $("<div>");
             var image = $(`<img src=${response.data[i].images.fixed_width_still.url}>`)
                      .attr("data-state", "still")
                      .attr("data-still", response.data[i].images.fixed_width_still.url)
                      .attr("data-animate", response.data[i].images.fixed_width.url)
                      .addClass("gif");
             artistGif.append(image).append(`Rating: ${response.data[i].rating}`);
             $("#artist-view").append(artistGif);
         }
       });
    }
    
     // Function for displaying artist data
     function renderButtons() {

       // Deletes the artist prior to adding new ones
       // (this is necessary otherwise you will have repeat buttons)
       $("#buttons-view").empty();
       // Loops through the array of artists
       for (var j = 0; j < artistNames.length; j++) {

         // Then dynamicaly generates buttons for each artist in the array
         // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
         var a = $("<button>");
         // Adds a class of artist to our button
         a.addClass("artist");
         // Added a data-attribute
         a.attr("data-name", artistNames[j]);
         // Provided the initial button text
         a.text(artistNames[j]);
         // Added the button to the buttons-view div
         $("#buttons-view").append(a);
       }
     }

     // This function handles events where the add artist button is clicked
     $("#add-artist").on("click", function(event) {
       event.preventDefault();
       // This line of code will grab the input from the textbox
       var artist = $("#artist-input").val().trim();

       // The artist from the textbox is then added to our array
       artistNames.push(artist);

       // Calling renderButtons which handles the processing of our artist array
       renderButtons();
     });

     // Adding click event listeners to all elements with a class of "artist"
     $(document).on("click", ".artist", displayArtistInfo);

     // Calling the renderButtons function to display the intial buttons
     renderButtons();

     
     
     //animate gifs when they are clicked on
     $(document).on("click", ".gif", function() {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });