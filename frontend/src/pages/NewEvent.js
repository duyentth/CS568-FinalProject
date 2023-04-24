import axios from "axios";
import { json, redirect } from "react-router-dom";
import EventForm from "../components/EventForm";

const NewEventPage = () => {
    return <EventForm method='post' event ={null} />;
};

export const action = async ({ request, params }) => {
    const data = request.formData();
    const payload = {
        title: data.get("title"),
        startDate: data.get("startDate"),
        endDate: data.get("endDate"),
        location: data.get("location"),
        image: data.get("image"),
        description: data.get("description"),
        createdDate: new Date().toISOString().substring(0, 10),
        createdBy: "duyen.tran@miu.edu",
        interested: 0,
        going: 0,
    };
    const res = await axios.post("http://localhost:4000/events/new", payload, {
        headers: { "Content-Type": "application/json" },
    });
    if (res.status !== 200) {
        throw json({ message: "could not fetch event", status: 500 });
    }
    return redirect('/events');
};

export default NewEventPage;
