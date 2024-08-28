import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import './bugblaster.css'
import { useReducer } from 'react'
import TicketForm from './components/TicketForm'
import { ticketReducer } from './reducer/ticketReducer'
import TicketList from './components/TicketList'
import sortTickets from './utilities/sortingUtilities'

function App() {
  
  // empty array of tickets object
  const initialState = { 
    tickets: [],
    editingTicket: null,
    sortPreference: "High to low"
  };

  // Reducer logic
  const [state, dispatch] = useReducer(
    ticketReducer, initialState
  )

  // Sorting tickets
  const sortedTickets = sortTickets(state.tickets, state.sortPreference);

  // Only show "All Tickets" if there are tickets to show.
  // The && is read then-if there are tickets then render
  // the ticket list.
  // This is called conditional rendering.
  return (
    <div>
      <div className="container">
        <h1>Bug Blaster</h1>
        <TicketForm 
          dispatch={dispatch}
          editingTicket={state.editingTicket}
        >
        </TicketForm>

        { (state.tickets.length > 0) 
          && (
          <div className="results">
            <h2>All tickets</h2>

            <select value={state.sortPreference}
              onChange={
                event => dispatch({
                  type:"SET_SORTING", 
                  payload: event.target.value})
              }>
              <option value="High to low">High to low</option>
              <option value="Low to high">Low to high</option>
            </select>

            <TicketList
              tickets={sortedTickets}
              dispatch={dispatch}
            ></TicketList>
          </div>
          )
        }
      </div>
    </div>
  )
}

export default App
