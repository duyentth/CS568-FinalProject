import { Form } from "react-router-dom";

import classes from "./EventForm.module.css";

function EventForm({ method, event }) {
    return (
        <Form method={method} className={classes.form}>
            <p>
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    type="text"
                    name="title"
                    required
                    defaultValue={event ? event.title : ""}
                />
            </p>
            <p>
                <label htmlFor="image">Image</label>
                <input
                    id="image"
                    type="url"
                    name="image"
                    required
                    defaultValue={event ? event.image : ""}
                />
            </p>
            <p>
                <label htmlFor="startDate">Start Date</label>
                <input
                    id="startDate"
                    type="date"
                    name="startDate"
                    required
                    defaultValue={
                        event
                            ? new Date(event.startDate)
                                  .toISOString()
                                  .substring(0, 10)
                            : ""
                    }
                />
            </p>
            <p>
                <label htmlFor="endDate">End Date</label>
                <input
                    id="endDate"
                    type="date"
                    name="endDate"
                    required
                    defaultValue={
                        event
                            ? new Date(event.endDate)
                                  .toISOString()
                                  .substring(0, 10)
                            : ""
                    }
                />
            </p>
            <p>
                <label htmlFor="description">Location</label>
                <textarea
                    id="location"
                    name="location"
                    rows="5"
                    required
                    defaultValue={event ? event.location : ""}
                />
            </p>
            <p>
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    name="description"
                    rows="5"
                    required
                    defaultValue={event ? event.description : ""}
                />
            </p>
            <div className={classes.actions}>
                <button
                    type="button"
                    
                >
                    Cancel
                </button>
                <button type='submit'>
                    Save
                </button>
            </div>
        </Form>
    );
}

export default EventForm;

// export async function action({ request, params }) {
//     const method = request.method;
//     const data = await request.formData();

//     const eventData = {
//         title: data.get("title"),
//         image: data.get("image"),
//         date: data.get("date"),
//         description: data.get("description"),
//     };

//     let url = "http://localhost:8080/events";

//     if (method === "PATCH") {
//         const eventId = params.eventId;
//         url = "http://localhost:8080/events/" + eventId;
//     }

//     const token = getAuthToken();
//     const response = await fetch(url, {
//         method: method,
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: "Bearer " + token,
//         },
//         body: JSON.stringify(eventData),
//     });

//     if (response.status === 422) {
//         return response;
//     }

//     if (!response.ok) {
//         throw json({ message: "Could not save event." }, { status: 500 });
//     }

//     return redirect("/events");
// }
