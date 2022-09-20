import axios from 'axios'
import * as api from './api'
import '@testing-library/jest-dom/extend-expect'

describe('api', () => {
    describe('signup', () => {
        it('calls /api/1.0/users', () => {
            const mockSignup = jest.fn();
            axios.post = mockSignup
            const user = {}
            api.signup(user)

            expect(mockSignup).toHaveBeenCalledWith('/api/1.0/users', user)
        })
    })


})

