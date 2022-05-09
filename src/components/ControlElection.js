import { gql, useMutation } from "@apollo/client"
import { useState } from "react"

const ControlElection = ({ setStatus, status }) => {
  const [toggleState, setToggleState] = useState(false)

  const MUTATION_OPEN = gql`mutation { open }`
  const MUTATION_CLOSE = gql`mutation { close }`
  const [openElection] = useMutation(MUTATION_OPEN)
  const [closeElection] = useMutation(MUTATION_CLOSE)

  const onSelect = (e) => {
    const electionStatus = e.target.value
    if (electionStatus === 'open') {
      openElection()
    } else if (electionStatus === 'clse') {
      closeElection()
    }
    setStatus(e.target.value)
  }
  const toggleMenu = () => {
    if (toggleState) {
      document.querySelector('#menu').style.right = "-80px"
    } else {
      document.querySelector('#menu').style.right = 0
    }
    setToggleState(!toggleState)
  }
  return (
    <>
      <div id="menu" className="transition-all duration-400 menu fixed top-[100px] right-[-80px] flex flex-col items-center bg-gray-300" style={{ zIndex: 100 }}>
        <div className="p-3 w-[80px] flex flex-col items-center">
          <input onClick={onSelect} checked={status === 'idle' && 'checked'} className="button" type="radio" name="toggle" value="idle" />
          Idle
        </div>
        <div className="p-3 w-[80px] flex flex-col items-center">
          <input onClick={onSelect} checked={status === 'open' && 'checked'} className="button" type="radio" name="toggle" value="open" />
          Open
        </div>
        <div className="p-3 w-[80px] flex flex-col items-center">
          <input onClick={onSelect} checked={status === 'close' && 'checked'} className="button" type="radio" name="toggle" value="close" />
          Close
        </div>
        <button onClick={toggleMenu} className="absolute left-[-30px] bg-gray-300 p-1 px-3 toggle-menu">{toggleState ? ">" : "<"}</button>
      </div>
    </>
  )
}

export default ControlElection