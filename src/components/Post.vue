<template>
	<div>
		<b-loading :is-full-page="false" :active.sync="isLoading" :can-cancel="true"></b-loading>

		<div v-if="!isLoading" id="selected-post" name="selected-post" class="container">
			<h1 v-if="tumblrPosts.response.posts[0].title" class="title is-spaced">
				{{ tumblrPosts.response.posts[0].title }}
			</h1>
			
			<div class="content" v-if="getLengthHtmlFree(tumblrPosts.response.posts[0].body)">
				<div v-html="tumblrPosts.response.posts[0].body"></div>
			</div>
			
			<div v-if="calendars && calendars.length" v-for="calendar in calendars">
				<Calendar
				:calendarId="calendar"
				timeMin="2018-06-25"
				timeMax="2018-09-25">
				</Calendar>

			</div>

			<div v-if="tumblrPosts.response.posts[0].tags && tumblrPosts.response.posts[0].tags.length" class="tags">
				<span class="tag" v-for="tag in tumblrPosts.response.posts[0].tags">
					<router-link :to="{name: 'Main', query: {tag: tag}}">
						{{tag}}
					</router-link>
				</span>
			</div>
		</div>

		<div v-else>
			Loading
		</div>
	</div>
</template>

<script>
	import moment from 'moment';
	import {QUERY_TUMBLR_POSTS} from "../gql/queries.js";
	import {TUMBLR_KEY} from "../constants.js";
	import Vue from 'vue';
	var h2p = require('html2plaintext');
	// import PostBody from "./PostBody.vue";
	import Calendar from "./Calendar.vue";

	export default {
		name: 'Post',
		components: {
			Calendar //, PostBody
		},
		data () {
			return {
				isLoading: false,
				tumblrPosts: [],
			}
		},
		apollo: {
			tumblrPosts: {
				query: QUERY_TUMBLR_POSTS,
				variables() {
					return {
						path: `/posts`,
						api_key: TUMBLR_KEY,
						id: this.$route.params.post_id,
						tag: "",
						offset: 0
					}
				},
				watchLoading(isLoading, countModifier) {
					this.isLoading = isLoading;
				},
			},
		},
		methods: {
			formatPostDate (s) {
				return moment(s).format("MMM Do YYYY")
			},
			formatConfDate (start, end) {
				const startFormated = moment(start).format("MMM Do");
				const endFormated = moment(end).format("MMM Do");
				if (startFormated === endFormated) {
					return `${startFormated}, ${moment(end).format("YYYY")}`
				}
				return `${startFormated} — ${endFormated}, ${moment(end).format("YYYY")}`;
			},
			pubTitle(fileName) {
				return fileName.slice(0, -4)
			},
			getLengthHtmlFree (s) {
				console.log("getLengthHtmlFree", s)
				return h2p(s.replace(/{calendar_id:.*?com}/g, "" )).length;
			}
		},
		computed: {
			post() {
				return this.tumblrPosts.response.posts[0]
			},
			calendars () {
				const text = this.tumblrPosts.response.posts[0].body;

				var match = text.match(/{calendar_id:.*?com}/g)
				if (match) {
					const calendars = match.map(cal => cal.replace( /{calendar_id: /g, "" ).replace( /}/g, "" ));
					return calendars
				} else return false;
			},
			// bodyText () {
			// 	const text = this.tumblrPosts.response.posts[0].body;

			// 	return h2p(text.replace(/{calendar_id:.*?com}/g, "" ));

			// },
			// bodyTemplate () {
			// 	let text = this.tumblrPosts.response.posts[0].body;
			// 	// var splitted = text.split(/{calendar_id:.*?com}/g)

			// 	// result = []

			// 	// for (var i = 0; i < splitted.length; i++) {
			// 	// 	if (text.split(/{calendar_id:.*?com}/g)[0] === "") { // календарь с начала
			// 	// 		result.push({kind: "calendar", value: this.calendars[i]})
			// 	// 	}
			// 	// }

			// 	for (var calendar of this.calendars) {
			// 		text = text.replace(`{calendar_id: ${calendar}}`, `<Calendar calendarId="${calendar}" timeMin="2018-08-12" timeMax="2018-08-30"> </Calendar>`)
			// 	}

			// 	return text

			// },
			// paragraphs () {
			// 	let text = this.tumblrPosts.response.posts[0].body.split("</p><p>");
			// 	console.log("text", text);

			// 	return text.map(function(p) {

			// 		if (p.search(/{calendar_id:.*?com}/g) === -1) {
			// 			return {kind: "text", value: p.replace("<p>", "").replace("</p>", "")}
			// 		}
			// 		return {kind: "calendar", value: p.replace( /.*{calendar_id: /g, "" ).replace( /}.*/g, "" )}
			// 	}) 
			// }

		},

	}
</script>

<style lang="sass" scoped>


.article-header, .article-content
	padding: 20px

.post-preview
	margin-bottom: 50px

	.post-title
		margin-bottom: 0px

	.tag
		padding: 0
		margin: 0
		background-color: transparent
	time
		font-size: 0.75rem
</style>
