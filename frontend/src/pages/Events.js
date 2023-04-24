import axios from "axios";
import EventsList from "../components/EventsList";
import { json, useLoaderData } from "react-router-dom";

const EventsPage = () => {
    const {data} = useLoaderData();
    return (
        <>
            <EventsList events={data} />
        </>
    );
};

export default EventsPage;

export const loader = async () => {   
    const respone = await axios.get("http://localhost:4000/events");
    if(respone.status === 200) {
        return respone;
    } else {
       throw json({message: "Could not fetch events", status: 500});
    }
};

