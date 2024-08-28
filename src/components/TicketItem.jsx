import React from "react";

export default function TicketItem({ticket, dispatch}){

    // It seems like the ticket can be used as is without
    // further re-assignment.
    // Initially, it is like this in the tutorial:
    //const {id, title, description, priority} = ticket;
    // I use these invidual assignmet. This is clearer to me.
    // Payload is an object; so it must be wrapped in {}.
    const ticketId = ticket.id;
    const ticketTitle = ticket.title;
    const ticketDescription = ticket.description;
    const ticketPriority = ticket.priority;
    

    const priorityClass = {
        1: "priority-low",
        2: "priority-medium",
        3: "priority-high"
    }

    return(
        <div className="ticket-item">
            <div className={`priority-dot ${priorityClass[ticketPriority]}`}>
            </div>

            <h3>{ticketTitle}</h3>
            <p>{ticketDescription}</p>

            <button 
                className="button" 
                onClick={
                    () => dispatch(
                        {
                            type: "DELETE_TICKET", 
                            payload: {id: ticketId}
                        }
                    )
                }
            >
                Delete
            </button>

            <button
                className="button"
                onClick={
                    () => {
                        dispatch(
                            {
                                type: "SET_EDITING_TICKET",
                                payload: ticket
                            }
                        )
                    }
                }
            >
                Edit
            </button>
        </div>
    )
}
