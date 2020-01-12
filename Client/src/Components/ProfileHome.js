import React, { Component } from 'react'

export default class ProfileHome extends Component {
    render() {
        return (
            <div>
                Home!!!
            </div>
        )
    }

    componentDidMount(){
        document.querySelector('title').innerHTML = 'Nodirbek | Home'
    }
}
