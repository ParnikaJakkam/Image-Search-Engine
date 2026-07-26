const accessKey = "Your-Access-Key"
const searchForm = document.getElementById("search_form")
const searchBox = document.getElementById("search-box")
const searchResult = document.getElementById("search-result")
const searchBtn = document.getElementById("show-more_img")
let keyword = "";
let page = 1;


async function searchImages() {

    keyword = searchBox.value;

    const url = `https://api.unsplash.com/search/photos?page=${page}&per_page=12&query=${keyword}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    // Clear old images for a new search
    if(page === 1){
        searchResult.innerHTML = "";
    }

    results.forEach((result)=>{

        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;

        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";

        imageLink.appendChild(image);

        searchResult.appendChild(imageLink);

    });

    searchBtn.style.display = "block";
}

searchForm.addEventListener("submit",(e)=>{

    e.preventDefault();
    page = 1;
    searchImages();

});

searchBtn.addEventListener("click",()=>{

    page++;
    searchImages();

});