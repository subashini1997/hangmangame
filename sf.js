
       $(document).ready(function() {

        // Pick a category and secret word
          var categories = [
              ["apple", "peach", "pear", "blueberry", "coconut", "fig", "pineapple", "orange", "banana", "plum"],
              ["soccer", "football", "tennis", "lacrosse", "golf", "basketball", "badminton", "bowling", "ballet"],
              ["daisy", "tulip", "sunflower", "daffodil", "freesia", "peonies", "rose", "hydrangea", "lily"]
          ];
          var randomCategoryArray = categories[Math.floor((Math.random() * categories.length))];
          var randomWord = (randomCategoryArray[Math.floor((Math.random() * randomCategoryArray.length))]).toUpperCase();
          console.log(randomWord);
          var randomWordArray = randomWord.split("");
      
          // Print category name
          if ($.inArray("apple", randomCategoryArray) > -1) {
              $(".category").text("Category is fruits");
          } else if ($.inArray("soccer", randomCategoryArray) > -1) {
              $(".category").text("Category is sports");
          } else {
              $(".category").text("Category is flowers");
          }
      
      
        // Draw squares for secret word & hide letters
        for(var i = 0; i < randomWord.length; i++) {
              $('#container').append('<div class="letter ' + i + '"></div>');
              $('#container').find(":nth-child(" + (i + 1) + ")").text(randomWordArray[i]);
              $(".letter").css("color", "#4ABDAC");
          }
      
        // Button click function
          var wrongGuesses = 0;
          $("button").on("click", function(){
              $(this).addClass("used");
              $(this).prop("disabled", "true");
              var matchFound = false;
      
              // Check if clicked letter is in secret word
              var userGuess = $(this).text();
              for (var i = 0; i < randomWord.length; i++) {
                  if (userGuess === randomWord.charAt(i)) {
                      $('#container').find(":nth-child(" + (i + 1) + ")").css("color", "#EFEFEF").addClass("winner");
                      matchFound = true;
                  }
              }
      
              //Check for winner
              var goodGuesses = [];
              $(".letter").each(function( index ) {
                  if ( $(this).hasClass("winner") ) {
                      goodGuesses.push(index);
                      if (goodGuesses.length === randomWordArray.length) {
                          $("#container").hide();
                          $("button").prop("disabled", "true");
                          $(".category").text("Great job you guessed the secret word!");
                          $(".category").append("<br><button enabled class='play-again'>Play again?</button>");
                      }
                  }
              });
      
              // If no match, increase count and add appropriate image
              if (matchFound === false) {
                  wrongGuesses += 1;
                  $("#hangman").attr("src", "img/" + wrongGuesses + ".png");
              }
      
              // If wrong guesses gets to 7 exit the game
              if (wrongGuesses === 7) {
                  $("#container").hide();
                  $("button").prop("disabled", "true");
                  $(".category").text("Sorry you lost! The secret word was " + randomWord);
                  $(".category").append("<br><button enabled class='play-again'>Play again?</button>");
              }
      
              // Play again button
              $(".play-again").on("click", function(){
                  location.reload();
              });
      
          }); // End button click
      
      }); // End document.ready