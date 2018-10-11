import React from 'react';
import ControlPanel from './ControlPanel'

export default class Application extends React.Component {
    render() {
        return <div>
            <h1>Create User form</h1>
            <ControlPanel/>
        </div>
    }
}