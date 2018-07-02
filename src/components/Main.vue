<template>
	<div id="main">
	<header class="main-header hero is-medium">
		<div class="hero-body is-hidden-touch">
			<div class="container">
				<div class="columns">
					<div class="column is-two-fifths-desktop">
						<div class="my-bio card">
							<div class="card-content">
								<h2 class="subtitle">
									Hi! I am Oleg — Social researcher, Data analyst and Web-developer from Saint Petersburg, Russia. I'm working as Research assistant and Lecturer at <a href="https://www.hse.ru/en/staff/oleg" target="_blank">HSE</a>. <a href="https://www.hse.ru/data/2018/02/09/115342482215372/cv.pdf" target="_blank">Download CV</a>.
								</h2>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="footer is-hidden-desktop">
			<div class="container">
				<div class="content has-text-centered">
					<p>
						Hi! I am Oleg — Social researcher, Data analyst and Web-developer from Saint Petersburg, Russia. I'm working as Research assistant and Lecturer at <a href="https://www.hse.ru/en/staff/oleg" target="_blank">HSE</a>. <a href="/pdfs/cv.pdf" target="_blank">Download CV</a>.
					</p>
				</div>
			</div>
		</div>
	</header>
	<div class="section">
		<b-tabs expanded>
			<b-tab-item label="🎤 Conferences" class="content">
				<ul style="list-style: none;">
					<li v-for="conference in conferences">
						<b-tooltip position="is-right" :label="`${conference.place.city}, ${conference.place.country}`">
							<span class="icon">
								<small>
									<flag :iso="conference.place.iso" :squared="false" />
								</small>
							</span>
						</b-tooltip>
						{{conference.title}},
						<small>{{formatConfDate(conference.date.start, conference.date.end)}}</small>,
					</li>
				</ul>
			</b-tab-item>

			<b-tab-item label="📑 Research papers" class="content">
				<ul>
					<li v-for="publication in publications">
						{{publication.title}}.
					</li>
				</ul>
			</b-tab-item>

			<b-tab-item label="🎓 Education" class="content">
				<ul>
					<li>2017–2020 Full-time Advanced Doctoral Programme in Social Sciences.</li>
					<li>2015–2017 Master in Sociology Higher School of Economics.</li>
					<li>2010–2015 Diploma in Sociology Omsk State University.</li>
				</ul>
			</b-tab-item>

			<b-tab-item label="📚 Additiional education" class="content">
				<ul>
					<div class="year-div">2017</div>
					<li>Educational project "The Summer School", workshop "Data Analysis in Social Sciences", July 25–August 7, 2017, Dubna, Russia.</li>
					<li>Web Science Summer School WWSSS'17, 1–8 July, 2017, Saint Petersburg, Russia. . «Best Teamwork» award.</li>
					<div class="year-div">2016</div>
					<li>Summer Laboratory “Digital Traces I: Meta-Morphologies of St. Petersburg”, 17–30 August 2016, Saint Petersburg, Russia.</li>
					<li>Winter School “Archaeology of Text 5: The Evolution of Information Systems and Codes”, 31 January–6 February 2016, Sochi, Russia.</li>
					<div class="year-div">2015</div>
					<li>A. Casilli's workshop “Digital Methods: How to Study Online Social Interactions”, 9–10 December 2015, St. Petersburg, Russia.</li>
				</ul>
			</b-tab-item>
			<b-tab-item label="🏆 Awards" class="content">
				<ul>
					<li>Oxford Russian Fund scholarship for MA students (2015–2016, 2016–2017).</li>
					<li>Oxford Russian Fund scholarship for PhD students (2017–2018).</li>
					<li>Best final thesis competition by Russian Public Opinion Research Center (1st prize in nomination "Best MA thesis”).</li>
					<li>Winner of the International Olympiad Competitions for University Students and Graduates by HSE, programme “Complex Social Analysis”, 2015.</li>
					<li>Increased State Academic Scholarship, OmSU, 2013–2014.</li>
					<li>Winner of the All-Russian Olympiad of schoolchildren on Social theory at regional stage, 2010.</li>
				</ul>
			</b-tab-item>
		</b-tabs>
	</div>
	<div class="posts section content">
		<b-loading :is-full-page="false" :active.sync="isLoading" :can-cancel="true"></b-loading>

		<div v-if="$apollo.queries.tumblrPosts.loading">Loading...</div>
		<div v-else>
			<div v-if="!post_id">
				<p>
					<a href="http://ihun.tumblr.com/rss" target="_blank">
						<span class="icon">
							<i class="mdi mdi-rss-box mdi-24px"></i>
						</span>
						Subscribe to new posts
					</a>
				</p>
				<masonry
				:cols="{default: 3, 1280: 2, 400: 1}"
				:gutter="{default: '30px', 700: '15px'}"
				>
					<div v-for="post in tumblrPosts.response.posts" class="post-preview">
						<div v-if="post.type=='text'">
							<div class="post-title" v-if="post.title">
								<small>{{formatPostDate(post.date)}}</small>
								<router-link :to="{query: {post_id: post.id}}">
								{{ post.title }}
								</router-link>
							</div>
							
							<div v-if="post.tags && post.tags.length" class="tags" >
								<span class="tag" v-for="tag in post.tags">
									<router-link :to="{query: {tag: tag}}">
										{{tag}}
									</router-link>
								</span>
							</div>
						</div>
						<div v-else>
							<a v-bind:href="post.post_url">Пост</a> имеет тип {{post.type}}
						</div>
					</div>
				</masonry>
			</div>
			<div v-else>
				<p class="title is-5">
					<router-link :to="{query: {}}">
					All posts
					</router-link>
				</p>
				<div id="selected-post" name="selected-post">
					<h1 v-if="tumblrPosts.response.posts[0].title" class="title is-spaced">
						{{ tumblrPosts.response.posts[0].title }}
					</h1>
					
					<div v-html="tumblrPosts.response.posts[0].body"></div>
					<br>
					<div v-if="tumblrPosts.response.posts[0].tags && tumblrPosts.response.posts[0].tags.length" class="tags">
						<span class="tag" v-for="tag in tumblrPosts.response.posts[0].tags">
							<router-link :to="{query: {tag: tag}}">
								{{tag}}
							</router-link>
						
						</span>
					</div>
				</div>
			</div>
		</div>
	</div>
<section class="section contacts" id="contacts">
	<div class="columns">
		<div class="column">
			<div class="content main-block">
				<div v-if="identifiers">
					<p class="title is-5">
						<small @click="identifiers=false">
							<a class="icon">
								<i class="mdi mdi-arrow-left mdi-24px"></i>
							</a>
						</small>
						Scientific identifiers
					</p>
					<ul>
						<li>SPIN-RSCI: <a href="https://elibrary.ru/author_profile.asp?authorid=864928" target="_blank">7196-6711</a></li>
						<li>ORCID: <a href="http://orcid.org/0000-0002-0892-8212" target="_blank">0000-0002-0892-8212</a></li>
						<li>ResearcherID: <a href="http://www.researcherid.com/rid/N-8410-2015" target="_blank">N-8410-2015</a></li>
						<li>Scopus AuthorID: <a href="https://www.scopus.com/authid/detail.uri?partnerID=HzOxMe3b&authorId=57195626249&origin=inward" target="_blank">57195626249</a></li>
						<li><a href="https://scholar.google.ru/citations?user=fz9W8oMAAAAJ&hl=en&oi=sra" target="_blank">Google Scholar</a></li>
					</ul>
				</div>
				<div v-else>
					<p class="title is-5">Contacts</p>
					<ul>
						<li>Email: <a href="mailto:nagornyy.o@gmail.com" target="_blank">nagornyy.o@gmail.com</a></li>
						<li>VK: <a href="https://vk.com/n.oleg" target="_blank">vk.com/n.oleg</a></li>
						<li>Telegram: <a href="https://t.me/i_Hun" target="_blank">@i_Hun</a></li>
						<li>Skype: <a href="skype:nagornyy_oleg?add" target="_blank">nagornyy_oleg</a></li>
						<li>HSE: <a href="https://www.hse.ru/en/staff/oleg" target="_blank">www.hse.ru/en/staff/oleg</a></li>
						<li @click="identifiers=true"><a>Scientific identifiers</a></li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</section>
	</div>
</template>

<script>
	import moment from 'moment';
	import {QUERY_TUMBLR_POSTS, QUERY_MEDIUM_POSTS} from "../gql/queries.js";
	import {TUMBLR_KEY} from "../constants.js";
	import conferences from "../data/conferences.js";
	import publications from "../data/publications.js";

	export default {
		name: 'Main',
		data () {
			return {
				tumblrPosts: [],
				isLoading: false,
				isFullPage: true,
				conferences: conferences,
				publications: publications,
				identifiers: false
			}
		},
		apollo: {
			tumblrPosts: {
				query: QUERY_TUMBLR_POSTS,
				variables() {
					return {
						path: `/posts`,
						api_key: TUMBLR_KEY,
						tag: this.tag,
						id: this.post_id
					}
				},
				watchLoading(isLoading, countModifier) {
					this.isLoading = isLoading;
				},
			},
			// mediumPosts: {
			// 	query: QUERY_MEDIUM_POSTS,
			// 	variables() {
			// 		return {
			// 			userId: "c1c4cb221a19",
			// 			pagingOptions: {
			// 				limit: 10,
			// 				page: 1,
			// 				source: "latest",
			// 				to: "1915759093366"
			// 			}
			// 		}
			// 	},
			// }
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
			}
		},
		computed: {
			tag() {
				return this.$route.query.tag ? this.$route.query.tag : ""
			},
			post_id() {
				return this.$route.query.post_id ? this.$route.query.post_id : ""
			}
		}
	}
</script>

<style lang="sass" scoped>

.navbar
	background-color: transparent

.hero.main-header
	background-image: url("../assets/img/background-main.jpg")
	background-size: cover
	margin-top: -3.25rem

	& > .hero-body
		padding-top: 14rem

	.my-bio
		background-color: rgba(255, 255, 255, 0.85)
		box-shadow: 0 2px 3px rgba(10, 10, 10, 0.05), 0 0 0 1px rgba(10,10,10,0.05)
	.footer
		background-color: white
		padding: 20px
		margin-top: 250px

@media only screen and (min-width: 1215px)
	.main-block
		padding: 10px 20px

.regalia
	box-shadow: 1px -8px 5px 0 rgba(0,0,0,0.1)


.contacts
	ul 
		columns: 2
		margin-left: 0
		list-style: none

	@media only screen and (min-width: 1215px)
		ul
			columns: 3
	@media only screen and (max-width: 768px)
		ul
			columns: 1
	li
		margin-bottom: 0.7rem

.posts
	background-image: linear-gradient(141deg,#e8e5e6 0,whitesmoke 71%,#f3eeee 100%)
	position: relative


@media only screen and (max-width: 1215px)
	ul.posts-list
		columns: 1

.year-div
	font-weight: 600
	margin-left: -10px

@media only screen and (max-width: 1200px)
	.main-header
		background-position: center

.content a, .card a
	&:link
		border-bottom: 1px solid rgba(0,137,255,.3)
		transition: color .3s ease,border-color .3s ease

	&:visited
		color: #b40eb4
		border-color: rgba(180,14,180,.3)

	&:hover
		color: #f41224
		border-color: rgba(244,18,36,.3)

	.navbar-burger span:nth-child(3)
		top: calc(50% + 4px)


.article-header, .article-content
	padding: 20px

.post-preview
	margin-bottom: 40px

	.post-title
		margin-bottom: 0px

	.tag
		padding: 0
		margin: 0
		background-color: transparent
</style>
