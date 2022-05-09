import { gql, useSubscription } from "@apollo/client";

const SUBSCRIPTION_VOTE = gql`
subscription {
  voteUpdated {
    id,
    votedCount
  }
}
`


function Message() {

  const { data, loading, error } = useSubscription(SUBSCRIPTION_VOTE, {
    onSubscriptionData: (data) => {
      console.log('onSubscriptionData', data)
    }
  })
  console.log(data, loading, error)
  return 'message'
}

export default Message