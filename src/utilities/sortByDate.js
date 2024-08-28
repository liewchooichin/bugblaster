export default function sortByDate(tickets, datePreference){
    switch(datePreference){
        case "Oldest":
            return [...tickets].sort((a, b) => a.id.localeCompare(b.id));
        case "Latest":
            return [...tickets].sort((a, b) => b.id.localeCompare(a.id));
        default:
            return tickets;
    }

}