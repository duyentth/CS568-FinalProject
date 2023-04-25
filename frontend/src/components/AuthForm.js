import {
    Form,
    Link,
    useSearchParams,
    useActionData,
    useNavigation,
} from "react-router-dom";

import classes from "./AuthForm.module.css";

function AuthForm() {
    const data = useActionData();
    const navigation = useNavigation();

    const [searchParams] = useSearchParams();
    const isLogin = searchParams.get("mode") === "login";
    const isSubmitting = navigation.state === "submitting";

    return (
        <>
            <Form method="post" className={classes.form}>
                <h1>{isLogin ? "Log in" : "Create a new user"}</h1>
                {data && (data.status !== 200) && (
                    <p>{data.message}</p>
                )}                
                <p>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" name="email" required />
                </p>
                <p>
                    <label htmlFor="image">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        required
                    />
                </p>
                {!isLogin && (
                    <div>
                        <p>
                            <label htmlFor="name">Name</label>
                            <input id="name" type="text" name="name" required />
                        </p>
                        <p>
                            <label htmlFor="phone">Phone</label>
                            <input id="phone" type="text" name="phone" required />
                        </p>
                    </div>
                )}
                <div className={classes.actions}>
                    <Link to={`?mode=${isLogin ? "signup" : "login"}`} style={{color:'lightblue'}}>
                        {isLogin ? "Don't have an account? Create new user" : "Have an account? Login"}
                    </Link>
                    <button disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                </div>
            </Form>
        </>
    );
}

export default AuthForm;
