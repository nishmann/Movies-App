import { Tag } from 'antd';

import { Consumer } from '../../context';

const Genres = ({ genreIds }) => {
  return (
    <Consumer>
      {(genres) => {
        return (
          <div className="movie__genres">
            {genreIds.map((genreId) => {
              const genre = genres.find((el) => el.id === genreId);
              return <Tag key={genre.id}>{genre.name}</Tag>;
            })}
          </div>
        );
      }}
    </Consumer>
  );
};

export default Genres;
