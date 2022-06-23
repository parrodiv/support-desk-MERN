import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTickets, reset } from '../features/tickets/ticketSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

function Tickets() {
  const { tickets, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.tickets
  )

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTickets())
  }, [dispatch])

  if(isLoading) {
    return <Spinner />
  }

  // console.log(tickets) // [{..}, {..}]

  return <div>
    <h1>Tickets</h1>
  </div>
}

export default Tickets
