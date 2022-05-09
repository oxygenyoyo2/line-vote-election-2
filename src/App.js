import './App.css'
import React, { useEffect } from 'react'
import { useSubscription, gql, useQuery } from '@apollo/client'
import Modal from './components/Modal'
import CandidateCard from './components/CandidateCard'
import ControlElection from './components/ControlElection'
import { withApollo } from '@apollo/client/react/hoc';
import Skeleton from './components/Skeleton'

export const SUBSCRIPTION_VOTE = gql`subscription { voteUpdated { id, votedCount } }`
export const GET_CANDIDATES = gql`
  query {
    candidates {
    id
    name
    dob
    bioLink
    policy
    imageURL
    votedCount
    }
  }
`

function App() {
  const [showModal, setShowModal] = React.useState(false)
  const [voteId, setVoteId] = React.useState()
  const [status, setStatus] = React.useState('idle')
  const [candidates, setCandidates] = React.useState([])
  const [totalVote, setTotalVote] = React.useState(0)
  const [winner, setWinner] = React.useState()



  useSubscription(SUBSCRIPTION_VOTE,
    {
      onSubscriptionData: (data) => {
        if (data.subscriptionData.data.voteUpdated) {
          const { id, votedCount } = data.subscriptionData.data.voteUpdated
          if (candidates && candidates.length > 0) {
            candidates.map((candidate) => {
              if (candidate.id === id) {
                candidate.votedCount = votedCount
              }
              return candidate
            })
          }
        }
      }
    }
  )

  useEffect(() => {
    if (status === 'close') {
      let summary = 0
      candidates.map((dataObject) => {
        summary += parseInt(dataObject.votedCount)
        return dataObject
      })
      const winner = candidates.reduce(function (prev, current) {
        return (prev.votedCount > current.votedCount) ? prev : current
      })
      setTotalVote(summary)
      setWinner(winner)
    }
  }, [status])


  useQuery(GET_CANDIDATES, {
    onCompleted: (data) => {
      setCandidates(data.candidates)
    }
  })

  return (
    <div className="App">
      <ControlElection
        status={status}
        setStatus={setStatus}
      />
      <main className={`container mx-auto px-3 pb-6`}>
        <h1 className='text-4xl text-center my-8'>LINE TOWN Election</h1>
        {status === 'close' && winner &&
          <div className="flex justify-center items-baseline mb-5">
            <div className=" text-xl font-bold">
              the new mayor is:
            </div>
            <h2 className="ml-3 text-3xl font-bold">
              #{winner.id} {winner.name}
            </h2>
          </div>
        }
        {candidates && candidates.length > 0 ?
          <div className='grid lg:grid-cols-4 md:grid-cols-3 gap-4'>
            {candidates.map((candidate, index) => <CandidateCard
              key={index}
              id={candidate.id}
              name={candidate.name}
              dob={candidate.dob}
              bioLink={candidate.bioLink}
              policy={candidate.policy}
              imageURL={candidate.imageURL}
              setShowModal={setShowModal}
              setVoteId={setVoteId}
              status={status}
              totalVote={totalVote}
              votedCount={candidate.votedCount} />)}
          </div>
          :
          <div className='grid lg:grid-cols-4 md:grid-cols-3 gap-4'>
            {[...Array(10).keys()].map((value) => {
              return <Skeleton key={value} />
            })}

          </div>
        }
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          voteId={voteId}
          setStatus={setStatus}
        />
      </main>
    </div>

  );
}

export default withApollo(App)