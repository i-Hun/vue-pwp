import gql from 'graphql-tag';

const QUERY_TUMBLR_POSTS = gql`
query{
    tumblrPosts(api_key: $api_key, tag: $tag, id:$id) @rest(type: "TumblrPosts", path: "/posts?api_key=:api_key&tag=:tag&id=:id") {
        response {
            posts {
            	id,
                title,
                summary,
                body,
                type,
                post_url,
                tags,
                date
            }
        }
    }
}
`;



export {QUERY_TUMBLR_POSTS};