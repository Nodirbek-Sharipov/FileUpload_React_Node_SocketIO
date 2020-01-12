import React, { Component } from 'react'

export default class ProfileContact extends Component {
    render() {
        return (
            <div>
                Contacts!!!
            </div>
        )
    }

    componentDidMount(){
        document.querySelector('title').innerHTML = 'Nodirbek | Contact'
    }
}
