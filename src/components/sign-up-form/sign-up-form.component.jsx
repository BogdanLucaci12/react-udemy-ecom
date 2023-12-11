import { useState, } from "react";
import { createUserWithEmailAndPassword, createUserDocumentfromAuth } from "../../utility/firebase/firebsa.utils";
import FormInput from '../../components/form-input/form-input.component';
import'./sign-up-form.styles.scss'
import Button from "../button/button.component";
const defaultFormField = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}
const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormField);
    const { displayName, email, password, confirmPassword } = formFields;
    const resetFormFiels = () => {
        setFormFields(defaultFormField)
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("password doesnt match");
            return;
        }
        try {
            const { user } = await createUserWithEmailAndPassword(email, password);
            // setCurrentUser(user);//de fiecare data cand un util se inregistreaza vrem sa setam deja userul nu sa revina la pagina si sa se logheze
            await createUserDocumentfromAuth(user, { displayName });
            resetFormFiels();
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email allready in use')
            }
            else { console.log('user created encountered an error', error) }

        }
    }
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value })
    }
    return (
        <div className="sign-up-container">
            <h2>Dont have an account?</h2>
            <span>Sign Up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Display Name"
                    type="text" required onChange={handleChange} name="displayName" value={displayName} />
                <FormInput
                    label="Email"
                    type="email" required onChange={handleChange} name="email" value={email} />
                <FormInput
                    label="Password"
                    type="password" required onChange={handleChange} name="password" value={password} />

               
                <FormInput
                    label="Confirm Password" 
                type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword} />
                <Button buttontype='inverted' type="submit">Sign Up</Button>
            </form>
        </div>
    )
}
export default SignUpForm