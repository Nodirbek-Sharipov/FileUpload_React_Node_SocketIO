import React, { Component } from 'react'
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom'
import ProfileHome from './ProfileHome'
import ProfileSkills from './ProfileSkills'
import ProfileXp from './ProfileXp'
import ProfileEdu from './ProfileEdu'
import ProfileContact from './ProfileContact'

export default class Profile extends Component {
  moveBg = event =>{
    const me = event.target;
    const BG = document.querySelector('.bgColor');
    BG.style.width = me.innerHTML.length*6 + 35 +'px';
    BG.style.marginLeft = me.offsetLeft - document.querySelector('.mainUl').offsetLeft  +'px';
    console.log(me.offsetLeft - me.offsetRight)
  }
  render() {
    return (
      <Router>
        <div className='container' style={css.txt}>
          <ul style={css.ul} className='mainUl'>
            <li style={css.li}><Link style={css.a} onMouseMove={this.moveBg} to='/'>Home</Link></li>
            <li style={css.li}><Link style={css.a} onMouseMove={this.moveBg} to='/skills'>Skills</Link></li>
            <li style={css.li}><Link style={css.a} onMouseMove={this.moveBg} to='/xp'>Experience</Link></li>
            <li style={css.li}><Link style={css.a} onMouseMove={this.moveBg} to='/edu'>Education</Link></li>
            <li style={css.li}><Link style={css.a} onMouseMove={this.moveBg} to='/contact'>Contact</Link></li>
            <div className='bgColor' style={css.bgMover}></div>
          </ul>


        <Route exact path='/' component={ProfileHome}/>

        <Route exact path='/skills' component={ProfileSkills} />

        <Route exact path='/xp' component={ProfileXp} />

        <Route exact path='/edu' component={ProfileEdu} />

        <Route exact path='/contact' component={ProfileContact} />


        </div>
      </Router>

    )
  }
}

const css = {
  txt: {
    fontFamily: "'Segoe UI', Arial, sans-serif",
    color: 'rgba(255,255,255, .8)',
  },
  ul: {
    listStyle: 'none'
  },
  li: {
    display: 'inline-block',
  },
  a: {
    color: '#fff',
    textDecoration: 'none',
    border: '1px solid #fff',
    padding: '8px 10px',
  },
  bgMover: {
    background: 'linear-gradient(45deg, rgb(255, 47, 87), rgb(255, 125, 134))',
    position: 'fixed',
		border: 'none',
		borderRadius: '5px',
		margin: '10px 0',
    height: '30px',
    width: '60px',
    marginTop: '-25px',
    zIndex: '-1',
		boxShadow: '0 10px 20px 1px rgba(255, 47, 87, 0.4)',
		transition: '0.5s',
  }
}