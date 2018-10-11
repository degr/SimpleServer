import React from 'react'
import UserActions from './actions/UserActions'

export default class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
    }

    componentDidMount() {
        console.log("component did mount");
        UserActions.loadList(
            {skip: 0, pageSize: 10},
            (list) => {
                this.setState({list})
            }
        );
    }

    render() {
        return <ul>{this.getUserList()}</ul>
    }

    getUserList() {
        return this.state.list.map((user, index) => {
            return <User key={index} user={user}/>
        })
    }
}
