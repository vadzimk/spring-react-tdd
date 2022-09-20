import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserSignupPage from "./pages/UserSignupPage";

function App() {
    const postSignUp = (): Promise<{}> => {
        return new Promise((resolve, reject) => {
                resolve({})
            }
        )
    }

    return (
        <div className="text-gray-900">
            <UserSignupPage actions={{postSignUp}}/>
        </div>
    );
}

export default App;
