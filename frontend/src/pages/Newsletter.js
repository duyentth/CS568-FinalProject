import NewsletterSignup from "../components/NewsletterSignup";
import PageContent from "../components/PageContent";
import axios from 'axios';
import { json, redirect } from "react-router-dom";

function NewsletterPage() {
    return (
        <PageContent title="Join our awesome newsletter!">
            <NewsletterSignup />
        </PageContent>
    );
}

export default NewsletterPage;

export const  action = async ({ request }) => {
    const data = await request.formData();
    const email = data.get("email");
    console.log('email: ', email);

    // send to backend newsletter server ...
    const response = axios.post('http://localhost:4000/newsletters/subscribe', {email:email});
    if( (await response).statusText !== 'OK'){
        throw json({message: 'could not signup for newsletter', status: 500});
    } else {
        window.alert('Thank you for signing up newsletter!');
        return redirect('/events');
    }
}
