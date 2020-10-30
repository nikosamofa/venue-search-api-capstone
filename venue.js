//a function that loads the landing page into the DOM when loaded with the begin search button
function landingPage() {

    $('#js-startPage').append(
        `<div class="item">
        <form id="js-start-form" class="start-form">
            <h2>The Venue Search App</h2>
            <p>Are planing a wedding, a dinner, a surprise birthday party or just time to chill with friends and
                family ? you've came to the right place!
                the venue search app is designed to helps you finde the perfect venue to experience this
                cherished
                moments.
                with the help of advanced technologies and a vast database of locations within your area, our
                app
                will help you norrow down the perfect venue that meets
                your needs and matches your taste</p>
            <input type="submit" value="Start Search">
        </form>
    </div>`
    )
    //     console.log(`<form id="js-start-form" class="start-form">
    //     <h2>The Venue Search App</h2>
    // <p>Are planing a wedding, a dinner, a surprise birthday party or just time to chill with friends and
    //     family ? you've came to the right place!
    //     the venue search app is designed to helps you finde the perfect venue to experience this cherished
    //     moments.
    //     with the help of advanced technologies and a vast database of locations within your area, our app
    //     will help you norrow down the perfect venue that meets
    //     your needs and matches your taste</p>
    // <input type="submit" value="Start Search">
    // </form>`)
};
//event function that changes page to the search page when the begin search button is clicked 
//function to make get requests to the API 
//functions that make get requests based on the parameters submitted
//function to clear the search parameters 
//callback function that calls all functions 

function all() {
    landingPage()
};
$(all);