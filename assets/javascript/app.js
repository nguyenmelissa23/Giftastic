//Note: always put functions at the bottom
//PROBLEM:
	// Seems like it creates the same 10 gifs for the buttons


//ARRAY and BUTTONS 
var topics = ["german", "canada", "greenland", "united states", "china", "sweden", "norway", "iceland", "australia", "brazil"];

//Working :)
function createButtons(){
	for (i=0 ; i < topics.length ; i++){
		var name = topics[i];
		var newBtn = ("<button class='topicName' data-animal='" 
			+ name + "'>"
			+ name +"</button>");	
		$("#allButtons").append(newBtn);
	}
}

//SUBMIT BUTTON - Working :) 
$("#submit").on('click', function(){
	//on submit, create a new button
	var newBtn = $("<button>");
	newBtn.attr("class", "topicName");
	//get the user input from the val()
	var animalText = $("input[name=animalName]").val();
	console.log(animalText);
	newBtn.attr("data-animal", animalText);
	console.log(newBtn.attr("data-animal"));
	//put the user input in the button 
	newBtn.append(animalText);
	$("#allButtons").append(newBtn);
	$("input[name=animalName]").html("");
});

//ANIMAL BUTTON	Working	
$("#allButtons").on('click', "button.topicName", function(){
	$("#gifs-here").html("");
	var api = "dc6zaTOxFJmzC";
	var animal = $(this).attr("data-animal");
	var limit = 10;
	console.log(animal);
	var queryURL = "http://api.giphy.com/v1/gifs/search?"
	+ "q=" + animal 
	+ "&api_key=" + api
	+ "&limit=" + limit;
	console.log(queryURL);

	$.ajax({url:queryURL, method:'GET'})
	.done(function(response){	
		console.log(response);
		for (i=0; i < limit; i++){
			var results = response.data;
			var newdiv = $("<div>");
			newdiv.addClass("gifDiv");
			newdiv.append("<p>Rating: "+ results[i].rating +"</p>");
			var animalImg = "<img src='" 
				+ results[i].images.fixed_height_still.url+ "' " 
				+ "data-still='" 
				+ results[i].images.fixed_height_still.url + "' "
				+ "data-animate='"
				+ results[i].images.fixed_height.url + "' "
				+ "data-state='still' "
				+ "class='gif'>";
			newdiv.append(animalImg);
			$("#gifs-here").append(newdiv);
		}
	});
});

//PLAY GIFS BUTTON Working
$("#gifs-here").on("click","img.gif", function(){
	var state = $(this).attr("data-state");
	if (state === "still"){
		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state", "animate");
	}
	else if (state != "still"){
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");
	}
});

//DIV for GIFs Working :)
function gifDiv(){	
	var api = "dc6zaTOxFJmzC";
	var animal = $(this).attr("data-animal");
	var limit = 10;
	console.log(animal);
	var queryURL = "http://api.giphy.com/v1/gifs/search?"
	+ "q=" + animal 
	+ "&api_key=" + api
	+ "&limit=" + limit ;
	console.log(queryURL);

	$.ajax({url:queryURL, method:'GET'})
	.done(function(response){	
		console.log(response);
		for (i=0; i < limit; i++){
			var results = response.data;
			var newdiv = $("<div>");
			newdiv.append("<p>Rating: </p>");
			var animalImg = "<img src='" 
				+ results[i].images.fixed_height_still.url+ "' " 
				+ "data-still='" 
				+ results[i].images.fixed_height_still.url + "' "
				+ "data-animate='"
				+ results[i].images.fixed_height.url + "' "
				+ "data-state='still' "
				+ "class='gif'>";
			newdiv.append(animalImg);
			$("#gifs-here").append(newdiv);
		}
	});
}

createButtons();