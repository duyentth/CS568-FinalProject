import EventItem from "../components/EventItem";
import axios from "axios";
import { json, redirect, useRouteLoaderData } from "react-router-dom";

const EventDetailPage = () => {
    const respone = useRouteLoaderData("event-detail");
    const event = respone.data;

    return <EventItem event={event} />;
};

export const loader = async ({ request, params }) => {
    const { eventId } = params;
    const response = await axios.get("http://localhost:4000/events/" + eventId);
    if (response.status === 200) {
        return response;
    } else {
        throw json({
            message: "could not fetch details for selected event",
            status: 500,
        });
    }
};

export const action = async ({ request, params }) => {
    const { eventId } = params;
    // const method = request.method;//method is provided from submit({}, {method: 'DELETE'}) function in deleteHandler func
    const response = await axios.delete(
        "http://localhost:4000/events/" + eventId
    , {headers: {Authorization: "Beare " + localStorage.getItem('token')}});
    console.log(response);

    if (response.data.status !== 200) {
        window.alert(response.data.message);        
        redirect("/events");
    }
    if (response.statusText !== "OK") {
        throw json({
            message: "could not delete selected event",
            status: 500,
        });
    } else{
        return redirect('/events');
    }
};

export default EventDetailPage;
