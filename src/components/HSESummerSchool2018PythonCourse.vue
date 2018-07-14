<template>
	<div class="HSESummerSchool2018PythonCourse">
		<div class="section schedule">
			<b-loading :is-full-page="false" :active.sync="isLoading" :can-cancel="true"></b-loading>

			<h1 class="title is-2">
				Python for Social Science: Introduction to Programming Language
			</h1>

			<h2 class="title is-3">Schedule <a target="_blank" href="https://calendar.google.com/calendar/r?cid=8e4enqv0aptevi6fkf726qmtjk@group.calendar.google.com" class="button is-info">Subscribe</a></h2>

			<div class="schedule-blocks">
				<ul>
					<li class="day box content" v-for="(events, day) in events">
						<h3 class="title is-5">July {{day}}</h3>
						<div class="event" v-for="event in events">
							<a class="event-title" target="_blank" :href="event.htmlLink">{{event.summary}}</a>
							<div class="event-dates">{{formatEventDate(event.start.dateTime, event.end.dateTime)}}</div>
							<div class="event-description" v-if="event.description && event.description.length" v-html="event.description"></div>
						</div>

					</li>
					<li><small><i>Please add this schedule to your Google Calendar to recieve notifications on programme updates and have this programme on mobile devices. All learning materials will be attached to relevant events on this calendar. Use <a href="https://calendar.google.com/calendar/embed?src=8e4enqv0aptevi6fkf726qmtjk%40group.calendar.google.com&ctz=Europe%2FMoscow">this link</a> to share the programme.</i></small></li>
				</ul>

			</div>
		</div>
		<section class="section">
			<div class="container">
				<div class="content">
					<h2>Course description</h2>
					<p>
						Python is one of the most popular and rapidly developing programming languages. A clear syntax which facilitates learning and a plethora of built-in and third-party libraries made Python especially popular among academics and researchers of all kinds. Python has already been the first-choice language in Machine Learning and Data Science for a while, but as far as Social Sciences are becoming more digitally-oriented it is getting in demand by sociologists, economists, linguists, and other social researchers. This course is created for students who want to learn how to solve real-world data-related problems with Python programming environment but have no experience in programming. The course syllabus covers most of Python functionality from basics syntax to the modern libraries for machine learning and data analysis.
					</p>

					<h2>Course content</h2>
					<h3>Part 1: Python basics</h3>
					<p class="subtitle">16-17 July</p>
					<p>The first part of the workshop reviews the history of Python and discusses its strengths and weaknesses and features that make Python extremely useful for social scientists. It also covers the basic programming concepts such as variables, data types operators, functions and so on. Moreover, it gives an introduction to the applied tools essential for every programmer such as interactive shell, IDEs, and packages.</p>

					<h3>Part 2: Python for data analysis</h3>
					<p class="subtitle">18-19 July</p>
					<p>The second part of the workshops deeps into Python as a tool for data analysis. The primary focus here is on the specialized programming packages allowing to do data analysis in a slick and easy way.</p>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
	import axios from 'axios';

	import moment from 'moment';

	export default {
		data() {
			return {
				events: [],
				isLoading: true
			}
		},
		created() {
			axios.get(`https://clients6.google.com/calendar/v3/calendars/8e4enqv0aptevi6fkf726qmtjk@group.calendar.google.com/events?calendarId=8e4enqv0aptevi6fkf726qmtjk%40group.calendar.google.com&singleEvents=true&timeZone=Europe%2FMoscow&maxAttendees=1&maxResults=250&sanitizeHtml=true&timeMin=2018-06-25T00%3A00%3A00%2B03%3A00&timeMax=2018-08-06T00%3A00%3A00%2B03%3A00&key=AIzaSyBNlYH01_9Hc5S1J9vuFmu2nUqBZJNAXxs`)
			.then(response => {
				console.log(response);
				var result = {};

				for (const event of response.data.items) {
					console.log(event);

					const day = moment(event.start.dateTime).format("D");

					if (day in result) {
						result[day].push(event);
					} else {
						result[day] = []
						result[day].push(event);
					}
				}


				this.events = result;
				this.isLoading = false
			})
			.catch(e => {
				console.error(e);
			})
		},
		methods: {
			formatEventDate (start, end) {
				const startFormated = moment(start).format("H:mm");
				const endFormated = moment(end).format("H:mm");
				if (startFormated === endFormated) {
					return `${startFormated}, ${moment(end).format("MMM Do")}`
				}
				return `${startFormated} — ${endFormated}, ${moment(end).format("MMM Do")}`;
			},
			getDay(s) {
				return moment(s).format("D");
			}
		}
	}
</script>

<style scoped>
	.event-dates {
		font-size: 0.85rem
	}

	.event {
		margin-bottom: 20px;
	}

	.event:last-child {
			margin-bottom: 0;
	}

	.event-description {
		font-size: 0.75rem
	}
	
	.schedule {
		padding-bottom: 50px;
	}


	@media (max-width: 700px) {
		.schedule ul {
			columns: 1;
		}
	}

	@media (min-width: 701px) {
		.schedule ul {
			columns: 2;
		}
	}
	@media (min-width: 1281px) {
		.schedule ul {
			columns: 3;
		}
	}

	.schedule ul li{
		page-break-inside: avoid;
		break-inside: avoid;
	}

	.HSESummerSchool2018PythonCourse {
		background-image: url("../assets/img/patterns/snakes.png");
		background-repeat: repeat;
		background-size: 400px 400px;
	}

	.resp-container {
		position: relative;
		overflow: hidden;
		padding-top: 56.25%;
		height: 500px;
	}
	.resp-iframe {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border: 0;
	}
</style>