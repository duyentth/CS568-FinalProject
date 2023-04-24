import { useRouteLoaderData } from "react-router-dom";

import EventForm from "../components/EventForm";

function EditEventPage() {
    const response = useRouteLoaderData("event-detail");

    return <EventForm method='patch' event={response.data}/>;
}

export default EditEventPage;
