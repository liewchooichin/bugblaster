import React from "react";
import { useState, useEffect } from "react";

export default function TicketForm({dispatch, editingTicket}){
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("1"); // Low

    // use effect when there is an existing ticket.
    useEffect(
        () => {
            if(editingTicket){
                setTitle(editingTicket.title);
                setDescription(editingTicket.description);
                setPriority(editingTicket.priority);
            }
            else 
                clearForm(); // if cancel editing in the midst of editing.
        }, [editingTicket]
    )

    const priorityLabels = {
        1: "Low",
        2: "Medium",
        3: "High"
    }

    function clearForm(){
        setTitle("");
        setDescription("");
        setPriority("1"); // Low
    }

    function handleSubmit(event){
        // make sure the page does not get reloaed.
        event.preventDefault();

        // The ticket need to access the Reducer
        // If we are editing a ticket, we will not
        // create a new id, we will keep the existing
        // id.
        const ticketData = {
            "id": editingTicket ? editingTicket.id : new Date().toISOString(),
            "title": title, 
            "description": description,
            "priority": priority
        }

        // Dispatch action
        // If we are updating a ticket, we will keep the existing ticket.
        // We call "UPDATE_TICKET".
        dispatch({
            type: editingTicket ? "UPDATE_TICKET" : "ADD_TICKET",
            payload: ticketData,
        });

        //console.log(ticketData);
        // clear the form
        clearForm();
    }

    // Cancel the editing form, discard the edits and keep the existing form.
    function handleCancel(){
        dispatch({type: "CLEAR_EDITING_TICKET"});
        clearForm();
    }

    return(
        <form className="ticket-form" onSubmit={handleSubmit}>
            <div>
                <label>Title</label>
                <input type="text" value={title} 
                className="form-input"
                    onChange={event => setTitle(event.target.value)}>
                </input>
            </div>
            <div>
                <label>Description</label>
                <textarea type="text" value={description}
                    className="form-input"
                    onChange={event => setDescription(event.target.value)}
                ></textarea>
            </div>
            <fieldset className="priority-fieldset">
                <legend>Priority</legend>
                {
                    Object.entries(priorityLabels).map(
                        ([value, label]) => {
                            return (<label key={value}
                                className="priority-label">
                                    <input type="radio" value={value}
                                        checked={priority===value}
                                        className="priority-input"
                                        onChange={(event => setPriority(event.target.value))}>
                                    </input>
                                    {label}
                            </label>)
                        }
                    )
                }
            </fieldset>
            <button type="submit" className="button">Submit</button>

            {
                editingTicket
                && (
                    <button className="button"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                )
            }
        </form>
    );
}