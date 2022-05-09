const NoticeClose = ({ doneSubmit }) => {
  return (
    <div className="relative p-6 flex-auto">
      <p className="my-4 text-slate-500 text-2xl leading-relaxed">
        The election event has been close.
      </p>
      <div className="text-center">
        <button
          className="bg-[#07b53b] text-white font-bold  text-sm px-10 py-3 rounded"
          type="button"
          onClick={doneSubmit}
        >
          Done
        </button>
      </div>
    </div>
  )
}

export default NoticeClose