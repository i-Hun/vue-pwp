<template name="calendar">
	<div class="calendar">
		<div class="section schedule">
			<b-loading :is-full-page="false" :active.sync="isLoading" :can-cancel="true"></b-loading>
	
			<h2 class="title is-4">
				{{calendarTitle}}
				<a target="_blank" :href="sharngLink" class="button is-info">Subscribe</a>
			</h2>


			<div class="subtitle" v-html="calendarDescription"></div>

			<div class="schedule-blocks">
				<ul>
					<li class="day" v-for="(events, day) in events">
						<h3 class="title is-5">July {{day}}</h3>
						<div class="event" v-for="event in events">
							<a class="event-title" target="_blank" :href="event.htmlLink">{{event.summary}}</a>
							<div class="event-dates">
								<span class="icon is-small">
									<i class="mdi mdi-alarm"></i>
								</span>
								<span>{{formatEventDate(event.start.dateTime, event.end.dateTime)}}</span>
							</div>
							<div class="event-location" v-if="event.location">
								<span class="icon is-small">
									<i class="mdi mdi-map-marker"></i>
								</span>
								<span>
									{{event.location}}
								</span>
							</div>
							<div v-if="event.attachments && event.attachments.length" class="event-attachments">
								<div class="attachments buttons">
									<a class="button is-small" :href="attachment.fileUrl" target="_blank" v-for="attachment in event.attachments">
										<span class="icon is-small">
											<img :src="attachment.iconLink" alt="">
										</span>
										<span>{{attachment.title}}</span>
									</a>
								</div>
							</div>
							<div class="event-description content" v-if="event.description && event.description.length" v-html="event.description"></div>
						</div>

					</li>
					<li><small><i>Please add this schedule to your Google Calendar to recieve notifications on programme updates and have this programme on mobile devices. All learning materials will be attached to relevant events on this calendar. Use <a :href="sharngLink">this link</a> to share the programme.</i></small></li>
				</ul>

			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	import moment from 'moment';

	export default {
		name: "calendar",
		props: ["calendarId", "timeMin", "timeMax"],
		data() {
			return {
				calendarTitle: "",
				calendarDescription: "",
				events: [],
				isLoading: true
			}
		},
		created() {
			console.log("calendarId", this.calendarId);

			axios.get(`https://clients6.google.com/calendar/v3/calendars/${this.calendarId}/events?timeZone=Europe%2FMoscow&maxAttendees=1&maxResults=250&sanitizeHtml=true&timeMin=${this.timeMin}T00%3A00%3A00%2B03%3A00&timeMax=${this.timeMax}T00%3A00%3A00%2B03%3A00&key=AIzaSyBNlYH01_9Hc5S1J9vuFmu2nUqBZJNAXxs&supportsAttachments=true`)
			.then(response => {
				console.log(response);
				var result = {};

				this.calendarTitle = response.data.summary;
				this.calendarDescription = response.data.description;

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

				function compareDates(a, b) {
					return moment(a.start.dateTime).format("HH") - moment(b.start.dateTime).format("HH");
				}

				for (const [day, event] of Object.entries(result)) {
					const evt = event.sort(compareDates)
					console.log(evt)
					result[day] = evt
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
				const diff = moment(end).diff(moment(start))
				return `${startFormated} — ${endFormated}, ${moment(end).format("MMM Do")} (${moment.utc(diff).format("H:mm")})`;
			},
			getDay(s) {
				return moment(s).format("D");
			},
		},
		computed: {
			sharngLink () {
				return `https://calendar.google.com/calendar/r?cid=${this.calendarId}`
			}
		}
	}
</script>

<style scoped>

	.day {
		background-color: #fff;
		box-shadow: 0 0 10px 3px #00000014;
		margin-bottom: 20px;
		/*border-radius: 2px;*/
		padding: 20px;
		margin-bottom: 20px;
	}

	.event {
		padding-bottom: 10px;
		margin-bottom: 10px;
		/*border-bottom: 1px solid #eee;*/
	}

	.event-dates, .event-location {
		font-size: 0.85rem
	}

	.event:last-child {
			margin-bottom: 0;
	}

	.event-description, .event-attachments {
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

</style>