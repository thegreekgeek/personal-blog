module.exports = {
  tags: ["posts"],
  layout: "layouts/post.njk",
  eleventyComputed: {
    likeOf: data => data.likeOf || data["like-of"],
    inReplyTo: data => data.inReplyTo || data["in-reply-to"],
    repostOf: data => data.repostOf || data["repost-of"],
    bookmarkOf: data => data.bookmarkOf || data["bookmark-of"]
  }
};
