import React, { Component } from 'react'

export default class ProfileEdu extends Component {
    render() {
        return (
            <div>
                Education!!!
            </div>
        )
    }

    componentDidMount(){
        document.querySelector('title').innerHTML = 'Nodirbek | Education'
    }
}
