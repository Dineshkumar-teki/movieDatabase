import {Component} from 'react'
import Loader from 'react-loader-spinner'
import EachCastMemberDetails from '../EachCastMemberDetails'
import NavBar from '../NavBar'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const pageView = {
  loading: 'LOADING',
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class MovieDetails extends Component {
  state = {
    movieDetails: {},
    castMembersList: [],
    displayFullContent: false,
    view: pageView.initial,
  }

  componentDidMount() {
    this.getMovieDetails()
  }

  getMovieDetails = async () => {
    this.setState({view: pageView.loading})
    const apiKey = 'cdbd8ea63442d3e614727de48dc80176'
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
    const casturl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en-US`
    const response = await fetch(url)
    const castresponse = await fetch(casturl)
    const data = await response.json()
    const castData = await castresponse.json()
    // console.log(data)
    const formatedData = {
      title: data.title,
      image: data.poster_path,
      ratings: data.vote_average,
      duration: data.runtime,
      genre: data.genres.map(eachObj => eachObj.name).join(' | '),
      releaseDate: data.release_date,
      overview: data.overview,
    }
    const castMembersList = castData.cast
    const formatedCastData = castMembersList.map(eachItem => ({
      name: eachItem.original_name,
      profileImg: eachItem.profile_path,
      character: eachItem.character,
      id: eachItem.id,
    }))
    this.setState({
      movieDetails: formatedData,
      castMembersList: formatedCastData,
      view: pageView.success,
    })
  }

  displayFull = () => {
    this.setState(prevState => ({
      displayFullContent: !prevState.displayFullContent,
    }))
  }

  getPageView = () => {
    const {movieDetails, castMembersList, displayFullContent, view} = this.state
    const movieImgUrl = `https://image.tmdb.org/t/p/w300/${movieDetails.image}`
    const formatedRating = Math.round(movieDetails.ratings * 10) / 10
    const {duration} = movieDetails
    const durationInHr = Math.floor(parseInt(duration) / 60)
    const durationInMin = parseInt(duration) - durationInHr * 60
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true,
    }
    switch (view) {
      case pageView.loading:
        return (
          <div className="loader">
            <Loader type="TailSpin" color="blue" width={80} height={80} />
          </div>
        )
      case pageView.success:
        return (
          <div className="specificMovieCard">
            <img src={movieImgUrl} alt="Img" />
            <div className="specificMovieDetails">
              <h1>{movieDetails.title}</h1>
              <p className="movieRating">
                <span>Rating:</span> {formatedRating}/10
              </p>
              <p className="movieDuration">
                <span>Duration:</span> {`${durationInHr}h ${durationInMin}m`}
              </p>
              <p className="movieReleaseDate">
                <span>Release date:</span> {movieDetails.releaseDate}
              </p>
              <p className="movieReleaseDate">
                <span>Genre:</span> {movieDetails.genre}
              </p>
              {displayFullContent ? (
                <p>
                  {movieDetails.overview}{' '}
                  <button
                    type="button"
                    className="moreEle"
                    onClick={this.displayFull}
                  >
                    Show less...
                  </button>
                </p>
              ) : (
                <p>
                  {`${movieDetails.overview.substring(
                    0,
                    movieDetails.overview.length / 2,
                  )}`}{' '}
                  <button
                    type="button"
                    className="moreEle"
                    onClick={this.displayFull}
                  >
                    Show more...
                  </button>
                </p>
              )}

              <h2>Cast:</h2>
              <ul className="castMembers">
                {castMembersList.map(eachItem => (
                  <EachCastMemberDetails
                    eachMember={eachItem}
                    key={eachItem.id}
                  />
                ))}
              </ul>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <NavBar />
        <section className="specificMovie">{this.getPageView()}</section>
      </>
    )
  }
}
export default MovieDetails
