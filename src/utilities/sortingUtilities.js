export default function sortTickets(tickets, preference){
    switch(preference){
        case "High to low":
            return [...tickets].sort(
                (a, b) => b.priority.localeCompare(a.priority)
            );
        case "Low to high":
            return [...tickets].sort(
                (a, b) => a.priority.localeCompare(b.priority)
            ); 
        default:
            return tickets;
    }
}