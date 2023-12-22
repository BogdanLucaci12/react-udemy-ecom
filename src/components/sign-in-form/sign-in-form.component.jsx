import { useState } from "react";
import { signInWithGooglePopup, signInAuthWithEmailAndPassword } from "../../utility/firebase/firebsa.utils";
import FormInput from '../form-input/form-input.component';
import './sign-in-form.styles.scss'
import Button from "../button/button.component";
const defaultFormField = {
    email: '',
    password: '',
}
const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormField);
    const { email, password } = formFields;
    const resetFormFiels = () => {
        setFormFields(defaultFormField)
    }
    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
        
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const {user} = await signInAuthWithEmailAndPassword(email, password);
            resetFormFiels();
           
        } catch (error) {
            if (error.code ==="auth/invalid-credential"){
                alert("incorect password for email")
            }
            console.log(error)
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value })
    }
    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Email"
                    type="email" required onChange={handleChange} name="email" value={email} />
                <FormInput
                    label="Password"
                    type="password" required onChange={handleChange} name="password" value={password} />
                <div className="buttons-container">
                    <Button buttontype='' type="submit">Sign In</Button>
                    <Button onClick={signInWithGoogle} buttontype='google' type="button">Google Sign In</Button>
                </div>
            </form>
        </div>
    )
}
export default SignInForm