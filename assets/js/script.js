
var key = 'FOj8NLPQk3pjXfnLbAPTKd1psYcMq5EqEmMc72QR';

var testEl = document.querySelector('#test');

// if its a statecode we could just randomize the results
function apiTests(stateCode) {
    var request = `https://developer.nps.gov/api/v1/campgrounds?q=${stateCode}&limit=10&api_key=${key}`;
    
    fetch(request).then(response => response.json()).then(data => {
        console.log(data);
        postResponse(data);
    })        
};

function postResponse(data) {
  // need an if statement for if a place has a location if we want an actual address
    for (let i = 0; i < data.data.length; i++) {
      const campground = data.data[i];
      var name = campground.name;
      var parkcode = campground.parkCode;
      var lat = campground.latitude;
      var lon = campground.longitude;

  
      var favCamp = {
        name: name,
        parkcode: parkcode,
        latitude: lat,
        longitude: lon,
      }
        
        console.log(favCamp);
        localStorage.setItem('favCamp', JSON.stringify(favCamp))
        
        let containerEl = document.createElement('div');
        let nameEl = document.createElement('h5');
        let parkcodeEl = document.createElement('h6');
        
        nameEl.textContent = name;
        parkcodeEl.textContent = parkcode;

            
        containerEl.append(nameEl, parkcodeEl);
        testEl.append(containerEl);
        
    }
  }

apiTests('WA');