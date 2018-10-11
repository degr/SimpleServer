import React from 'react'
import UserActions from './actions/UserActions'

export default class ControlPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "email@email.com",
            password: "asdfasdf"
        }
    }

    render() {
        return <div>
            Email: <input type="email"
                          value={this.state.email}
                          onChange={(e) => this.updateForm('email', e)}/>
            <br/>
            Password: <input type="password"
                             value={this.state.password}
                             onChange={(e) => this.updateForm('password', e)}/>
            <br/>
            <button onClick={() => this.saveUser()}>Create User</button>
        </div>
    }

    updateForm(field, event) {
        const state = {};
        state[field] = event.target.value;
        this.setState(state);
    }

    saveUser() {
        UserActions.createUser({
            id: 0,
            email: this.state.email,
            password: this.state.password
        })
    }
}