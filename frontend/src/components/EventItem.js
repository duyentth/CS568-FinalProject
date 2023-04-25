import classes from "./EventItem.module.css";
import { Link, useRouteLoaderData, useSubmit } from "react-router-dom";

const EventItem = ({ event }) => {
    const token = useRouteLoaderData('root');
    const submit = useSubmit();
    const deleteHandler = () => {
        const proceed = window.confirm("Are you sure to delete?");
        if (proceed) {
            submit(null, { method: "DELETE" });
        }
    };
    return (
        <article className={classes.event}>
            <img src={event.image} alt={event.title} />
            <h1>{event.title}</h1>
            <time>
                Date: {event.startDate} - {event.endDate}
            </time>
            <p>Location: {event.location}</p>
            <p>{event.description}</p>
            {/* <p>Interested</p>
            <p>Going</p> */}
            {token && (
                <menu className={classes.actions}>
                    <Link to="edit">Edit</Link>
                    <button onClick={deleteHandler}>Delete</button>
                </menu>
            )}
        </article>
    );
};

export default EventItem;
