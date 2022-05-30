class ApiServices {
  apiKey = 'api_key=05e95f40431909703294af8aa788da5d';

  getMovies = async () => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/popular?${this.apiKey}`);
    if (!res.ok) {
      throw new Error(`Could not fetch ${res.url} received ${res.status}`);
    }
    const body = await res.json();
    return body;
  };

  searchMovies = async (searchtext, page) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?${this.apiKey}&query=${searchtext}&page=${page}`
    );
    if (!res.ok) {
      throw new Error(`Could not fetch ${res.url} received ${res.status}`);
    }
    const body = await res.json();
    return body;
  };
}

export default ApiServices;
