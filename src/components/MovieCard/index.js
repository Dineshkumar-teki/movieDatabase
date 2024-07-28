import {Link} from 'react-router-dom'
import './index.css'

const MovieCard = props => {
  const {movieDetails} = props
  const {id, title, posterPath, rating} = movieDetails
  const movieImgUrl = `https://image.tmdb.org/t/p/w200/${posterPath}`
  const formatedRating = Math.round(rating * 10) / 10
  return (
    <div className="movieCard">
      <div className="imgContainer">
        <img src={movieImgUrl} alt="Movie Poster" />
        <div className="ratingContainer">
          <p className="rating">{formatedRating}/10</p>
        </div>
      </div>
      <div className="movieDetails">
        <p className="title">{title}</p>

        <Link to={`/movie/${id}`}>
          <button type="button" className="btn">
            View Details
          </button>
        </Link>
      </div>
    </div>
  )
}

export default MovieCard
