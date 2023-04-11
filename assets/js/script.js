var npsAPIkey = "FOj8NLPQk3pjXfnLbAPTKd1psYcMq5EqEmMc72QR"
var astroAPIkey = btoa("ea9664be-c82f-48f1-acb7-3226214a38fb:e666dcfef554590bed0540538be22b6c278cb6b2cf58b6a1a09cfbf6c70bee4f7485ef3585e14f139bccfb85fe86025358856b4e114dc39a65c902da164dd07a935b84c7f4bb0d88df64375645b67e317db68daee7419a2a60f73e44d455314bb817459dbf995184a51ca614936814d7")
var hamBtn = document.getElementById("ham-btn");
var searchSection = document.querySelector(".search");
var campSearchInput = document.getElementById("camp-search");
var datePickerInput = document.getElementById("datepicker");
var searchBtn = document.getElementById("search-btn");
var favToggleBtn = document.getElementById("fav-toggle");
var resultsUl = document.getElementById("results");
var campSection = document.getElementById("camp");
var campNameEl = document.getElementById("camp-name");
var campFavBtn = document.getElementById("camp-fav-btn");
var chartImg = document.getElementById("chart");
var infoAside = document.getElementById("info");
var campURL = document.getElementById("camp-url");
var infoListUl = document.getElementById("info-list");
var aboutSection = document.querySelector(".about");
var stateCodeArr = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ];



// On page load, populate favorites from localStorage (if any)

// Collect and store campSearchInput and datePickerInput

// Fetch from NPS API using search parameters
    // If campSearchInput exists in stateCodeArr: call function stateSearch
    // Otherwise, call function keywordSearch
    // function stateSearch: randomly select starting point, pull 50 results, randomly return 5 result.
    // function keywordSearch: use q search, return top 5

// With the data returned:
    // Check for physical address to prevent errors, add placeholder text if null 
    // Store the lat/lon of the found campsites, 

// Create and append to resultsUL

    
// When user clicks on li's of resultsUl, feed lat/lon and datePickerInput to astronomy API
    // Collect and store img URL and campground info

// Update chartImg src and populate infoAside


// If the user clicks fav-btn: 
    // If checking the box, change the checkbox style and to "filled" and store camp-name, location, lat/lon in localStorage.
    // If unchecking the box, remove from localStorage
// ---------------------------------------------------------------

    // Function to save camp to localStorage 
    function saveFavorite() {
        // TODO: add to localStorage
    }

    // Handler for if user clicks on a favorite button (either from the result cards or from the campSection)
    function handlerFavoritesClick(event) {
        var clickedButton = event.target;
        if (clickedButton.getAttribute("class") == "fav-btn-checked") {
            clickedButton.setAttribute("class", "fav-btn-unchecked");
            // TODO: deleted favorite
        }
        else {
            clickedButton.setAttribute("class", "fav-btn-checked");
            saveFavorite();
        };
    };

    // Handler for if user clicks anywhere in resultsUl 
    function handlerResultsClick (event) {
        var clickedEl = event.target;
        if (clickedEl.matches("button")) {
            handlerFavoritesClick(event);
        }
        else if (clickedEl.parentElement.matches("li")) {
            // TODO: populate campSection with the info for this card 
            console.log(clickedEl.parentElement);
        };
    };

    // Event Listeners
    campFavBtn.addEventListener("click", handlerFavoritesClick)
    resultsUl.addEventListener("click", handlerResultsClick)

var lat = 35.66;
var lon = 66.77;
var date = "2023-03-11";

// function for sending requests and recieving responses for the NPS API
function npsSearch(campSearchInput) {
    // checking if the input is a state code
    if (stateCodeArr.includes(campSearchInput)) {
        var startNum = Math.floor(Math.random() * 5);

        var stateRequest = `https://developer.nps.gov/api/v1/campgrounds?stateCode=${campSearchInput}&start=${startNum}&api_key=${npsAPIkey}`;

        fetch(stateRequest).then(response => response.json()).then(data => {
            console.log(data);
            // if no result for search, no result card will appear
            if (data.total == 0) {
                var noResult = document.createElement('h3');
                noResult.textContent = 'No results';
                resultsUl.append(noResult);
            }
            // getting a random 5 parks from the results given for specified state
            var maxNum = 5;
            if (data.data.length < maxNum) {
                maxNum = data.data.length;
            }
            for (let i = 0; i < maxNum; i++) {
                const campground = data.data[Math.floor(Math.random() * data.data.length)];
                var name = campground.name;
                var lat = campground.latitude;
                var lon = campground.longitude;
                var location = '';
                var description = campground.description; //we can change this with whatever we decide to display for the info box
                // checking if a location address is available
                if (campground.addresses.length > 0) {
                    var tempArr = campground.addresses;
                    for (let index = 0; index < tempArr.length; index++) {
                        if(tempArr[index].type == 'Physical') {
                            location = tempArr[index].line1;
                        }    
                    }    
                }
                // object to hold necessary info for each camp 
                var campObj = {
                    name: name,
                    latitude: lat,
                    longitude: lon,
                    location: location,
                    info: description //we can change this with whatever we decide to display for the info box
                }
                console.log(campObj);

                var resultCardEl = document.createElement('button');
                var resultNameEl = document.createElement('h3');
                var resultLocationEl = document.createElement('p');
                var resultFav = document.createElement('button')

                resultNameEl.textContent = name;
                resultLocationEl.textContent = location;
                
                resultCardEl.append(resultNameEl, resultLocationEl, resultFav);
                resultsUl.append(resultCardEl);
            }
        })
        // if input isn't a state code it will be treated as a key word request
    } else {
        var keywordRequest = `https://developer.nps.gov/api/v1/campgrounds?q=${campSearchInput}&limit=5&api_key=${npsAPIkey}`;

        fetch(keywordRequest).then(response => response.json()).then(data => {
            console.log(data);
            if (data.total == 0) {
                var noResult = document.createElement('h3');
                noResult.textContent = 'No results';
                resultsUl.append(noResult);
            }

            for (let i = 0; i < data.data.length; i++) {
                const campground = data.data[i];
                var name = campground.name;
                var lat = campground.latitude;
                var lon = campground.longitude;
                var location = '';
                var description = campground.description; //we can change this with whatever we decide to display for the info box

                if (campground.addresses.length > 0) {
                    var tempArr = campground.addresses;
                    for (let index = 0; index < tempArr.length; index++) {
                        if(tempArr[index].type == 'Physical') {
                            location = tempArr[index].line1;
                        }    
                    }    
                }      
                
                var campObj = {
                    name: name,
                    latitude: lat,
                    longitude: lon,
                    location: location,
                    info: description //we can change this with whatever we decide to display for the info box
                }
                console.log(campObj);
                
                var resultCardEl = document.createElement('button');
                var resultNameEl = document.createElement('h3');
                var resultLocationEl = document.createElement('p');
                var resultFav = document.createElement('button');

                resultNameEl.textContent = name;
                resultLocationEl.textContent = location;
                
                resultCardEl.append(resultNameEl, resultLocationEl, resultFav);
                resultsUl.append(resultCardEl);
            }
        })
    }
}
// to test results just uncomment one of the below: 
//npsSearch('WA'); //state search results
//npsSearch('Lake Stevens'); //keyword results
//npsSearch('Rainier'); //no results

    
function chartMaker(lat, lon, date) {
    // This pulls a view of the capricorn constellation from the given lat and lon on the given date.
    // Can change it to a different constellation, or perspective.
    var specs = `{\"observer\":{\"latitude\":${lat},\"longitude\":${lon},\"date\":\"${date}\"},\"view\":{\"type\":\"constellation\",\"parameters\":{\"constellation\":\"cap\"}}}`;
    fetch("https://api.astronomyapi.com/api/v2/studio/star-chart", {
         headers: {
            Authorization: `Basic ${astroAPIkey}`
        },
        method: "POST",
        body: specs
    }).then(function(response){
        console.log(response);
        return response.json();
    }).then(function(data){
        console.log(data);
        console.log(data.data.imageUrl);
        chartImg.setAttribute("src",data.data.imageUrl);
    })
}

chartMaker(lat,lon,date);