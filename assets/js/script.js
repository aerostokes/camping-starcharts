var npsAPIkey = "FOj8NLPQk3pjXfnLbAPTKd1psYcMq5EqEmMc72QR"
var astroAPIkey = btoa("ea9664be-c82f-48f1-acb7-3226214a38fb:e666dcfef554590bed0540538be22b6c278cb6b2cf58b6a1a09cfbf6c70bee4f7485ef3585e14f139bccfb85fe86025358856b4e114dc39a65c902da164dd07a935b84c7f4bb0d88df64375645b67e317db68daee7419a2a60f73e44d455314bb817459dbf995184a51ca614936814d7")
var hamBtn = document.getElementById("ham-btn");
var searchSection = document.querySelector(".search");
var campSearchInput = document.getElementById("camp-search");
var datePickerInput = document.getElementById("datepicker");
var searchBtn = document.getElementById("search-btn");
var toggleDiv = document.getElementById("toggle-container");
var favToggleBtn = document.getElementById("fav-toggle");
var resToggleBtn = document.getElementById("res-toggle")
var favoritesUl = document.getElementById("favorites");
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
var campResultsArr = [];
var displayedFavsArr = []
var storedFavsArr = []





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

$( function() {
    $('#datepicker').datepicker({
      changeMonth: true,
      changeYear: true,
    });
} );


// Unfavorite and remove from localStorage
function removeFavorite(clickedButton) {
        // Read data-nameCode from page. Remove matching object from the storedFavsArr and updated localStorage.
        var nameCodeStr = clickedButton.getAttribute("data-nameCode");
        var index = storedFavsArr.findIndex(obj => obj.nameCode == nameCodeStr);
        storedFavsArr.splice(index, 1);
        localStorage.setItem("FavoriteCampgrounds", JSON.stringify(storedFavsArr));

        // If the nameCode exists anywhere else on the page, then update favorite stars to match
        var findMatchesArr = document.querySelectorAll(`[data-nameCode='${nameCodeStr}'`);
        findMatchesArr.forEach(match => {
            match.setAttribute("class", "fav-btn-unchecked");
        });
};


// Save camp to localStorage 
function saveFavorite(clickedButton) {
    // Read data-nameCode from button. Pull the matching campObj from campResultsArr.
    var nameCodeStr = clickedButton.getAttribute("data-namecode")
    var campObj = campResultsArr.find(obj => obj.nameCode == nameCodeStr);
    if (campObj == null) { campObj = displayedFavsArr.find(obj=> obj.nameCode == nameCodeStr)};

    // If camp is not already in localStorage add it.
    if (!(storedFavsArr.find(obj => obj.nameCode == nameCodeStr))) {
        storedFavsArr.push(campObj);
        localStorage.setItem("FavoriteCampgrounds", JSON.stringify(storedFavsArr));
    };

    // If camp is not already in favoritesUl, then add it.
    var findMatch = favoritesUl.querySelector(`[data-nameCode='${nameCodeStr}'`);
    if (!findMatch) {
        displayedFavsArr.push(campObj);
        createCard (campObj, "fav");
    };

    // If the nameCode exists anywhere else on the page, then update favorite stars to match
    var findMatchesArr = document.querySelectorAll(`[data-nameCode='${nameCodeStr}'`);
    findMatchesArr.forEach(match => {
        match.setAttribute("class", "fav-btn-checked");
    });
};

// Create a card for either resultsUl or favoritesUl 
function createCard (campObj, cardType = "result") {
    var cardEl = document.createElement('li');
    var iconTextSpan = document.createElement('span');
    var nameEl = document.createElement('h3');
    var iconSpan = document.createElement('span');
    var favBtn = document.createElement('button');
    var locationEl = document.createElement('p');

    cardEl.setAttribute("class", "card");
    iconTextSpan.setAttribute("class", "icon-text")
    nameEl.setAttribute("class","card-header");
    nameEl.textContent = campObj.name;
    iconSpan.setAttribute("class", "icon")
    favBtn.setAttribute("data-namecode", campObj.nameCode);
    favBtn.innerHTML = "<span class='material-symbols-outlined'>star</span>";
    locationEl.textContent = campObj.location;
    
    iconSpan.append(favBtn)
    iconTextSpan.append(nameEl, iconSpan)
    cardEl.append(iconTextSpan, locationEl);

    if (cardType == "fav") {
        favBtn.setAttribute("class", "fav-btn-checked");
        favoritesUl.append(cardEl);
    }
    else {
        resultsUl.append(cardEl);

        // Check if nameCode is already in favoritesUl, then set the new card's favororite star to match. 
        if (favoritesUl.querySelector(`[data-nameCode='${campObj.nameCode}'`)) {
            favBtn.setAttribute("class", "fav-btn-checked");
        }
        else {
            favBtn.setAttribute("class", "fav-btn-unchecked");
        };
    };  
};

// Retrieve favorites from localStorage and populate page
function retrieveFavorites() {
    if (localStorage.getItem("FavoriteCampgrounds")) {
        storedFavsArr = JSON.parse(localStorage.getItem("FavoriteCampgrounds"));
        storedFavsArr.forEach(campObj => { createCard(campObj, "fav") });
        displayedFavsArr = storedFavsArr.slice();
    };
};

// Handler for if user clicks on a favorite button (either from the cards or from the campSection)
function handlerFavoritesClick(event) {
    var clickedButton = event.target;
    // var clickedParent = clickedButton.parentElement;
    if (clickedButton.getAttribute("class") == "fav-btn-checked") {
        removeFavorite(clickedButton);
    }
    else {
        saveFavorite(clickedButton);
    };
};


// Handler for if user clicks anywhere in resultsUl or favoritesUl
function handlerCardClick (event) {
    var clickedEl = event.target;
    var clickedLi
    if (clickedEl.matches("button")) {
        handlerFavoritesClick(event);
    }
    else {
        if (clickedEl.matches("li"))  { 
            clickedLi = clickedEl
        } 
        else if (clickedEl.parentElement.matches("li")) { 
            clickedLi = clickedEl.parentElement
        }
        else { return };
        var nameCodeStr = clickedLi.querySelector("button").getAttribute("data-nameCode")
        displayCampDetails (nameCodeStr);
    };
};


function displayCampDetails (nameCodeStr) {
    aboutSection.parentElement.classList.add("is-hidden")
    campSection.parentElement.classList.remove("is-hidden")

    var campObj = campResultsArr.find(obj => obj.nameCode == nameCodeStr);
    if (campObj == null) { campObj = displayedFavsArr.find(obj=> obj.nameCode == nameCodeStr)};

    if (!datePickerInput.value) { datePickerInput.value = dayjs().format("MM/DD/YYYY") }
    chartMaker(campObj.latitude, campObj.longitude, dayjs(datePickerInput.value,"MM/DD/YYYY").format("YYYY-MM-DD"));

    campNameEl.textContent = campObj.name;
    campFavBtn.setAttribute("data-nameCode", campObj.nameCode);
    if (storedFavsArr.find(obj => obj.nameCode == nameCodeStr)) {
        campFavBtn.setAttribute("class", "fav-btn-checked");
    }
    else {
        campFavBtn.setAttribute("class", "fav-btn-unchecked")
    };

    campURL.setAttribute("href", campObj.url);
    console.log(campObj);

    do {
        infoListUl.removeChild(infoListUl.firstChild);
    } while (infoListUl.firstChild);

    if (campObj.location) {
        var locationLi = document.createElement("li");
        locationLi.textContent = campObj.location;
        infoListUl.appendChild(locationLi);
    };
    if (campObj.description) {
        var descriptionLi = document.createElement("li");
        descriptionLi.textContent = campObj.description;
        infoListUl.appendChild(descriptionLi);
    };
    if (campObj.campsites) {
        var campsitesLi = document.createElement("li");
        campsitesLi.textContent = "Campsites: ";
        infoListUl.appendChild(campsitesLi);
        
        var campsitesUi = document.createElement("ui")
        infoListUl.appendChild(campsitesUi)
        campObj.campsites.forEach(i => {
            campsitesLi = document.createElement("li");
            campsitesLi.textContent = "-" + i;
            campsitesUi.appendChild(campsitesLi);
        });
    };
    if (campObj.amenities) {
        var amenitiesLi = document.createElement("li");
        amenitiesLi.textContent = "Amenities: ";
        infoListUl.appendChild(amenitiesLi);

        var amenitiesUi = document.createElement("ui")
        infoListUl.appendChild(amenitiesUi)
        campObj.amenities.forEach(i => {
            amenitiesLi = document.createElement("li");
            amenitiesLi.textContent = "-" + i;
            amenitiesUi.appendChild(amenitiesLi);
        });
    };
};


function toggleFavRes(mode = "res") {
    if (mode == "fav") {
        favToggleBtn.setAttribute("class", "checked");
        favoritesUl.removeAttribute("class")

        resToggleBtn.setAttribute("class", "unchecked");
        resultsUl.setAttribute("class", "is-hidden")
    }
    else {
        favToggleBtn.setAttribute("class", "unchecked");
        favoritesUl.setAttribute("class", "is-hidden");

        resToggleBtn.setAttribute("class", "checked");
        resultsUl.removeAttribute("class");
    }
};

    
function chartMaker(lat, lon, date) {
    chartImg.setAttribute('src', './assets/images/loading.gif');
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


// function to pull specific data from nps response
function npsResponse(campground){
    // info being pulled from data
    var name = campground.name;
    var parkcode = campground.parkCode;
    var lat = campground.latitude;
    var lon = campground.longitude;
    var location = '';
    var campsitesInfo = [
        'totalSites: ' + campground.campsites.totalSites,
        'tentOnly: ' + campground.campsites.tentOnly,
        'other: ' + campground.campsites.other
    ];
    var amenitiesInfo = [
        'cellPhoneReception: ' + campground.amenities.cellPhoneReception,
        'potableWater: ' + campground.amenities.potableWater,
        'toilets: ' + campground.amenities.toilets
    ];
    var description = campground.description;
    var siteUrl= campground.url;
    
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
        nameCode: `${name}_${parkcode}`.replace(/[\W]+/gi,""),
        latitude: lat,
        longitude: lon,
        location: location,
        campsites: campsitesInfo,
        amenities: amenitiesInfo,
        description: description,
        url: siteUrl,
    }

    campResultsArr.push(campObj);
    createCard (campObj, "result");
}


// function for sending requests and recieving responses for the NPS API
function npsSearch(campSearchInput) {
    resultsUl.innerHTML = '';
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
                npsResponse(campground);
            }
        })
    // if input isn't a state code it will be treated as a key word request
    } else {
        campSearchInput = encodeURIComponent(campSearchInput)
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
                npsResponse(campground)
            }
        })
    }
}
// to test results just uncomment one of the below: 
// npsSearch('WA'); //state search results
//npsSearch('Lake Stevens'); //keyword results
//npsSearch('Rainier'); //no results

// function running search
function runSearch() {
    if (window.innerWidth<768) {
        searchSection.classList.add("is-hidden")
    }
    var campInput = campSearchInput.value.toUpperCase();
        dateInput = datePickerInput.value;
        npsSearch(campInput);
        toggleFavRes("res");
        campSearchInput.value = '';
}

// Event listeners and page load calls
    // favorite btns event listeners
campFavBtn.addEventListener("click", handlerFavoritesClick);
resultsUl.addEventListener("click", handlerCardClick);
favoritesUl.addEventListener("click", handlerCardClick);
toggleDiv.addEventListener("click", function(event) {
    if (event.target.matches("#fav-toggle")) { toggleFavRes("fav") }
    else { toggleFavRes("res") };
});
hamBtn.addEventListener("click",function(){
    if (searchSection.classList.contains("is-hidden")) {
        searchSection.classList.remove("is-hidden");
    } else {
        searchSection.classList.add("is-hidden");
    }
})

    // search event listeners
searchBtn.addEventListener('click', runSearch);
campSearchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        runSearch();
    }
});
datePickerInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        runSearch();
    }
});

    // page load calls
retrieveFavorites();
datePickerInput.value = dayjs().format("MM/DD/YYYY");





