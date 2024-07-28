import {Component} from 'react'
import Loader from 'react-loader-spinner'
import NavBar from '../NavBar'
import MovieCard from '../MovieCard'
import SearchContext from '../../context/SearchContext'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const pageView = {
  loading: 'LOADING',
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class TopRatedMovies extends Component {
  state = {topRatedMovies: [], view: pageView.initial, pageNo: 1}

  componentDidMount() {
    this.fetchTopRatedMovies()
  }

  fetchTopRatedMovies = async () => {
    this.setState({view: pageView.loading})
    const {pageNo} = this.state
    const apiKey = 'cdbd8ea63442d3e614727de48dc80176'
    const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=${pageNo}`
    const response = await fetch(url)
    const responseData = await response.json()
    const moviesList = responseData.results
    const formatedMoviesList = moviesList.map(eachItem => ({
      id: eachItem.id,
      title: eachItem.title,
      posterPath: eachItem.poster_path,
      rating: eachItem.vote_average,
    }))
    this.setState({topRatedMovies: formatedMoviesList, view: pageView.success})
  }

  getPageView = () => {
    const {view, topRatedMovies} = this.state
    switch (view) {
      case pageView.loading:
        return (
          <div className="loader">
            <Loader type="TailSpin" color="blue" width={80} height={80} />
          </div>
        )
      case pageView.success:
        return (
          <SearchContext.Consumer>
            {value => {
              const {searchedName} = value
              const filteredList = topRatedMovies.filter(eachOne =>
                eachOne.title
                  .toLowerCase()
                  .includes(searchedName.toLowerCase()),
              )
              return (
                <ul className="moviesContainer">
                  {filteredList.map(eachMovie => (
                    <MovieCard movieDetails={eachMovie} key={eachMovie.id} />
                  ))}
                </ul>
              )
            }}
          </SearchContext.Consumer>
        )
      default:
        return null
    }
  }

  prevPage = () => {
    const {pageNo} = this.state
    if (pageNo > 1) {
      this.setState(
        prevState => ({pageNo: prevState.pageNo - 1}),
        this.fetchTopRatedMovies,
      )
    }
  }

  nextPage = () => {
    this.setState(
      prevState => ({pageNo: prevState.pageNo + 1}),
      this.fetchTopRatedMovies,
    )
  }

  render() {
    const {pageNo} = this.state
    return (
      <>
        <NavBar />
        <section className="popularMovies">
          <h1>Top Rated Movies</h1>
          {this.getPageView()}
          <div className="leftAndRightArrow">
            <button type="button" onClick={this.prevPage}>
              {'<'}
            </button>
            <p>{pageNo}</p>
            <button type="button" onClick={this.nextPage}>
              {'>'}
            </button>
          </div>
        </section>
      </>
    )
  }
}

export default TopRatedMovies
