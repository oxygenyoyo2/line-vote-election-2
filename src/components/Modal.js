import { gql, useMutation } from "@apollo/client";
import React from "react"
import { checkFormularIDCard } from "../helper/idcard";
import FormIDCard from "./FormIDCard";
import NoticeVoted from "./NoticeVoted";
import NoticeClose from './NoticeClose';

export default function Modal({ showModal = false, setShowModal, voteId, setStatus }) {
  const [idCard, setIdCard] = React.useState();
  const [isVoteSuccess, setIsVoteSuccess] = React.useState(false);
  const [notice, setNotice] = React.useState();
  const [isVoted, setIsVoted] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState();

  const MUTATION_VOTE = gql`
      mutation {
        vote(id: "${voteId}")
      }
      `
  const [voteCandidate] = useMutation(MUTATION_VOTE, {
    context: {
      headers: {
        Authorization: idCard,
      }
    },
    onError: (error) => {
      if (error.message === "Duplicated IDCard") {
        setIsVoted(true)
      }
      if (error.message === "this.cache.batch is not a function") {
        setIsVoteSuccess(true)
      }
      if (error.message === 'Not open election at the moment') {
        setStatus('close')
        setNotice(true)
      }
    },
    onCompleted(result) {
      if (result.vote) {
        setIsVoteSuccess(true)
        localStorage.setItem(idCard, true)
      }
    },
  })

  const checkIDCardFormat = (values) => {
    const { value } = values
    const isFillThirteenDigit = value.length === 13
    if (isFillThirteenDigit) {
      if (checkFormularIDCard(value)) {
        setIdCard(value)
        setErrorMessage('')
      } else {
        setErrorMessage('หมายเลขบัตรประชาชนไม่ถูกต้อง')
      }
    }
  }


  const onSubmit = () => {
    const isNewIDCardCanVote = !localStorage.getItem(idCard)
    if (idCard && isNewIDCardCanVote) {
      voteCandidate()
    } else {
      setIsVoted(true)
    }
  }
  const doneSubmit = () => {
    setIsVoteSuccess(false)
    setIsVoted(false)
    setShowModal(false)
    setNotice(false)
  }

  return (
    <>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative z-2 w-auto my-6 mx-auto max-w-3xl">
              <div className={`border-0 shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-0 ${isVoted && 'p-12'}`}>
                {notice ?
                  <NoticeClose doneSubmit={doneSubmit} />
                  : (isVoted && !notice) ?
                    <NoticeVoted
                      doneSubmit={doneSubmit}
                    />
                    :
                    <FormIDCard
                      isVoteSuccess={isVoteSuccess}
                      checkIDCardFormat={checkIDCardFormat}
                      submit={onSubmit}
                      setShowModal={setShowModal}
                      doneSubmit={doneSubmit}
                      errorMessage={errorMessage}
                      setErrorMessage={setErrorMessage}
                    />
                }
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}