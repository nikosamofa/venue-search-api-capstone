// page const variables to be rendered 
//page 1 landing page
const startPage = `<section class="container" id="js-startPage">
<div class="item">
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
        <input type="submit" value="Start Search" class="js-start-search">
    </form>
</div>
</section>`;


//page 2 search page
const searchPage = `  <section class="container" id="js-search-page">
<div class="item">
    <form id="js-search-form" class="search-form">
        <h2>The Venue Search App</h2>

        <label for="categories">i'm looking for</label>
        <select name="categories" id="categories">
                       <option value="food">food</option>
                       <option value="resturant">Resturants</option>
                       <option value="lounge">lounge</option>
                       <option value="outdoor">outdoors</option>
                   </select>

        <label for="location">Near</label>
        <input type="text" name="location">

        <label for="radius">Within Miles</label>
        <input type="number" name="radius"min="1" max="60"> 

        <input type="submit" id="js-search" value="Search">
    </form>
</div>
<div class="item" hidden>
    <ul id="result-list">

    </ul>
</div>
</section>`;


//a function that loads the landing page into the DOM when loaded with the begin search button
function landingPage() {
    $('#js-main-body').html(startPage)
};


//Event function that changes HTML content  and renders the search page when the begin search button is clicked 
function changePage() {
    $('#js-main-body').on('submit', '#js-start-form', event => {
        event.preventDefault();
        console.log('test');
        $('#js-main-body').html(searchPage)
    })
}

//function that listens to search submissions
function venueSearch(event){
    $('#js-main-body').on('submmit','#js-search-form', event =>{
        console.log('test search')
    })

}
//function to make get requests to the API 
//functions that make get requests based on the parameters submitted
//function to clear the search parameters 
//callback function that calls all functions 

function all() {
    landingPage();
    changePage();

};
$(all);