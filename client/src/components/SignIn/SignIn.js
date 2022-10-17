import React from "react";

const SignIn = () => {

    const [values, setValues] = useState({
        signInEmail: "",
        signInPassword: ""
    })

    const onEmailChange = (event) => {
        setValues({...values, signInEmail : event.target.value});
    }

    const onPasswordChange = (event) => {
        setValues({...values, signInPassword : event.target.value});
    }

    const onSubmitSignIn = () => {
        
    }

    return(
        <div>
            
        </div>
    );
}

export default SignIn;