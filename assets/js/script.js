var npsAPIkey = "FOj8NLPQk3pjXfnLbAPTKd1psYcMq5EqEmMc72QR"
var astroAPIkey = ""
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





