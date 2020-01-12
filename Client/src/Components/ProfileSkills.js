import React, { Component } from 'react'

export default class ProfileSkills extends Component {
    render() {
        return (
            <div>
                Skills!!!
            </div>
        )
    }

    componentDidMount(){
        document.querySelector('title').innerHTML = 'Nodirbek | Skills'
    }
}
