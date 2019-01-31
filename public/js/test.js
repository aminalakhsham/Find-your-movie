const test = require("tape");
const logic = require("./logic.js");

// test makeDateForMovie
test("test makeDateForMovie fuction ", t => {
  const res = {
    results: [
      {
        vote_count: 7151,
        id: 339403,
        video: false,
        vote_average: 7.4,
        title: "Baby Driver",
        popularity: 18.27,
        poster_path: "/rmnQ9jKW72bHu8uKlMjPIb2VLMI.jpg",
        original_language: "en",
        original_title: "Baby Driver",
        genre_ids: [28, 80],
        backdrop_path: "/goCvLSUFz0p7k8R10Hv4CVh3EQv.jpg",
        adult: false,
        overview:
          "After being coerced into working for a crime boss, a young getaway driver finds himself taking part in a heist doomed to fail.",
        release_date: "2017-06-28"
      }
    ]
  };

  const actual = logic.makeDateForMovie(res, () => {
    return;
  });
  const expected = [
    {
      title: "Baby Driver",
      overview:
        "After being coerced into working for a crime boss, a young getaway driver finds himself taking part in a heist doomed to fail.",
      release_date: "2017-06-28",
      vote_average: 7.4,
      id: 339403,
      poster_path: "/rmnQ9jKW72bHu8uKlMjPIb2VLMI.jpg"
    }
  ];
  t.deepEqual(actual, expected, "makeDateForMovie work :)");
  t.end();
});

// test getImageUrl
test("test getImageUrl function", t => {
  const url = "/8YFiUegDjZPuNF1qdENDkcWfXPx.jpg";
  const actual = logic.getImageUrl(url);
  const expected =
    "https://image.tmdb.org/t/p/w600_and_h900_bestv2/8YFiUegDjZPuNF1qdENDkcWfXPx.jpg";
  t.equal(actual, expected, "url poster movie success");
  t.end();
});

// test getMovieUrl
test("test getMovieUrl function", t => {
  const movieName = "baby";
  const actual = logic.getMovieUrl(movieName);
  const expected =
  `https://api.themoviedb.org/3/search/movie?api_key=6b4029e64c1862a24fbb74c05d0aace8&language=en-US&query=baby`;
  t.equal(actual, expected, "url ferch success");
  t.end();
});
