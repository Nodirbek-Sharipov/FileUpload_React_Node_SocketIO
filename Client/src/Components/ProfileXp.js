import React, { Component } from 'react'

export default class ProfileXp extends Component {
    render() {
        return (
            <div>
                Experience!!!
            </div>
        )
    }

    componentDidMount(){
        document.querySelector('title').innerHTML = 'Nodirbek | Experience'
    }
}
