<template>
	<div class="posts section">
		<div v-if="$apollo.queries.tumblrPosts.loading">Loading...</div>
		<div v-else>
			<div v-if="post.type=='text'">
				<h1 v-if="post.title" class="title is-spaced">
					{{ post.title }}
				</h1>

				<div class="subtitle" v-if="post.summary" v-html="post.summary"></div>
				
				<div v-html="post.body"></div>
				<div v-if="post.tags && post.tags.length" class="tags">
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
	<b-loading :is-full-page="isFullPage" :active.sync="isLoading" :can-cancel="true"></b-loading>	</div>
</template>

<script>
	import moment from 'moment';
	import {QUERY_TUMBLR_POSTS} from "../gql/queries.js";
	import {formatDateTime} from "../misc/util.js";
	import {TUMBLR_KEY} from "../constants.js";


	export default {
		name: 'TumblrPost',
		data () {
			return {
				tumblrPosts: [],
				isLoading: false,
				isFullPage: true,
			}
		 },
		apollo: {
			tumblrPosts: {
				query: QUERY_TUMBLR_POSTS,
				variables() {
					return {
						path: `/posts`,
						api_key: TUMBLR_KEY,
						tag: "",
						id: this.id
					}
				},
				watchLoading(isLoading, countModifier) {
					this.isLoading = isLoading;
				},
			}
		 },
		methods: {
			formatDateTime,
		},
		computed: {
			id() {
				return this.$route.params.id ? this.$route.params.id : ""
			},
			post () {
				return this.tumblrPosts.response.posts.length ? this.tumblrPosts.response.posts[0] : null
			}
		}
	}
</script>

<style scoped>
	.post-preview {
		margin-bottom: 50px;
	}
</style>
