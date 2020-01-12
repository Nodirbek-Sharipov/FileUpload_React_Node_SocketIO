import React, { useState } from 'react'
import {
	Navbar,
	Button,
	SidebarMenu,
	AudienceStats,
	EventCard,
	FeedCard
} from './FlatComponents'
import "../Materialize/css/materialize.min.css"
import "../Materialize/css/materialize-icons.css"
import meetup from '../meetup.jpg'


const FlatDesign = () =>  {

	const [{ menuContents, upcomingEventsList, feedList }, setState] = useState({
		menuContents : [
			{ id: 1, icon: '🎉', name: 'Event', isActive: true},
			{ id: 2, icon: '📅', name: 'Calendar', isActive: false},
			{ id: 3, icon: '🎂', name: 'Birthday', isActive: false},
			{ id: 4, icon: '🎈', name: 'Discover', isActive: false},
			{ id: 5, icon: '🎆', name: 'Hosting', isActive: false},
		],
		upcomingEventsList : [
			{id: 1, name: 'VWS 2019 - Web/Mobile tech meetup', date: new Date(2019, 9, 24)},
			{id: 2, name: 'UX designer meetup 2019', date: new Date(2019, 9, 25)},
			{id: 3, name: 'Vietnam web summit 2019', date: new Date(2019, 9, 26)},
			{id: 4, name: 'Motown soul classics', date: new Date(2019, 9, 27)},
		],
		feedList : [
			{
				id: 1,
				image: meetup,
				title: 'UX Desiger Meetup 2019',
				isPublic: true,
				host: 'Vietnam UI/UX Designer',
				date: new Date(2019, 9, 25, 20, 0, 0, 0),
				likes: 87,
				comments: [],
				shared: 13
			}
		],
	});

		return (
			<div>
				<div className='container'>
					<br />
					<div className='row'>
						<Button className='col l3 m12 s12' style={{margin: 0}}>Create Event</Button>
					</div>

					<Navbar />

					<div className='row'>
						<div className='col l3 m12 s12' style={{padding: 0}}>
							<SidebarMenu menuItems={menuContents} />
							<AudienceStats />
						</div>

						<div className='col l9 m12 s12' style={{padding: 0}}>
							<div className='col l4 m4 s12 noPadLMedDown noPadLRSm' style={{paddingRight: 0}}>
								{ upcomingEventsList && upcomingEventsList.map(x=>{
									return <EventCard key={x.id} eventItem={x} />
								})}
							</div>
							<div className='col l8 m8 s12 noPadRMedDown noPadLRSm' style={{paddingRight: 0}}>
								{ feedList && feedList.map(x=>{
									return <FeedCard key={x.id} feedItem={x} />
								}) }
							</div>
						</div>

					</div>

				</div>
			</div>
		)

}

export default FlatDesign;