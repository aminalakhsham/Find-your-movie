const {
  section,
  searchInput,
  qurtySherch,
  sectionTwoTitel,
  html
} = querySelectors(
  ["section", "searchInput", "qurtySherch", "sectionTwoTitel", "html"],
  [
    ".movieDataSection",
    ".search__form--name",
    ".search__form",
    ".SectionTwoTitel",
    "html"
  ]
);

qurtySherch.addEventListener("submit", e => {
  e.preventDefault();
  sectionTwoTitel.classList.add("SectionTwoTitel__margin");
  if (
    searchInput.value &&
    searchInput.value !== "" &&
    searchInput.value !== " "
  ) {
    request({
      method: "GET",
      urlMovie: getMovieUrl(searchInput.value),
      query: searchInput.value,
      callback: response => makeDateForMovie(response, renderData)
    });
  } else {
    section.innerHTML = "";
    sectionTwoTitel.innerHTML = "";
    createSectionTwoTitle();
    const { error } = createElement(["error"], ["h1"]);
    error.innerText = "Please Enter a movie name";
    appendElement([error], section);
  }
  searchInput.value = "";
  scrollToResult();
});

function renderData(response) {
  section.innerHTML = "";
  sectionTwoTitel.innerHTML = "";
  createSectionTwoTitle();
  if (response.length === 0) {
    const { h1Error } = createElement(["h1Error"], ["h1"]);
    h1Error.innerText = "No Result to show";
    appendElement([h1Error], section);
    scrollToResult();
  }
  response.forEach(movie => {
    let { divMovie, posterMovie, titelMovie } = createElement(
      ["divMovie", "posterMovie", "titelMovie"],
      ["div", "img", "h1"]
    );
    creaatePosterModal(divMovie, movie, posterMovie);
    appendElement([posterMovie, titelMovie], divMovie);
    appendElement([divMovie], section);
    titelMovie.innerText = movie.title;
    posterMovie.src = getImageUrl(movie.poster_path);
    addClasses(
      [divMovie, posterMovie, titelMovie],
      [
        "movieDataSection__movieDiv",
        "movieDataSection__movieDiv--movieImg",
        "movieDataSection__movieDiv--movieSpan"
      ]
    );
  });
}

function creaatePosterModal(divMovie, movie, posterMovie) {
  let {
    modal,
    modalImg,
    modalClose,
    divMovieDes,
    movieTitle,
    overview,
    overviewSpan,
    releaseDate,
    releaseDateSpan,
    voteAverage,
    voteAverageSpan
  } = createElement(
    [
      "modal",
      "modalImg",
      "modalClose",
      "divMovieDes",
      "movieTitle",
      "overview",
      "overviewSpan",
      "releaseDate",
      "releaseDateSpan",
      "voteAverage",
      "voteAverageSpan"
    ],
    ["div", "img", "span", "div", "h1", "p", "span", "p", "span", "p", "span"]
  );

  appendElement([modal], divMovie);
  appendElement([modalImg, divMovieDes, modalClose], modal);
  appendElement(
    [
      movieTitle,
      overviewSpan,
      overview,
      releaseDateSpan,
      releaseDate,
      voteAverageSpan,
      voteAverage
    ],
    divMovieDes
  );
  addClasses(
    [
      modal,
      modalImg,
      modalClose,
      divMovieDes,
      movieTitle,
      overview,
      releaseDate,
      voteAverage,
      overviewSpan,
      releaseDateSpan,
      voteAverageSpan
    ],
    [
      "modal",
      "modal__img",
      "modal__close",
      "modal__movieDescription",
      "modal__movieDescription--movieTitle",
      "modal__movieDescription--overview",
      "modal__movieDescription--releaseDate",
      "modal__movieDescription--voteAverage",
      "modal__movieDescription--span",
      "modal__movieDescription--span",
      "modal__movieDescription--span"
    ]
  );
  modalClose.innerHTML = "&times;";
  modalImg.src = `${imagesUrl}${movie.poster_path}`;
  movieTitle.innerText = movie.title;
  overview.innerText = movie.overview;
  overviewSpan.innerText = "Over View :";
  releaseDate.innerText = movie.release_date;
  releaseDateSpan.innerText = "Release Date:";
  voteAverage.innerText = movie.vote_average;
  voteAverageSpan.innerText = "Vote Average";
  modalClose.onclick = function() {
    modal.style.display = "none";
  };
  posterMovie.onclick = function() {
    modal.style.display = "flex";
  };
}
