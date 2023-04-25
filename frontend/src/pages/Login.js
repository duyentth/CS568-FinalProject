import { json, redirect } from "react-router-dom";

import AuthForm from "../components/AuthForm";
import axios from "axios";

const LoginPage = () => {
    return <AuthForm />;
};

export default LoginPage;

export async function action({ request, params }) {
    const searchParams = new URL(request.url).searchParams;
    const mode = searchParams.get("mode") || "login";

    if (mode !== "login" && mode !== "signup") {
        throw json({ message: "Unsupported mode." }, { status: 422 });
    }

    const data = await request.formData();
    let payload = {};
    if (mode === "login") {
        payload = {
            email: data.get("email"),
            password: data.get("password"),
        };
    }
    if (mode === "signup") {
        payload = {
            email: data.get("email"),
            password: data.get("password"),
            name: data.get("name"),
            phone: data.get("phone"),
        };
    }

    const response = await axios.post(
        "http://localhost:4000/users/" + mode,
        payload
    );
    if (response.statusText !== "OK") {
        throw json(
            { message: "Could not authenticate user." },
            { status: 500 }
        );
    }
    if (response.data.status !== 200) {
        window.alert(response.data.message);
        return redirect("/auth?mode=login");
    } else {
        if (mode === "signup") {
            return redirect("/auth?mode=login");
        }
        if (mode === "login") {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem('email', payload.email);
            return redirect("/events");
        }
     }
}
