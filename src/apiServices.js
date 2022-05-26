class ApiServices {
  api = 'https://api.themoviedb.org/3/movie/popular?api_key=05e95f40431909703294af8aa788da5d';

  getMovies = async () => {
    const res = await fetch(this.api);
    if (!res.ok) {
      throw new Error(`Could not fetch ${res.url} received ${res.status}`);
    }
    const body = await res.json();
    return body;
  };
}

export default ApiServices;
