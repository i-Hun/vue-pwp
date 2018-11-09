import Vue from 'vue';
import Router from 'vue-router';
import router from './routes.js';
import App from './App.vue';

import VueApollo from 'vue-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { ApolloLink } from 'apollo-link';
import { withClientState } from 'apollo-link-state';
import { HttpLink } from 'apollo-link-http';
import { RestLink } from 'apollo-link-rest';

import Buefy from 'buefy';
Vue.use(Buefy)

import VueMasonry from 'vue-masonry-css';
Vue.use(VueMasonry);

Vue.use(VueApollo)

import VueContentPlaceholders from 'vue-content-placeholders'
Vue.use(VueContentPlaceholders)

import FlagIcon from 'vue-flag-icon'
Vue.use(FlagIcon);


const cache = new InMemoryCache();


const initialState = {
    selectedTags: [],
};

const stateLink = withClientState({
  cache,
  defaults: initialState,
  resolvers: {
    Mutation: {
      updateTags: (_, { newTags }, context) => {
        const data = {
            selectedTags: newTags
        };
        context.cache.writeData({ data });
        return null;
      },
    },
  },
});

const restLink = new RestLink({
    uri: "https://api.tumblr.com/v2/blog/ihun.tumblr.com",
    typePatcher: {
        TumblrPosts: function (data) {

            data.response["__typename"] = "TumblrResponse";
            data.response.blog["__typename"] = "TumblrResponse";

            data.response.posts = data.response.posts.map(function(post) {
                return { __typename: "TumblrPost", ...post }
            });
            return data;
        }
    },

})


const httpLink = new HttpLink({
    uri: '/graphql/',
});


const apolloClient = new ApolloClient({
    link: ApolloLink.from([stateLink, restLink, httpLink]),
    cache,
    connectToDevTools: true,
})


const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
})


Vue.use(Router)


new Vue({
    el: '#app',
    render: h => h(App),
    provide: apolloProvider.provide(),
    router,
})
