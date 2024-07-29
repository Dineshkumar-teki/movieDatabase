import {Switch, Route} from 'react-router-dom'
import {Component} from 'react'
import PopularMovies from './components/PopularMovies'
import TopRatedMovies from './components/TopRatedMovies'
import UpcomingMovies from './components/UpcomingMovies'
import MovieDetails from './components/MovieDetails'
import SearchContext from './context/SearchContext'
import './App.css'

const tabItems = [
  {id: 'POPULARMOVIES', value: 'Popular Movies'},
  {id: 'TOPRATED', value: 'Top Rated Movies'},
  {id: 'UPCOMING', value: 'Upcoming Movies'},
]

// write your code here
class App extends Component {
  state = {activeTab: tabItems[0].id, searchedName: '', filterSearchedName: ''}

  changeTabItem = id => {
    this.setState({activeTab: id})
  }

  getSearchedName = value => {
    this.setState({searchedName: value})
  }

  getSearchBtn = () => {
    const {searchedName} = this.state
    this.setState({filterSearchedName: searchedName})
  }

  render() {
    const {activeTab, searchedName, filterSearchedName} = this.state
    return (
      <SearchContext.Provider
        value={{
          activeTab,
          changeTabItem: this.changeTabItem,
          searchedName,
          getSearchedName: this.getSearchedName,
          filterSearchedName,
          getSearchBtn: this.getSearchBtn,
        }}
      >
        <Switch>
          <Route exact path="/" component={PopularMovies} />
          <Route exact path="/top-rated" component={TopRatedMovies} />
          <Route exact path="/upcoming" component={UpcomingMovies} />
          <Route exact path="/movie/:id" component={MovieDetails} />
        </Switch>
      </SearchContext.Provider>
    )
  }
}

export default App
