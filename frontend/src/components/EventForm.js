import {
    Form,
    json,
    redirect,
    useNavigate,
    useNavigation,
} from "react-router-dom";
import classes from "./EventForm.module.css";
import axios from "axios";
import useInput from "../util/useInput";

function EventForm({ method, event }) {
    const isValidStartDate = (value) => {
        const currentDate = new Date().getTime();
        const startDate = new Date(value).getTime();
        return startDate > currentDate;
    };

    const isValidEndDate = (endDate) => {
        const endTime = new Date(endDate).getTime();
        const startTime = new Date(startDateValue).getTime();
        return endTime >= startTime;
    };
    //startDate input
    const {
        value: startDateValue,
        hasError: startDateHasError,
        valueChangeHandler: startDateChangeHandler,
        inputBlurHandler: startDateBlurHandler,
    } = useInput(isValidStartDate);

    //endDate input
    const {
        value: endDateValue,
        hasError: endDateHasError,
        valueChangeHandler: endDateChangeHandler,
        inputBlurHandler: endDateBlurHandler,
    } = useInput(isValidEndDate);

    const navigate = useNavigate();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";

    const cancelHandler = () => {
        navigate("..");
    };
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
                            : { startDateValue }
                    }
                    onChange={startDateChangeHandler}
                    onBlur={startDateBlurHandler}
                />
            </p>
            {startDateHasError && (
                <p className={classes.errorText}>Please choose a valid date!</p>
            )}
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
                            : { endDateValue }
                    }
                    onChange={endDateChangeHandler}
                    onBlur={endDateBlurHandler}
                />
            </p>
            {endDateHasError && (
                <p className={classes.errorText}>Please choose a valid date!</p>
            )}
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
                    onClick={cancelHandler}
                    disabled={isSubmitting}
                >
                    Cancel
                </button>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Save"}
                </button>
            </div>
        </Form>
    );
}

export default EventForm;

export const action = async ({ request, params }) => {
    const method = request.method;
    const data = await request.formData();

    const payload = {
        title: data.get("title"),
        startDate: data.get("startDate"),
        endDate: data.get("endDate"),
        location: data.get("location"),
        image: data.get("image"),
        description: data.get("description"),
        createdDate: new Date().toISOString().substring(0, 10),
        createdBy: localStorage.getItem("email"),
        interested: 0,
        going: 0,
    };

    let url = "http://localhost:4000/events/new";

    if (method === "PATCH") {
        const eventId = params.eventId;
        url = "http://localhost:4000/events/" + eventId;
    }
    const response = await axios({
        method,
        url,
        data: payload,
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    });
    if (response.data.status !== 200) {
        window.alert(response.data.message);
        redirect("/events");
    }
    if (response.statusText !== "OK") {
        throw json({ message: "could not update/add an event", status: 500 });
    } else {
        return redirect("/events");
    }
};
