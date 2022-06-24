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

  //you just won't reset success state when you navigate away from the /tickets page, so next time you go to /tickets success will be true, so if you did have a error in fetching the tickets you may not be able to handle that and display something appropriate to the user.
  // all the first one is doing is returning a function to reset some state which will run when the user navigates away from /tickets i.e. when the Tickets component unmounts.
  useEffect(() => {
    return () => {
      if(isSuccess){
        dispatch(reset())
      }
    }
  },[isSuccess])


  useEffect(() => {
    dispatch(getTickets())
  }, [dispatch])

  if (isLoading) {
    return <Spinner />
  }

  // console.log(tickets) // [{..}, {..}]

  return (
    <div>
      <h1>Tickets</h1>
    </div>
  )
}

export default Tickets
