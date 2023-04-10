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
    
function npsSearch(campSearchInput) {
    if (stateCodeArr.includes(campSearchInput)) {
        var startNum = Math.floor(Math.random() * 5);

        var stateRequest = `https://developer.nps.gov/api/v1/campgrounds?stateCode=${campSearchInput}&start=${startNum}&api_key=${npsAPIkey}`;

        fetch(stateRequest).then(response => response.json()).then(data => {
            console.log(data);
            
            var maxNum = 5;
            if (data.data.length < maxNum) {
                maxNum = data.data.length
            }
            for (let i = 0; i < maxNum; i++) {
                const campground = data.data[Math.floor(Math.random() * data.data.length)];
                var name = campground.name;
                var lat = campground.latitude;
                var lon = campground.longitude;
                var location = '';
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
                location: location
            }
        
             console.log(campObj);
        }
        })

    } else {
        var keywordRequest = `https://developer.nps.gov/api/v1/campgrounds?q=${campSearchInput}&limit=5&api_key=${npsAPIkey}`;

        fetch(keywordRequest).then(response => response.json()).then(data => {
            console.log(data);
            keywordResponse(data);
        })
            
        function keywordResponse(data) {
            for (let i = 0; i < data.data.length; i++) {
                const campground = data.data[i];
                var name = campground.name;
                var lat = campground.latitude;
                var lon = campground.longitude;
                var location = '';
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
                    location: location
                }
                    console.log(campObj);
            }
        }
    }
}

//npsSearch('WA');
//npsSearch('lake stevens')