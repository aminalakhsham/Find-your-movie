const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=49a2024dbbeaea4da5c16734580251d8&query=`;
const imagesUrl = "https://image.tmdb.org/t/p/w600_and_h900_bestv2";
function request({ method, urlMovie, query, callback }) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status !== 200) alert("there is error in api");
      else {
        if (JSON.parse(xhr.responseText)) {
          let response = JSON.parse(xhr.responseText);
          callback(response);
        } else {
          alert("not support this response from API");
        }
      }
    }
  };
  xhr.open(method, urlMovie, true);
  xhr.send();
}

function makeDateForMovie(res, cb) {
  const resulet = res.results;
  const dataMovie = resulet.map(movie => {
    return {
      title: movie.title,
      overview: movie.overview,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
      id: movie.id,
      poster_path: movie.poster_path
    };
  });
  cb(dataMovie);
  return dataMovie;
}

function createElement(elementsName, tagsName) {
  if (elementsName.length !== tagsName.length) return "error";
  let nodes = {};
  elementsName.map((e, i) => (nodes[e] = document.createElement(tagsName[i])));
  return nodes;
}

function appendElement(requestelementsName, append) {
  if (requestelementsName.length === 0) return "error";
  requestelementsName.forEach(requestlement =>
    append.appendChild(requestlement)
  );
}

function querySelectors(selectorsName, enterTypeofQuery) {
  if (selectorsName.length !== enterTypeofQuery.length) return "Error";
  let elements = {};
  enterTypeofQuery.map(
    (e, i) => (elements[selectorsName[i]] = document.querySelector(e))
  );
  return elements;
}

function addClasses(elementsName, className) {
  if (elementsName.length !== className.length) return "error";
  let nodes = {};
  elementsName.map((e, i) => (nodes[e] = e.classList.add(className[i])));
  return nodes;
}

function createSectionTwoTitle() {
  const { searchResult } = createElement(["searchResult"], ["h1"]);
  appendElement([searchResult], sectionTwoTitel);
  searchResult.innerText = "Your Search Result";
}

function scrollToResult() {
  setTimeout(() => (html.scrollTop = sectionTwoTitel.offsetTop), 200);
}
const getMovieUrl = movieName => {
  return `https://api.themoviedb.org/3/search/movie?api_key=6b4029e64c1862a24fbb74c05d0aace8&language=en-US&query=${movieName}`;
};
const getImageUrl = moviePoster => {
  return `https://image.tmdb.org/t/p/w600_and_h900_bestv2${moviePoster}`;
};

if (typeof module !== "undefined") {
  module.exports = {
    makeDateForMovie,
    getMovieUrl,
    getImageUrl
  };
}
