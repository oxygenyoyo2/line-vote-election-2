import CardImage from "./CardImage"
import millify from "millify"
import React, { useEffect } from "react"


const CandidateCard = ({
  id,
  name,
  dob,
  bioLink,
  policy,
  imageURL,
  votedCount,
  setShowModal,
  status = "idle",
  setVoteId,
  totalVote
}) => {

  const [percent, setPercent] = React.useState(0)
  useEffect(() => {
    if (totalVote !== 0) {
      setPercent(100 * votedCount / totalVote)
    } else {
      setPercent(0)
    }
  }, [totalVote])

  return (
    <div className="border p-2.5">
      <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
        <a href={bioLink} target="_blank" rel="noreferrer">
          <CardImage imageURL={imageURL} id={id} />
        </a>
        <div className="flex flex-col items-start md:flex-row md:justify-between">
          <div className="text-left md:text-center">
            <h2 className="text-4xl md:text-xl">{name}</h2>
            <p className="text-slate-500 text-xs md:text-xs">{dob}</p>
          </div>
          <div>
            <h3 className="text-4xl md:text-xl md:text-center">{millify(votedCount)}</h3>
            <p className="text-slate-500 text-xs md:text-xs md:text-center">votes</p>
          </div>
        </div>
      </div>
      <div className="col-span-full my-4 md:my-3 text-center italic text-2xl md:text-lg">
        &quot;{policy}&quot;
      </div>
      <div className="text-center min-h-[44px]">
        {status === "open" &&
          <button
            className="visible rounded-xl font-bold uppercase bg-[#07b53b] text-white px-10 py-2.5"
            type="button"
            onClick={() => {
              setShowModal(true)
              setVoteId(id)
            }}
          >
            vote
          </button>
        }
        {status === "close" &&
          <div
            style={{ "--width": percent }}
            className="process-bar relative w-full h-[3rem] border-[#07b53b] border rounded-3xl text-white"
            data-label={`${percent > 0 ? percent.toFixed(2) : 0}%`}>
          </div>
        }

      </div>
    </div>
  )
}

export default CandidateCard