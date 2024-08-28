export function ticketReducer(state, action){

    // Add tickets
    switch(action.type){
        case "ADD_TICKET":
            return {
                ...state, 
                tickets: [...state.tickets, action.payload]
            };
        case "UPDATE_TICKET":
            return {
                ...state,
                tickets: state.tickets.map(
                    ticket => 
                        (ticket.id === action.payload.id) 
                        ? action.payload
                        : ticket
                ),
                editingTicket: null
            };
        case "DELETE_TICKET":
            if(state.editingTicket 
                && state.editingTicket.id===action.payload.id){
                return {
                    ...state,
                    tickets: state.tickets.filter(
                        ticket => (ticket.id !== action.payload.id)
                    ),
                    editingTicket: null
                };
            } else{
                return {
                    ...state,
                    tickets: state.tickets.filter(
                        (ticket) => ticket.id !== action.payload.id
                    ),
            };}
        case "SET_EDITING_TICKET":
            return {
                ...state, 
                editingTicket: action.payload
            };
        case "CLEAR_EDITING_TICKET":
            return {
                ...state,
                editingTicket: null
            };
        case "SET_SORTING":
            return{
                ...state,
                sortPreference: action.payload
            };
        case "SET_SORT_BY_DATE":
            return{
                ...state,
                datePreference: action.payload
            };
        default:
            return state;
        
    }
}