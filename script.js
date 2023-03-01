// Toggle the search bar
const searchIcon = document.querySelector(".search-icon");
const searchBar = document.querySelector("#search-keyword");

searchIcon.addEventListener('click', () => {
    searchBar.classList.toggle('active');
})



// fetch APIKEY
const APIKEY = "6261e5d927fc48c28952360ef0be68fa";
let imagesData;
const fetchesImages = async () => {
    try {
        return await axios.get(`https://newsapi.org/v2/everything?q=Apple&from=2023-02-28&sortBy=popularity&apiKey=${APIKEY}`);
    } catch(error) {
        alert("There was an error ", error);
    }
}

const fetchImagesByKeyword = async () => {
    const searchKeyword = document.getElementById('search-keyword');
    try {
        return await axios.get(`https://newsapi.org/v2/everything?q=${searchKeyword.value}&from=2023-02-18&sortBy=popularity&apiKey=${APIKEY}`);
        
    } catch(error) {
        alert("There was an error ", error);
    }
}

const fetchSports = async () => {
    try{
        return await axios.get(`https://newsapi.org/v2/everything?q=Sports&from=2023-02-28&sortBy=popularity&apiKey=${APIKEY}`);
    } catch(error) {
        alert("There was an error ", error);
    }
}

const fetchPolitics = async () => {
    try {
        return await axios.get(`https://newsapi.org/v2/everything?q=Politics&from=2023-02-28&sortBy=popularity&apiKey=${APIKEY}`)
    } catch(error) {
        alert("There was an error ", error);
    }
}


const generateUI = (arrayOfImages) => {
    let photoSection = document.getElementById('photo-section')
    photoSection.innerHTML = "";
    arrayOfImages.forEach((imageObject) => {
        console.log(imageObject);
        let imageContainer = document.createElement('div');
        imageContainer.classList.add("card");

        imageContainer.innerHTML = `
        <img class="newsImg" src=${imageObject.urlToImage}>
        <div class="content">
            <h3>${imageObject.title}</h3>
            <h5>Author: ${imageObject.author}</h5>
            <p>${imageObject.description}</p>
        </div>
        `

        let readMore = document.createElement('button');
        readMore.classList.add('readMore');
        readMore.textContent = "Read more";
        readMore.addEventListener('click', () => {
            window.location.href = imageObject.url;
        });

        imageContainer.appendChild(readMore);
        photoSection.appendChild(imageContainer);


    })
}

async function getSports() {
    const {data} = await fetchSports();
    imagesData = data.articles.map((imageObject) => {
        return {
            urlToImage:imageObject.urlToImage,
            title: imageObject.title,
            author: imageObject.author,
            description: imageObject.description,
            url: imageObject.url
        }
    })
    generateUI(imagesData);
}

async function getPolitics() {
    const {data} = await fetchPolitics();
    imagesData = data.articles.map((imageObject) => {
        return {
            urlToImage: imageObject.urlToImage,
            title: imageObject.title,
            author: imageObject.author,
            description: imageObject.description,
            url: imageObject.url
        }
    })
    generateUI(imagesData);
}

async function getImageDataByKeyword() {
    const { data } = await fetchImagesByKeyword();
    console.log(data.articles);
    imagesData = data.articles.map((imageObject) => {
        return {
            urlToImage:imageObject.urlToImage,
            title: imageObject.title,
            author: imageObject.author,
            description: imageObject.description,
            url: imageObject.url
        }
    });
    generateUI(imagesData);
    
}

async function getData() {
    const { data } = await fetchesImages();
    console.log(data,"Original Data");
    imagesData = data.articles.map((imageObject) => {
        return {
            urlToImage:imageObject.urlToImage,
            title: imageObject.title,
            author: imageObject.author,
            description: imageObject.description,
            url: imageObject.url
        }
    });
    generateUI(imagesData);
}

getData();