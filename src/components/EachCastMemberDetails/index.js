import './index.css'

const EachCastMemberDetails = props => {
  const {eachMember} = props
  const {profileImg, character, name} = eachMember
  const movieImgUrl = `https://image.tmdb.org/t/p/w500${profileImg}`
  return (
    <li className="castProfile1">
      <img src={movieImgUrl} alt={name} />
      <div>
        <h4>{name}</h4>
        <p>{character}</p>
      </div>
    </li>
  )
}

export default EachCastMemberDetails
