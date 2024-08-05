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

class UpcomingMovies extends Component {
  state = {upcomingMovies: [], view: pageView.initial, pageNo: 1}

  componentDidMount() {
    this.fetchUpcomingMovies()
  }

  fetchUpcomingMovies = async () => {
    this.setState({view: pageView.loading})
    const {pageNo} = this.state
    const apiKey = 'cdbd8ea63442d3e614727de48dc80176'
    const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=${pageNo}`
    const response = await fetch(url)
    const responseData = await response.json()
    if (response.ok) {
      const moviesList = responseData.results
      const formatedMoviesList = moviesList.map(eachItem => ({
        id: eachItem.id,
        title: eachItem.title,
        posterPath: eachItem.poster_path,
        rating: eachItem.vote_average,
      }))
      this.setState({
        upcomingMovies: formatedMoviesList,
        view: pageView.success,
      })
    } else {
      this.setState({view: pageView.failure})
    }
  }

  getPageView = () => {
    const {view, upcomingMovies} = this.state
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
              const {filterSearchedName} = value
              const filteredList = upcomingMovies.filter(eachOne =>
                eachOne.title
                  .toLowerCase()
                  .includes(filterSearchedName.toLowerCase()),
              )
              return (
                <section className="popularMovies">
                  <h1>Upcoming Movies</h1>
                  <ul className="moviesContainer">
                    {filteredList.map(eachMovie => (
                      <MovieCard movieDetails={eachMovie} key={eachMovie.id} />
                    ))}
                  </ul>
                </section>
              )
            }}
          </SearchContext.Consumer>
        )
      case pageView.failure:
        return (
          <div className="failureView">
            <img
              src="https://img.freepik.com/free-vector/hand-drawn-no-data-concept_52683-127829.jpg?size=626&ext=jpg&uid=R136712360&ga=GA1.1.1914382452.1716092979&semt=ais_user"
              alt=""
            />
            <h1>Something Went Wrong!!!</h1>
            <button type="button" onClick={this.reloadPage}>
              Reload
            </button>
          </div>
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
        this.fetchUpcomingMovies,
      )
    }
  }

  nextPage = () => {
    this.setState(
      prevState => ({pageNo: prevState.pageNo + 1}),
      this.fetchUpcomingMovies,
    )
  }

  render() {
    const {pageNo} = this.state
    return (
      <>
        <NavBar />
        {this.getPageView()}
        <div className="leftAndRightArrow">
          <button type="button" className="prevButton" onClick={this.prevPage}>
            Prev
          </button>
          <p>{pageNo}</p>
          <button type="button" className="nextButton" onClick={this.nextPage}>
            Next
          </button>
        </div>
      </>
    )
  }
}

export default UpcomingMovies
