import {Component} from 'react'
import EachTabItem from '../EachTabItem'
import SearchContext from '../../context/SearchContext'
import './index.css'

const tabItems = [
  {id: 'POPULARMOVIES', value: 'Popular Movies'},
  {id: 'TOPRATED', value: 'Top Rated Movies'},
  {id: 'UPCOMING', value: 'Upcoming Movies'},
]

class NavBar extends Component {
  state = {clicked: false}

  handleClick = () => {
    this.setState(prevState => ({clicked: !prevState.clicked}))
  }

  render() {
    const {clicked} = this.state
    return (
      <SearchContext.Consumer>
        {value => {
          const {
            activeTab,
            changeTabItem,
            searchedName,
            getSearchedName,
          } = value
          const alterTabItem = id => {
            changeTabItem(id)
          }
          const userSearchInput = event => {
            getSearchedName(event.target.value)
          }
          return (
            <nav>
              <h1 className="appLogo">movieDB</h1>
              <div className="inputContainer">
                <input
                  type="search"
                  placeholder="Search Movies..."
                  onChange={userSearchInput}
                  value={searchedName}
                />
              </div>
              <ul
                id="navbar"
                className={clicked ? '#navbar active' : '#navbar'}
              >
                {tabItems.map(eachTab => (
                  <EachTabItem
                    eachTab={eachTab}
                    key={eachTab.id}
                    activeTab={activeTab === eachTab.id}
                    alterTabItem={alterTabItem}
                  />
                ))}
              </ul>
            </nav>
          )
        }}
      </SearchContext.Consumer>
    )
  }
}

export default NavBar
