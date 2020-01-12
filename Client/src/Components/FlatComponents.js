import React from "react";
import avatar from '../avatar.jpg'
import EasyPieChart from '../Materialize/js/easypiechart'

export const Navbar = ({style}) => {
	return (
		<div style={{...css.navbar, ...style}}>
			<div className='row' style={{marginBottom: '0'}}>
				<div style={css.appname} className='col l3 m12 s12' >Ultranet</div>
				<div className='col l9 m12 s12' style={{height: '60px' }} >
					<div className='row' style={{height: '60px !important'}}>
						<div style={css.searchWrapper} className='col l6 m6 s6'>
							<i className="material-icons left" style={{padding: '5px 0 0 5px', marginRight: 0}}>search</i>
							<input style={css.searchBar} className='browser-default' type='text' placeholder='Search' autoComplete='off' spellCheck='false' />
						</div>
						<div style={{height: '60px'}} className='col l6 m6 s6'>
							<div className='row' style={{height: '60px'}} >
								<div className='col l12 m12 s12' style={{height: '60px'}}>
									{/* <button style={css.actionBtns}><i className='material-icons' style={{color: '#fff'}}>mail</i></button> */}
								{/* </div> */}
								{/* <div className='col l2 m2 s4 blue' style={{height: '60px'}}> */}
									{/* <button style={css.actionBtns}><i className='material-icons' style={{color: '#fff'}}>notifications_none</i></button> */}
								{/* </div> */}
								{/* <div className='col l8 m8 s4' style={{height: '60px'}}> */}

									<div style={css.profileBtn}>
										<div className='hide-on-small-and-down' style={css.userNameWrap}><span style={css.userName}>Nodirbek</span><i className='material-icons right middle' style={{margin: '-2px auto auto 2px'}}>arrow_drop_down</i></div>
										<img src={avatar} alt='' style={css.profileIcon} />

										<button style={css.actionBtns}><i className='material-icons' style={{color: '#fff'}}>notifications_none</i></button>
										<button style={css.actionBtns}><i className='material-icons' style={{color: '#fff'}}>mail</i></button>

									</div>

								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export const Button = ({children, className, style, onClick}) => {
	const isFlat = style && style.boxShadow === 'none';
	const mouseDown = event => {
		event.target.style.transform = 'scale(1)';
		event.target.style.boxShadow = 'none'
	}
	const mouseUp = event => {
		event.target.style.transform = 'scale(1.05)';
		event.target.style.boxShadow = isFlat ? 'none' : css.button.boxShadow
	}
	const mouseIn = event => event.target.style.transform = 'scale(1.05)';
	const mouseOut = event => event.target.style.transform = 'scale(1)';
	return (
		<button
			style={{...css.button, ...style}}
			className={className}
			onClick={onClick}
			onMouseEnter={mouseIn}
			onMouseOut={mouseOut}
			onMouseDown={mouseDown}
			onMouseUp={mouseUp}
			onTouchStart={mouseDown}
			onTouchEnd={mouseUp}>
				{children}
		</button>
	);
};

export const SidebarMenu = ({style, menuItems}) =>{
	const mouseIn = event => {
		event.target.style.transform = 'scale(1.05)';
		event.target.style.background = css.button.background;
		event.target.style.boxShadow = css.button.boxShadow;
	}
	const mouseOut = event => {
		event.target.style.transform = 'scale(1)';
		event.target.style.background = event.target.classList.contains('active') ? 'rgba(0,0,0,0.2)' : 'transparent';
		event.target.style.boxShadow = 'none';
	}
	const mouseDown = event => {
		event.target.style.transform = 'scale(1)';
		event.target.style.boxShadow = 'none'
	}
	const mouseUp = event => {
		event.target.style.transform = 'scale(1.05)';
		event.target.style.boxShadow = css.button.boxShadow
	}
	return (
		<div style={{...css.sidebarMenu, ...style}}>
			<div style={css.menuHeader}>Events<i className='material-icons right' style={{cursor: 'pointer'}}>toc</i></div>
			<ul style={{margin: 0,}}>
				{menuItems && menuItems.map(x => {
					return (
						<li key={x.id} style={{float: 'left', width: '100%'}}><a href='#!' style={css.menuLink} onMouseEnter={mouseIn} onMouseLeave={mouseOut} onMouseDown={mouseDown} onMouseUp={mouseUp} className={x.isActive ? 'active' : ''}><i className="material-icons left tiny" style={{marginTop: '1px'}}>{x.icon}</i>{x.name}</a></li>
					);
				})}
			</ul>
		</div>
	);
}

export const AudienceStats = ({style, menuItems}) =>{
	const drawChart = ()=>{
		setTimeout(()=>{
			var chart = window.chart = new EasyPieChart(document.querySelector('.myChart'), {
				easing: 'easeOutElastic',
				delay: 3000,
				barColor: 'rgb(255, 47, 87)',
				trackColor: 'rgba(255,255,255,0.1)',
				scaleColor: false,
				lineWidth: 10,
				trackWidth: 10,
				lineCap: 'round',
				onStep: function(from, to, percent) {
					this.el.children[0].innerHTML = Math.round(percent);
				}
			});
			chart.update(60);
		}, 2000);
	}
	return (
		<div style={{...css.sidebarMenu, ...style, textAlign: 'center'}}>
			<div style={{color: '#fff', fontWeight: '500', fontSize: '14px', padding: '15px 5px 5px 5px'}}>Audience registration</div>
			<div style={{color: 'rgb(255,255,255,0.4)', fontWeight: '600', fontSize: '10px'}}>234 ENTRIES</div>
			<div style={{margin: '15px 0 10px 0', textAlign: "center"}}>
				<div className='myChart' style={{transform: 'rotate(180deg)', height: '110px', display: 'none'}}>

					<div style={{
						marginBottom: '-110px',
						height: '110px',
						fontSize: '40px',
						fontWeight: '600',
						color: '#fff',
						lineHeight: '2.6',
						transform: 'rotate(180deg)'
					}}></div>

				</div>

				{drawChart()}
			</div>

			<Button style={{
				borderRadius: '15px',
				height: '28px',
				width: '120px',
				fontSize: '10px',
				background: 'rgba(255,255,255,0.1)',
				boxShadow: 'none',
				fontWeight: '400',
			}}>More details<i className='material-icons tiny' style={{
				verticalAlign: 'middle',
				marginTop: '-1px',
				marginLeft: '2px !important',
				color: 'rgb(255, 125, 134)',
			}}>arrow_right</i>
			</Button>

		</div>
	);
}

export const EventCard = ({style, eventItem})=>{
	const makeDate = d => {
		const months = ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];
		let finalResut = months[d.getMonth()];
		finalResut += ` ${d.getDate()}, ${d.getFullYear()}`;
		return finalResut;
	}
	const isToday = d => {
		let t = new Date(Date.now());
		if(t.getDate() === d.getDate() && t.getFullYear() === d.getFullYear() && t.getMonth() === d.getMonth()){
			return true;
		}
		return false;
	}
	return (
		<div style={css.eventCard}>
			<Button style={isToday(eventItem.date) ? {height: '25px', width: '90px', fontSize: '10px'} : {height: '25px', width: '90px', fontSize: '10px', background: 'rgba(255,255,255,0.1)', boxShadow: 'none'}}>{makeDate(eventItem.date)}</Button>
			<br />
			{eventItem.name}
		</div>
	);
}

export const FeedCard = ({style, feedItem})=>{
	const to12hr = x => x<=12 ? x+' AM' : (x-12)+' PM'
	return (
		<div style={{...css.eventCard, ...style, padding: '0', paddingBottom: '15px'}}>
			<div style={{padding: '10px', paddingBottom: '0'}}>
				<img src={feedItem.image} alt='' className='responsive-img' style={{borderRadius: '5px'}} />

				<div className='row'>
					<div className='col l8 m8 s8'>
						<div style={css.feedCardTitle}>{feedItem.title}</div>
						<div style={css.feedCardSubTitle}>
							<span style={{padding: '0 15px 0 10px', fontWeight: '700' }}>{feedItem.isPublic ? 'Public' : 'Private'}</span> Hosted by {feedItem.host}
						</div>
					</div>

					<div className='col l4 m4 s4'>
						<Button style={{
							float: 'right',
							marginRight: '-30px',
							marginTop: '15px',
							height: '30px',
							width: '140px',
						}} className='minifyOnSmall' >Today at {to12hr(feedItem.date.getHours())}</Button>
					</div>
				</div>
			</div>
			<div style={css.separator}></div>
			<div>
				<ul className='likeCommentShares'>
					<li><i className='material-icons tiny left liked'>thumb_up</i> {feedItem.likes}</li>
					<li><i className='material-icons tiny left'>sms</i> {feedItem.comments.length}</li>
					<li><i className='material-icons tiny left'>share</i> {feedItem.shared}</li>
				</ul>
			</div>

			<div style={{height: '35px'}}>
				<div className='col l2 m2 s2'>
					<img src={avatar} style={css.commentAvatar} alt='' />
				</div>
				<div className='col l10 m10 s10' style={{paddingLeft: '0', paddingRight: '25px'}}>
					<input
						style={css.commentInput}
						type='text'
						placeholder='Add comment'
						spellCheck='false'
						autoComplete='off'
						className='browser-default'/>
					<button style={{...css.btnComment, marginLeft: '-55px'}}><i className='material-icons tiny'>photo_camera</i></button>
					<button style={{...css.btnComment}}><i className='material-icons tiny'>sentiment_very_satisfied</i></button>
				</div>
				<br/>
			</div>

		</div>
	);
}

const css = {
	navbar: {
		minHeight: '60px',
		borderRadius: '5px',
		background: 'linear-gradient(45deg, rgb(24, 27, 44), rgb(59, 64, 86))',
		color: '#fff',
		margin: '10px 0',
		boxShadow: '-10px 10px 15px 1px rgba(0, 0, 0, 0.4)',
	},
	button: {
		background: 'linear-gradient(45deg, rgb(255, 47, 87), rgb(255, 125, 134))',
		color: '#fff',
		border: 'none',
		borderRadius: '5px',
		margin: '10px 0',
		height: '50px',
		boxShadow: '0 10px 20px 1px rgba(255, 47, 87, 0.4)',
		fontFamily: "'Segoe UI', Arial, sans-serif",
		letterSpacing: '1px',
		fontWeight: '600',
		cursor: 'pointer',
		transition: '0.2s',

	},
	appname: {
		color: 'rgba(255, 255, 255, 0.9)',
		paddingTop: '19px',
		borderRadius: '5px',
		borderRight: '2px solid rgb(59, 64, 86)',
		textTransform: 'uppercase',
		textAlign: 'center',
		height: '60px',
		fontFamily: "'Segoe UI', Arial, sans-serif",
		letterSpacing: '5px',
		fontWeight: '300',
	},
	searchWrapper: {
		borderRadius: 'inherit',
		height: '60px',
		paddingTop: '14px',
	},
	searchBar: {
		width: '75%',
		minWidth: '50px',
		color: '#fff',
		padding: '5px 0 0 5px',
		marginTop: '3px',
		border: 'none',
		background: 'transparent',
		outline: 'none',
		fontFamily: "'Segoe UI', Arial, sans-serif",
		letterSpacing: '1.5px',
		wordSpacing: '4px',
		fontWeight: '300',
	},
	actionBtns: {
		border: 'none',
		cursor: 'pointer',
		float: 'right',
		borderRadius: '50%',
		padding: '6px 6px 4px 5px',
		margin: '2px 10px 0 0',
		background: 'transparent',

	},
	profileBtn: {
		width: '100%',
		border: 'none',
		float: 'right',
		margin: '10px 0',
	},
	profileIcon: {
		cursor: 'pointer',
		float: 'right',
		borderRadius: '50%',
		width: '30px',
		height: '30px',
		marginTop: '5px',
		background: '#fff',
	},
	userNameWrap:{
		float: 'right',
		height: '40px',
		paddingTop: '10px',
	},
	userName: {
		cursor: 'pointer',
		fontFamily: "'Segoe UI', Arial, sans-serif",
		letterSpacing: '1px',
		fontWeight: '300',
		paddingLeft: '10px',
	},
	sidebarMenu: {
		float: 'left',
		fontFamily: "'Segoe UI', Arial, sans-serif",
		letterSpacing: '1px',
		fontWeight: '300',
		width: '100%',
		background: 'linear-gradient(45deg, rgb(24, 27, 44), rgb(59, 64, 86))',
		borderRadius: '5px',
		boxShadow: '-10px 10px 15px 1px rgba(0, 0, 0, 0.4)',
		paddingBottom: '10px',
		margin: '10px auto',
	},
	menuHeader: {
		height: '60px',
		padding: '17px 15px',
		verticalAlign: 'middle',
		fontWeight: '600',
		fontSize: '15px',
		color: 'rgb(199, 196, 196)',
	},
	menuLink: {
		color: '#fff',
		fontWeight: '500',
		fontSize: '12px',
		padding: '10px 15px',
		width: '100%',
		float: 'left',
		transition: '0.3s',
	},
	eventCard: {
		background: 'linear-gradient(45deg, rgb(24, 27, 44), rgb(59, 64, 86))',
		borderRadius: '5px',
		boxShadow: '-10px 10px 15px 1px rgba(0, 0, 0, 0.4)',
		padding: '8px 20px 15px 20px',
		textTransform: 'Capitalize',
		margin: '10px auto 15px auto',
		color: '#fff',
		fontSize: '12px',
		fontWeight: '600'
	},
	feedCardTitle: {
		padding: '10px 10px 0 10px',
		fontSize: '16px',
		lineHeight: '1.5',
	},
	feedCardSubTitle: {
		padding: '0 0 6px 0',
		fontSize: '10px',
		lineHeight: '2',
	},
	separator: {
		marginTop: '-10px',
		width: '100%',
		borderTop: '1px solid rgb(24, 27, 44)',
		borderBottom: '1px solid rgb(59, 64, 86)'
	},
	commentAvatar: {
		width: '30px',
		height: '30px',
		borderRadius: '50%',
		float: 'right',
	},
	commentInput: {
		width: '100%',
		background: 'rgba(255,255,255,0.1)',
		border: 'none',
		padding: '9px 55px 8px 15px',
		borderRadius: '30px',
		outline: 'none',
		color: '#fff',
		letterSpacing: '1px',
	},
	btnComment: {
		color: '#fff',
		background: 'transparent',
		border: '1px solid transparent',
		padding: '5px 5px 2px 5px',
		borderRadius: '50%',
		float: 'right',
		position: 'absolute',
		margin: '3px 0 0 -30px',
		cursor: 'pointer',
	},


}