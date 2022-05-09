import NumberFormat from "react-number-format"

const FormIDCard = ({ setShowModal, checkIDCardFormat, submit, isVoteSuccess, doneSubmit, errorMessage, setErrorMessage }) => {
  console.log('FormIDCard isVoteSuccess', isVoteSuccess)
  return (
    <>
      <div className="relative p-6 flex-auto">
        <p className="my-4 text-slate-500 text-lg leading-relaxed">
          {isVoteSuccess ?
            `You have voted success` :
            `Please enter your national ID to confirm your vote`}
        </p>
        {!isVoteSuccess &&
          <NumberFormat
            className="w-full placeholder:text-slate-500 focus:border-[#07b53b] focus:ring-[#07b53b] focus:outline-none border p-3"
            format={'#-####-#####-##-#'}
            placeholder="x-xxxx-xxxxx-xx-x"
            onValueChange={checkIDCardFormat}
            autoFocus
          />
        }

        {errorMessage &&
          <div className="text-amber-700 text-base mt-3">
            {errorMessage}
          </div>
        }
      </div>
      <div className="flex items-center justify-center p-6 border-t border-solid">
        {isVoteSuccess ?
          <button
            className="bg-[#07b53b] text-white font-bold  text-sm px-10 py-3 rounded"
            type="button"
            onClick={doneSubmit}
          >
            Done
          </button>
          :
          <>
            <button
              className="bg-[#07b53b] text-white font-bold  text-sm px-6 py-3 rounded mr-5"
              type="button"
              onClick={submit}
            >
              Confirm
            </button>
            <button
              className="text-grey-500 font-bold px-6 py-3 text-sm border"
              type="button"
              onClick={() => {
                setErrorMessage('')
                setShowModal(false)
              }}
            >
              Cancel
            </button>
          </>
        }

      </div>
    </>
  )
}

export default FormIDCard