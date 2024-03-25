import { Form } from "react-router-dom";
import classes from "./NewsletterSignup.module.css";
import React from "react";

// const NewsletterSignup = () => {
//     return (
//         <Form method="post" className={classes.newsletter}>
//             <input
//                 type="email"
//                 name="email"
//                 placeholder="Sign up for newsletter..."
//                 aria-label="Sign up for newsletter"
//             />
//             <button>Sign up</button>
//         </Form>
//     );
// }

class NewsletterSignup extends React.Component {
    render() {
        return (
            <Form method="post" className={classes.newsletter}>
                <input
                    type="email"
                    name="email"
                    placeholder="Sign up for newsletter..."
                    required
                />
                <button name="signup">Sign up</button>
            </Form>
        );
    }
}

export default NewsletterSignup;
