/* eslint-disable */
import React from 'react'
import {fireEvent, render, waitFor, waitForElementToBeRemoved, act} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import UserSignupPage, {UserSignupFormFields, UserSignupPageActions} from "./UserSignupPage";

function mockAsyncDelayed() {
    return (formValues: UserSignupFormFields): Promise<{}> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({})
            }, 300)
        })
    };
}

const actions = {
    postSignUp: mockAsyncDelayed()
}

let displayNameInput, userNameInput, passwordInput, passwordRepeat, button: HTMLElement;

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


    button = container.querySelector('button') as HTMLElement
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
            const actions = {
                postSignUp: jest.fn().mockResolvedValueOnce({})
            }

            setupForSubmit({actions});
            fireEvent.click(button)
            expect(actions.postSignUp).toHaveBeenCalledTimes(1)
        })
        it('calls post with user form fields when fields are valid', () => {
            const actions = {
                postSignUp: jest.fn().mockResolvedValueOnce({})
            }
            setupForSubmit({actions});
            fireEvent.click(button)
            expect(actions.postSignUp).toHaveBeenCalledWith(expectedUser)
        })
        it('does not allow user to click the Sign Up button when there is an api call', () => {
            const actions = {
                postSignUp: jest.fn().mockResolvedValueOnce({})
            }
            setupForSubmit({actions})
            fireEvent.click(button)
            fireEvent.click(button)
            expect(actions.postSignUp).toHaveBeenCalledTimes(1)
        })
        it('displays a spinner when there is an ongoing api call', () => {
            const actions = {
                postSignUp: mockAsyncDelayed()
            }
            const {queryByText} = setupForSubmit({actions})
            fireEvent.click(button)
            const spinner = queryByText('Loading...')
            expect(spinner).toBeInTheDocument()
        })
        it('hides spinner after api call finishes successfully', async () => {
            const actions = {
                postSignUp: mockAsyncDelayed()
            }
            const {queryByText} = setupForSubmit({actions})
            fireEvent.click(button)
            await waitForElementToBeRemoved(() => queryByText('Loading...'))
        })
        it('hides spinner after api call finishes with error', async () => {
            const actions = {
                postSignUp: (formValues: UserSignupFormFields): Promise<{}> => {
                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            reject({
                                response:{data:{}}
                            })
                        }, 300)
                    })
                }

            }
            const {queryByText} = setupForSubmit({actions})
            fireEvent.click(button)
            await waitForElementToBeRemoved(() => queryByText('Loading...'))
        })
    })
})
