// import { useLoaderData } from 'react-router-dom';
import { Link } from "react-router-dom";

import classes from "./EventsList.module.css";
import { useState } from "react";

const EventsList = ({ events }) => {
    const [search, setSearch] = useState("");

    return (
        <div className={classes.events}>
            <h1>All Events</h1>
            <input
                className={classes.searchBox}
                placeholder="search events"
                onChange={(e) => setSearch(e.target.value)}
            ></input>
            <ul className={classes.list}>
                {events
                    .filter((event) => {
                        return search.toLocaleLowerCase() === ""
                            ? event
                            : event.title.toLocaleLowerCase().includes(search);
                    })
                    .map((event, index) => (
                        <li key={index} className={classes.item}>
                            <Link to={`/events/${event._id}`}>
                                <img src={event.image} alt={event.title} />
                                <div className={classes.content}>
                                    <h2>{event.title}</h2>
                                    <time>
                                        Date: {event.startDate} -{" "}
                                        {event.endDate}
                                    </time>
                                    <p>Location: {event.location}</p>
                                    {/* <p>Interested</p>
                                <p>Going</p> */}
                                </div>
                            </Link>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default EventsList;
