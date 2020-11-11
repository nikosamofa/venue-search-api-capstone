'use strict';

const url = 'https://api.foursquare.com/v2/venues/search';
const uri = 'https://api.foursquare.com/v2/venues/';

// page const variables to be rendered 
//page 1 landing page
const startPage = `<section class="container" id="js-startPage">
<div class="item start">
    <form id="js-start-form" class="start-form">
        <legend>Venue<br>App.</legend>
        <div class="intro">
        <p>Are you looking for a location for a dinner date, a surprise birthday party or a chillout spot for friends and
            family ? Look no further! This app is designed to help you find the perfect venue to experience these
            cherished moments. With the help of advanced technologies and a vast database of locations within your area, our
            app will help you narrow down to the perfect venue that meets your needs and matches your taste.</p>
        </div>
        <div class="search-button">
        <input type="submit" value="Start Search" class="js-start-search">
        </div>
    </form>
</div>
</section>`;


//page 2 search page
const searchPage =
    `<div class="container">
<div class="item">

    <form id="js-search-form" class="search-form">
        <label for="js-categories">Search your Venue</label>
        <select name="categories" id="js-categories" >
            <option value="4d4b7104d754a06370d81259">Art & Entertainment</option>
            <option value="4bf58dd8d48988d1ed941735">Spa</option>            
            <option value="4bf58dd8d48988d121941735">Lounge</option>
            <option value="4d4b7105d754a06374d81259">Restaurants</option>
            <option value="4bf58dd8d48988d11e941735">Cocktail Bar</option>
            <option value="4bf58dd8d48988d120941735">Karaoke</option>            
        </select>

        <label for="js-location">City</label>
        <input type="text" name="location" id="js-location" placeholder="New York" value="Baltimore">

        <label for="js-radius">Radius of</label>
        <input type="number" name="radius"min="1"  max="60" id="js-radius" placeholder="miles" value="5"> 

        <label for="js-options">Options</label>
        <input type="number" name="options" min="1" max="10" id="js-options" placeholder="10" value="10"> 
        <div class="start-button">
        <input type="submit" id="js-search" value="Search">
        </div>        
    </form>
</div>
<div class="result-list item item-double" id='js-results' hidden>
    <p>Results</p>
     <ul id="js-result-list" class="result-ul">
    
     </ul>
</div>
</div>
`;


//a function that loads the landing page into the DOM when loaded with the begin search button
function landingPage() {
    $('#js-main-body').html(startPage)
}


//Event function that changes HTML content  and renders the search page when the begin search button is clicked 
function changePage() {
    $('#js-main-body').on('click', '#js-start-form', event => {
        event.preventDefault();
        console.log('test');
        $('#js-main-body').html(searchPage)
    })
}

//function that listens to search submissions
function venueSearch() {
    $('#js-main-body').on('submit', '.search-form', event => {
        event.preventDefault();
        const place = $('#js-location').val();
        const withinRadius = Number($('#js-radius').val()) * 1609.344;
        const category = $('#js-categories').val();
        const numOfOptions = $('#js-options').val();
        console.log(place, withinRadius, category, numOfOptions);
        getVenues(category, place, withinRadius, numOfOptions)
    })
}


// function to format query
function queryFormat(params) {
    const queryItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
    return queryItems.join('&');
}


//function to make get requests to the API 
function getVenues(category, place, withinRadius, numOfOptions) {

    const params = {
        near: place,
        limit: numOfOptions,
        v: 20201020,
        radius: withinRadius,
        categoryId: category,
        'client_id': `UUOCIAQLG2H1U0BBI1XWV3CX0T25YDKRHIRK2YDB41KHAD52`,
        'client_secret': `SR35X0IUEXOBKQHF5J1M5VXNCKQTKI45RVFHB0ZQBBF4TE2P`
    }

    const queryString = queryFormat(params);
    const searchUrl = url + '?' + queryString;

    console.log(searchUrl);
    fetch(searchUrl)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            else { throw new Error(response.statusText) }
        })
        .then(responseJson => Results(responseJson))
        .catch(error => alert("Request could not be completed. Try again later."));
}


// function to display results and fetches results photos from the venue details endpoint.
function Results(responseJsonForDetails) {

    $('#js-result-list').empty();
    if (responseJsonForDetails.response.venues.length == 0 || responseJsonForDetails.response.venues.length == []) {
        $('#js-result-list').append(
            `<li>            
            <p>No results</p>
            </li>`)
    }
    else {
        const param = {
            v: 20201020,
            'client_id': `UUOCIAQLG2H1U0BBI1XWV3CX0T25YDKRHIRK2YDB41KHAD52`,
            'client_secret': `SR35X0IUEXOBKQHF5J1M5VXNCKQTKI45RVFHB0ZQBBF4TE2P`
        }
        const queryStringForDetails = queryFormat(param);

        for (let i = 0; i < responseJsonForDetails.response.venues.length; i++) {

            const searchUrl2 = uri + responseJsonForDetails.response.venues[i].id + '?' + queryStringForDetails;
            console.log(searchUrl2);
            fetch(searchUrl2)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    }
                    else { throw new Error(response.statusText) }
                })
                .then(responseJsonForPhotos => {
                    console.log(responseJsonForPhotos);
                    photoURL(responseJsonForPhotos, responseJsonForDetails)
                })
                .catch(error => console.log(error));
        }
    }
}


//returns empty string if the string is NOT valid
function checkString(inputString) {
    let outputText = inputString;
    if (inputString === undefined) {
        outputText = "No details available";
    }
    if (inputString == null) {
        outputText = "No details available";
    }
    return outputText;
}


//returns if the url is NOT valid
function checkURL(inputURL) {
    let outputURL = inputURL;
    if (inputURL === undefined) {
        outputURL = "/";
    }
    if (inputURL == null) {
        outputURL = "/";
    }
    return outputURL;
}


//function to display the results
function photoURL(responseJsonForPhotos, responseJsonForDetails) {

    for (let i = 0; i < responseJsonForDetails.response.venues.length; i++) {

        if (responseJsonForDetails.response.venues[i].id === responseJsonForPhotos.response.venue.id) {
            const photoPrefix = `${responseJsonForPhotos.response.venue.bestPhoto.prefix}`;
            const photoSuffix = `${responseJsonForPhotos.response.venue.bestPhoto.suffix}`;
            const photoWidth = `${responseJsonForPhotos.response.venue.bestPhoto.width}`;
            const photoHeight = `${responseJsonForPhotos.response.venue.bestPhoto.height}`;
            let photoUri = photoPrefix + photoWidth + 'x' + photoHeight + photoSuffix;
            $('#js-result-list').append(`
                    <li>  
                        <div class="container result-container">
                            <div class="item">
                                <img src="${photoUri}" alt="Picture of venue">
                            </div>
                            <div class="item result-details" >
                                <h3> ${responseJsonForDetails.response.venues[i].name}</h3>
                                <p>${checkString(responseJsonForPhotos.response.venue.description)}</p>
                                <p>${responseJsonForDetails.response.venues[i].location.formattedAddress}</p>
                                <p> Visit: 
                                    <a href="${checkURL(responseJsonForPhotos.response.venue.url)}" target="_blank">
                                        ${checkString(responseJsonForPhotos.response.venue.url)}
                                    </a>                           
                                </p>
                                <hr/>
                            </div>
                        </div>
                    </li>
                `)
        }

    }
    $('#js-results').removeAttr('hidden');
}


//function to clear the search parameters 
//callback function that calls all functions 

function all() {
    landingPage();
    changePage();
    venueSearch();
}
$(all);