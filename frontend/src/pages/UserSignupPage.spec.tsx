/* eslint-disable */
import React from 'react'
import {fireEvent, queryByPlaceholderText, render} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import UserSignupPage, {UserSignupPageActions} from "./UserSignupPage";


const actions = {
    postSignUp: jest.fn().mockResolvedValueOnce({})
}

let displayNameInput, userNameInput, passwordInput, passwordRepeat, button: HTMLElement | null;

function changeEvent(content: string): { target: { value: any } } {
    return {
        target: {
            value: content
        }
    }
}

const expectedUser = {
    username: "my-username",
    displayName: "my-display-name",
    password: "P4ssword",
    repeatPassword: "P4ssword"
}

function setupForSubmit({actions}: { actions: UserSignupPageActions }) {
    const rendered = render(<UserSignupPage actions={actions}/>)
    const {container, queryByPlaceholderText} = rendered
    displayNameInput = queryByPlaceholderText('Your display name') as HTMLInputElement
    userNameInput = queryByPlaceholderText('Your username') as HTMLInputElement
    passwordInput = queryByPlaceholderText('Your password') as HTMLInputElement
    passwordRepeat = queryByPlaceholderText('Repeat your password') as HTMLInputElement

    fireEvent.change(displayNameInput, changeEvent(expectedUser.displayName))
    fireEvent.change(userNameInput, changeEvent(expectedUser.username))
    fireEvent.change(passwordInput, changeEvent(expectedUser.password))
    fireEvent.change(passwordRepeat, changeEvent(expectedUser.repeatPassword))


    button = container.querySelector('button')
    return rendered;
}



describe('UserSignupPage', () => {
    describe('Layout', () => {
        it('has header of Sign Up', () => {
            const {container} = render(<UserSignupPage actions={actions}/>)
            const header = container.querySelector('h1')
            expect(header).toHaveTextContent("Sign Up")
        })
        it('has input for display name', () => {
            const {queryByPlaceholderText} = render(<UserSignupPage actions={actions}/>)
            expect(queryByPlaceholderText("Your display name")).toBeInTheDocument()
        })
        it('has input for username', () => {
            const {queryByPlaceholderText} = render(<UserSignupPage actions={actions}/>)
            expect(queryByPlaceholderText("Your username")).toBeInTheDocument()
        })
        it('has input for password', () => {
            const {queryByPlaceholderText} = render(<UserSignupPage actions={actions}/>)
            expect(queryByPlaceholderText("Your password")).toBeInTheDocument()
        })
        it('has password type for password input', () => {
            const {queryByPlaceholderText} = render(<UserSignupPage actions={actions}/>)
            const input = queryByPlaceholderText("Your password") as HTMLInputElement
            expect(input.type).toBe('password')
        })
        it('has input for password repeat', () => {
            const {queryByPlaceholderText} = render(<UserSignupPage actions={actions}/>)
            expect(queryByPlaceholderText("Repeat your password")).toBeInTheDocument()
        })
        it('has password type for repeat password input', () => {
            const {queryByPlaceholderText} = render(<UserSignupPage actions={actions}/>)
            const input = queryByPlaceholderText("Repeat your password") as HTMLInputElement
            expect(input.type).toBe('password')
        })
        it('has submit button', () => {
            const {container} = render(<UserSignupPage actions={actions}/>)
            expect(container.querySelector('button')).toBeInTheDocument()
        })
    })

    describe('Interactions', () => {
        it('sets the displayName into state', () => {
            const {queryByPlaceholderText} = render(<UserSignupPage actions={actions}/>)
            const input = queryByPlaceholderText("Your display name") as HTMLInputElement
            const expectedDisplayName = 'my-display-name'
            fireEvent.change(input, changeEvent(expectedDisplayName))
            expect(input).toHaveValue(expectedDisplayName)
        })
        it('sets the username into state', () => {
            const {queryByPlaceholderText} = render(<UserSignupPage actions={actions}/>)
            const input = queryByPlaceholderText("Your username") as HTMLInputElement
            const expectedUserName = 'my-user-name'
            fireEvent.change(input, changeEvent(expectedUserName))
            expect(input).toHaveValue(expectedUserName)
        })
        it('sets the password into state', () => {
            const {queryByPlaceholderText} = render(<UserSignupPage actions={actions}/>)
            const input = queryByPlaceholderText("Your password") as HTMLInputElement
            const expectedPassword = 'my-password'
            fireEvent.change(input, changeEvent(expectedPassword))
            expect(input).toHaveValue(expectedPassword)
        })
        it('sets the repeat password into state', () => {
            const {queryByPlaceholderText} = render(<UserSignupPage actions={actions}/>)
            const input = queryByPlaceholderText("Repeat your password") as HTMLInputElement
            const expectedRepeatPassword = 'my-repeat-password'
            fireEvent.change(input, changeEvent(expectedRepeatPassword))
            expect(input).toHaveValue(expectedRepeatPassword)
        })
        it('calls post signUp when the form is valid', () => {
            setupForSubmit({actions});
            fireEvent.click(button as HTMLElement)
            expect(actions.postSignUp).toHaveBeenCalledTimes(1)
        })
        it('calls post with user form fields when fields are valid', () => {
            setupForSubmit({actions});
            fireEvent.click(button as HTMLElement)

            expect(actions.postSignUp).toHaveBeenCalledWith(expectedUser)
        })
    })
})
