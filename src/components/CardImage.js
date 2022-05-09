
const CardImage = ({ imageURL, id }) => {
  return (imageURL ?
    <div className="relative min-h-[200px]">
      <img
        src={imageURL.replace('/revision/latest', '')}
        className="max-w-none w-full max-h-[200px] md:max-h-[230px] object-cover"
        alt="Candidate"
      />
      <div className="card-id">
        {id}
      </div>
    </div>
    : <div>default image</div>
  )
}
export default CardImage