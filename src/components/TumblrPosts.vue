<template>
	<div class="posts section">
		<div v-if="$apollo.queries.tumblrPosts.loading">Loading...</div>
		<div v-else>
		<masonry
		:cols="{default: 3, 1280: 2, 400: 1}"
		:gutter="{default: '30px', 700: '15px'}"
		>
			<div v-for="post in tumblrPosts.response.posts" class="post-preview">
				<div v-if="post.type=='text'">
					<h1 v-if="post.title" class="title is-spaced">
						<router-link :to="{name: 'TumblrPosts', query: {post_id: post.id}}">
						{{ post.title }}
						</router-link>
					</h1>
					
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
		</masonry>
		</div>
	<b-loading :is-full-page="isFullPage" :active.sync="isLoading" :can-cancel="true"></b-loading>	</div>
</template>

<script>
	import moment from 'moment';
	import {QUERY_TUMBLR_POSTS} from "../gql/queries.js";
	import {formatDateTime} from "../misc/util.js";
	import {TUMBLR_KEY} from "../constants.js";

	export default {
		name: 'TumblrPosts',
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
						tag: this.tag,
						id: this.post_id
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
			tag() {
				return this.$route.query.tag ? this.$route.query.tag : ""
			},
			post_id () {
				return this.$route.query.post_id ? this.$route.query.post_id : ""
			}
		}
	}
</script>

<style lang="sass" scoped>
	.post-preview
		margin-bottom: 50px

		h1 a
			color: #333
</style>
