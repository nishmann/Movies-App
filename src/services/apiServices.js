class ApiServices {
  baseUrl = 'https://api.themoviedb.org/3/';

  apiKey = 'api_key=05e95f40431909703294af8aa788da5d';

  getResource = async (url, option) => {
    const res = await fetch(`${this.baseUrl}${url}`, option);
    if (!res.ok) {
      throw new Error(`Could not fetch ${res.url} received ${res.status}`);
    }
    const body = await res.json();
    return body;
  };

  searchMovies = async (searchText, page) => {
    return this.getResource(`search/movie?${this.apiKey}&query=${searchText}&page=${page}`);
  };

  getGenres = async () => this.getResource(`genre/movie/list?${this.apiKey}`);

  getSessionGuest = async () => this.getResource(`authentication/guest_session/new?${this.apiKey}`);

  rateMovie = async (rate, id) => {
    return this.getResource(
      `movie/${id}/rating?${this.apiKey}&guest_session_id=${localStorage.getItem('guest_session_id')}`,
      {
        method: 'POST',
        body: JSON.stringify({ value: rate }),
        headers: {
          'Content-type': 'application/json, charset=UTF-8',
        },
      }
    );
  };

  getRatedMovie = () => {
    return this.getResource(`guest_session/${localStorage.getItem('guest_session_id')}/rated/movies?${this.apiKey}`);
  };
}

export default ApiServices;
