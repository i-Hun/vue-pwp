import gql from 'graphql-tag';

const QUERY_TUMBLR_POSTS = gql`
query{
    tumblrPosts(api_key: $api_key, tag: $tag, id:$id, offset:$offset) @rest(type: "TumblrPosts", path: "/posts?api_key=:api_key&tag=:tag&id=:id&offset=:offset") {
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
            },
            blog {
              posts
            }
        }
    }
}
`;

const QUERY_MEDIUM_POSTS = gql`
query UserStreamOverview($userId: ID!, $pagingOptions: PagingOptions) {
  user(id: $userId) {
    id
    name
    profileStreamConnection(paging: $pagingOptions) {
      ...commonStreamConnection
      __typename
    }
    navItems {
      title
      __typename
    }
    __typename
  }
}

fragment commonStreamConnection on StreamConnection {
  stream {
    ...StreamItemList_streamItem
    __typename
  }
  pagingInfo {
    next {
      limit
      page
      source
      to
      __typename
    }
    __typename
  }
  __typename
}

fragment StreamItemList_streamItem on StreamItem {
  ...StreamItem_streamItem
  __typename
}

fragment StreamItem_streamItem on StreamItem {
  itemType {
    __typename
    ... on StreamItemHeading {
      ...StreamItemHeading_streamItemHeading
      __typename
    }
    ... on StreamItemPostPreview {
      ...StreamItemPostPreview_streamItemPostPreview
      __typename
    }
    ... on StreamItemSeriesHeroCarousel {
      ...StreamItemSeriesHeroCarousel_streamItemSeriesHeroCarousel
      __typename
    }
    ... on StreamItemSeriesGridCard {
      ...StreamItemSeriesGridCard_streamItemSeriesGridCard
      __typename
    }
    ... on StreamItemQuotePreview {
      ...StreamItemQuotePreview_streamItemQuotePreview
      __typename
    }
    ... on StreamItemQuoteList {
      ...StreamItemQuoteList_streamItemQuoteList
      __typename
    }
    ... on StreamItemCompressedPostList {
      ...StreamItemCompressedPostList_streamItemCompressedPostList
      __typename
    }
    ... on StreamItemSequence {
      ...StreamItemSequence_streamItemSequence
      __typename
    }
  }
  __typename
}

fragment StreamItemHeading_streamItemHeading on StreamItemHeading {
  text
  heading {
    ...Heading_heading
    __typename
  }
  __typename
}

fragment Heading_heading on Heading {
  headingType {
    __typename
    ... on HeadingBasic {
      title
      __typename
    }
    ... on HeadingWithLink {
      title
      linkText
      linkUrl
      __typename
    }
  }
  __typename
}

fragment StreamItemPostPreview_streamItemPostPreview on StreamItemPostPreview {
  post {
    id
    previewContent {
      bodyModel {
        ...PostBody_bodyModel
        __typename
      }
      __typename
    }
    inResponseToPost {
      id
      title
      creator {
        id
        name
        __typename
      }
      clapCount
      responsesCount
      __typename
    }
    isLocked
    clapCount
    responsesCount
    ...PostByline_post
    ...PostPresentationTracker_post
    ...BookmarkButton_post
    __typename
  }
  __typename
}

fragment PostBody_bodyModel on RichText {
  sections {
    name
    startIndex
    textLayout
    imageLayout
    backgroundImage {
      id
      originalHeight
      originalWidth
      __typename
    }
    videoLayout
    backgroundVideo {
      videoId
      originalHeight
      originalWidth
      previewImageId
      __typename
    }
    __typename
  }
  paragraphs {
    ...PostBodySection_paragraphs
    __typename
  }
  __typename
}

fragment PostBodySection_paragraphs on Paragraph {
  name
  ...PostBodyParagraph_paragraph
  __typename
}

fragment PostBodyParagraph_paragraph on Paragraph {
  type
  ...ImageParagraph_paragraph
  ...TextParagraph_paragraph
  ...IframeParagraph_paragraph
  ...MixtapeParagraph_paragraph
  __typename
}

fragment IframeParagraph_paragraph on Paragraph {
  iframe {
    mediaResource {
      iframeSrc
      iframeHeight
      iframeWidth
      __typename
    }
    __typename
  }
  layout
  ...Markup_paragraph
  __typename
}

fragment Markup_paragraph on Paragraph {
  text
  markups {
    ...Markup_markup
    __typename
  }
  __typename
}

fragment Markup_markup on Markup {
  type
  start
  end
  href
  anchorType
  userId
  linkMetadata {
    httpStatus
    __typename
  }
  __typename
}

fragment ImageParagraph_paragraph on Paragraph {
  href
  layout
  metadata {
    id
    originalHeight
    originalWidth
    __typename
  }
  ...Markup_paragraph
  __typename
}

fragment TextParagraph_paragraph on Paragraph {
  type
  ...Markup_paragraph
  __typename
}

fragment MixtapeParagraph_paragraph on Paragraph {
  mixtapeMetadata {
    href
    __typename
  }
  __typename
}

fragment PostByline_post on Post {
  id
  firstPublishedAt
  readingTime
  statusForCollection,
    tags {
        displayTitle,
        id
    },
  collection {
    name
    id
    slug
    __typename
  }
  creator {
    name
    username
    id
    bio
    ...UserAvatar_user
    __typename
  }
  __typename
}

fragment UserAvatar_user on User {
  username
  id
  name
  imageId
  mediumMemberAt
  __typename
}

fragment PostPresentationTracker_post on Post {
  id
  visibility
  isLockedPreviewOnly
  previewContent {
    isFullContent
    __typename
  }
  collection {
    id
    __typename
  }
  __typename
}

fragment BookmarkButton_post on Post {
  ...WithSetReadingList_post
  __typename
}

fragment WithSetReadingList_post on Post {
  ...ReadingList_post
  __typename
}

fragment ReadingList_post on Post {
  id
  readingList
  __typename
}

fragment StreamItemSeriesHeroCarousel_streamItemSeriesHeroCarousel on StreamItemSeriesHeroCarousel {
  cards {
    ...SeriesCarouselHeroCard_seriesCarouselHeroCard
    __typename
  }
  __typename
}

fragment SeriesCarouselHeroCard_seriesCarouselHeroCard on SeriesCarouselHeroCard {
  post {
    ...SeriesTitleCard_post
    __typename
  }
  __typename
}

fragment SeriesTitleCard_post on Post {
  id
  title
  previewContent {
    bodyModel {
      paragraphs {
        metadata {
          id
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}

fragment StreamItemSeriesGridCard_streamItemSeriesGridCard on StreamItemSeriesGridCard {
  post {
    ...SeriesTitleCard_post
    __typename
  }
  __typename
}

fragment StreamItemQuotePreview_streamItemQuotePreview on StreamItemQuotePreview {
  quote {
    ...Quote_quote
    __typename
  }
  __typename
}

fragment Quote_quote on Quote {
  post {
    id
    title
    creator {
      id
      username
      name
      __typename
    }
    __typename
  }
  startOffset
  endOffset
  quoteParagraphPreview {
    text
    type
    markups {
      anchorType
      end
      href
      rel
      start
      title
      type
      userId
      __typename
    }
    __typename
  }
  __typename
}

fragment StreamItemQuoteList_streamItemQuoteList on StreamItemQuoteList {
  heading {
    ...Heading_heading
    __typename
  }
  items {
    quote {
      ...Quote_quote
      __typename
    }
    __typename
  }
  __typename
}

fragment StreamItemCompressedPostList_streamItemCompressedPostList on StreamItemCompressedPostList {
  heading {
    ...Heading_heading
    __typename
  }
  items {
    post {
      id
      title
      creator {
        id
        username
        name
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}

fragment StreamItemSequence_streamItemSequence on StreamItemSequence {
  sequence {
    slug
    eyebrow
    title
    subtitle
    description
    updatedAt
    featuredUserTitle
    featuredUserCustomBio
    color
    bgColor
    hideIndex
    postIds
    coverImage {
      id
      __typename
    }
    tabletImage {
      id
      __typename
    }
    thumbnailImage {
      id
      __typename
    }
    featuredUser {
      username
      id
      name
      imageId
      mediumMemberAt
      __typename
    }
    __typename
  }
  __typename
}
`;



export {QUERY_TUMBLR_POSTS, QUERY_MEDIUM_POSTS};