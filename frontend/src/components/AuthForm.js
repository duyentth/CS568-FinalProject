import {
    Form,
    Link,
    useSearchParams,
    useActionData,
    useNavigation,
} from "react-router-dom";

import classes from "./AuthForm.module.css";
import useInput from "../util/useInput";

const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@");
const isValidPhone = (value) => {
    const pattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    return pattern.test(value);
};
const isValidPassword = (value) => {
    //Minimum six characters, at least one uppercase letter,
    //one lowercase letter and one number
    const pattern = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$");
    return pattern.test(value);
};

function AuthForm() {
    const data = useActionData();
    const navigation = useNavigation();

    const [searchParams] = useSearchParams();
    const isLogin = searchParams.get("mode") === "login";
    const isSubmitting = navigation.state === "submitting";

    //email input
    const {
        value: emailValue,
        hasError: emailHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
    } = useInput(isEmail);

    //phone input
    const {
        value: phoneValue,
        hasError: phoneHasError,
        valueChangeHandler: phoneChangeHandler,
        inputBlurHandler: phoneBlurHandler,
    } = useInput(isValidPhone);

    //name input
    const {
        value: nameValue,
        hasError: nameHasError,
        valueChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
    } = useInput(isNotEmpty);

    //password input
    const {
        value: passwordValue,
        hasError: passwordHasError,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
    } = useInput(isValidPassword);

    return (
        <>
            <Form method="post" className={classes.form}>
                <h1>{isLogin ? "Log in" : "Create a new user"}</h1>
                {data && data.status !== 200 && <p>{data.message}</p>}
                <p>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        required
                        value={emailValue}
                        onChange={emailChangeHandler}
                        onBlur={emailBlurHandler}
                    />
                </p>
                {emailHasError && (
                    <p className={classes.errorText}>
                        Please enter a valid email
                    </p>
                )}
                <p>
                    <label htmlFor="image">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        required
                        value={passwordValue}
                        onChange={passwordChangeHandler}
                        onBlur={passwordBlurHandler}
                    />
                </p>
                {passwordHasError && (
                    <p className={classes.errorText}>
                        Please enter a password with minimum six characters, at
                        least one uppercase letter, one lowercase letter and one
                        number
                    </p>
                )}
                {!isLogin && (
                    <div>
                        <p>
                            <label htmlFor="name">Name</label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                required
                                value={nameValue}
                                onChange={nameChangeHandler}
                                onBlur={nameBlurHandler}
                            />
                        </p>
                        {nameHasError && (
                            <p className={classes.errorText}>
                                Please enter a name
                            </p>
                        )}
                        <p>
                            <label htmlFor="phone">Phone</label>
                            <input
                                id="phone"
                                type="text"
                                name="phone"
                                placeholder="123-456-7890"
                                required
                                value={phoneValue}
                                onChange={phoneChangeHandler}
                                onBlur={phoneBlurHandler}
                            />
                        </p>
                        {phoneHasError && (
                            <p className={classes.errorText}>
                                Please enter a phone with format as 123-456-7890
                            </p>
                        )}
                    </div>
                )}
                <div className={classes.actions}>
                    <Link
                        to={`?mode=${isLogin ? "signup" : "login"}`}
                        style={{ color: "lightblue" }}
                    >
                        {isLogin
                            ? "Don't have an account? Create new user"
                            : "Have an account? Login"}
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
