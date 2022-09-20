import React, {useState} from "react";

export interface UserSignupPageActions {
    postSignUp: (formValues: UserSignupFormFields) => Promise<{}>
}

interface UserSignupFormFields {
    displayName: string,
    username: string,
    password: string,
    repeatPassword: string
}

export default function UserSignupPage({actions}: { actions: UserSignupPageActions }) {
    const initialFormValues = {
        displayName: '',
        username: '',
        password: '',
        repeatPassword: ''
    }

    const [formValues, setFormValues] = useState(initialFormValues)

    const handleFormValuesChange = (e: React.FormEvent<HTMLInputElement>) => {
        setFormValues({
            ...formValues,
            [e.currentTarget.name]: e.currentTarget.value
        })
    }

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        actions.postSignUp(formValues)
    }

    return (
        <div className=''>
            <h1 className='text-center text-4xl'>Sign Up</h1>
            <form onSubmit={handleSubmit} className="w-min m-auto">
                <div className="flex flex-col mt-3">
                    <label className="uppercase text-xs" htmlFor="displayName">Display Name</label>
                    <input
                        type="text"
                        className="input"
                        placeholder='Your display name'
                        name='displayName'
                        onChange={handleFormValuesChange}
                        value={formValues.displayName}
                    />
                </div>
                <div className="flex flex-col mt-3">
                    <label className="uppercase text-xs" htmlFor="username">Username</label>
                    <input
                        type="text"
                        className="input"
                        placeholder='Your username'
                        name='username'
                        onChange={handleFormValuesChange}
                        value={formValues.username}
                    />
                </div>
                <div className="flex flex-col mt-3">
                    <label className="uppercase text-xs" htmlFor="password">Password</label>
                    <input
                        className="input"
                        placeholder='Your password'
                        type='password'
                        name='password'
                        onChange={handleFormValuesChange}
                        value={formValues.password}
                    />
                </div>
                <div className="flex flex-col mt-3">
                    <label className="uppercase text-xs" htmlFor="repeatPassword">Repeat Password</label>
                    <input
                        className="input"
                        placeholder='Repeat your password'
                        type='password'
                        name='repeatPassword'
                        onChange={handleFormValuesChange}
                        value={formValues.repeatPassword}
                    />
                </div>
                <button type='submit' className="block button mt-3 uppercase rounded ml-auto mr-0">Sign Up</button>
            </form>
        </div>
    );
}