import React from 'react'
import ControlPanel from './ControlPanel'
import UserList from './UserList'


export default class Application extends React.Component {
    render() {
        return <div>
            <h1>Create User form</h1>
            <ControlPanel/>
            <h1>Users list</h1>
            <UserList/>
        </div>
    }
}