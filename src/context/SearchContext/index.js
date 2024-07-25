import React from 'react'

const SearchContext = React.createContext({
  activeTab: 'POPULARMOVIES',
  changeTabItem: () => {},
  searchedName: '',
  getSearchedName: () => {},
})

export default SearchContext
