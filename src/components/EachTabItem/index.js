import {Link} from 'react-router-dom'
import './index.css'

const EachTabItem = props => {
  const {eachTab, activeTab, alterTabItem} = props
  const {id, value} = eachTab
  const activeTabItem = activeTab ? 'active' : null
  const onClickTab = () => {
    alterTabItem(id)
  }
  const getTabItem = () => {
    switch (id) {
      case 'POPULARMOVIES':
        return (
          <li className={activeTabItem} onClick={onClickTab}>
            <Link to="/">{value}</Link>
          </li>
        )
      case 'TOPRATED':
        return (
          <li className={activeTabItem} onClick={onClickTab}>
            <Link to="/top-rated">{value}</Link>
          </li>
        )
      case 'UPCOMING':
        return (
          <li className={activeTabItem} onClick={onClickTab}>
            <Link to="/upcoming">{value}</Link>
          </li>
        )
      default:
        return null
    }
  }
  return getTabItem()
}

export default EachTabItem
