//=========
//VARIABLES
//=========

var topics = ["tyler the creator", "frank ocean", "syd", "earl sweatshirt", "left brain", "odd future", "jasper (odd future)", "loiter squad", "vince staples", "kendrick lamar", "Anderson .Paak", "Tribe Called Quest"];

//=========
//FUNCTIONS
//=========

//Creating buttons from strings in array
function runArray() {
    //creating line of buttons from topics array
    $("#buttonDiv").text("");
    for (i = 0; i < topics.length; i++) {
        var createdElement = $("<button>");
        createdElement.attr("id", "item-" + i);
        createdElement.attr("data-name", topics[i]);
        createdElement.attr("class", "buttons")
        createdElement.text(topics[i]);
        $("#buttonDiv").append(createdElement);

        //using for loop to allow click event for any button from array to search for gifs with button's "data name"
        $("#item-" + i).on("click", function () {
            $("#giphyDiv").text("");
            var searchItemValue = ($(this).attr("data-name"));
            var APIKey = "UJb4yclxRCV4jN9tvnq0f0ONJ4JYKWXK"
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchItemValue + "&limit=21&api_key=" + APIKey;

            $.ajax({
                url: queryURL,
                method: "GET"
            })
                .then(function (response) {
                    var resultsArr = [];
                    var results = response.data;
                    console.log(response);

                    for (j = 0; j < results.length; j++) {
                        var stillGifUrl = results[j].images.fixed_height_still.url;
                        var playGifUrl = results[j].images.fixed_height.url;
                        var ratingText = results[j].rating.toUpperCase();
                        var titleText = results[j].title;
                        var sourceText = results[j].source;

                        let resultObj = {
                            stillImage: stillGifUrl,
                            playImage: playGifUrl,
                        }

                        resultsArr.push(resultObj);

                        var searchImage = $("<img>");
                        // var ratingDiv = $("<div>");
                        // var titleDiv = $("<div>");
                        // var sourceDiv = $("<div>");


                        // $(ratingDiv).text("Rating: " + ratingText);
                        // $(titleDiv).text("Title: " + titleText);
                        // $(sourceDiv).text("Source: " + sourceText);

                        searchImage.attr("src", stillGifUrl);
                        searchImage.attr("class", "sizeBox");
                        searchImage.attr("alt", results[j].title);
                        searchImage.attr("id", "gif-" + j);
                        // ratingDiv.attr("class", "metaStyle");
                        // titleDiv.attr("class", "metaStyle");
                        // sourceDiv.attr("class", "metaStyle");

                        $("#giphyDiv").append(searchImage);
                        // $("#giphyDiv").append(ratingDiv);
                        // $("#giphyDiv").append(titleDiv);
                        // $("#giphyDiv").append(sourceDiv);
                    }
                    $(".sizeBox").on("click", function () {
                        for (let k = 0; k < results.length; k++) {
                            if ($(this).attr("src") === resultsArr[k].stillImage) {
                                $(this).attr("src", resultsArr[k].playImage);
                            } else if ($(this).attr("src") === resultsArr[k].playImage) {
                                $(this).attr("src", resultsArr[k].stillImage);
                            }
                        }
                    })
                });
        });
    };
}

//==============
//FUNCTION CALLS
//==============

runArray();

//===============
//EVENT LISTENERS
//===============

//creating new strings within array and adding them to buttons by re-calling "runArray()""
$("#newButtonSubmit").on("click", function () {
    event.preventDefault();
    var newButtonValue = $("#newButtonValue").val().trim();
    if (newButtonValue === "") {

    } else {
        topics.push(newButtonValue);
        runArray();
        $("#newButtonValue").val("");
    }
});