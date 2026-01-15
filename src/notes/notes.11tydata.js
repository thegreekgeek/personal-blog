module.exports = {
  tags: ["notes"],
  layout: "layouts/note.njk",
  eleventyComputed: {
    likeOf: data => data.likeOf || data["like-of"],
    inReplyTo: data => data.inReplyTo || data["in-reply-to"],
    repostOf: data => data.repostOf || data["repost-of"],
    bookmarkOf: data => data.bookmarkOf || data["bookmark-of"]
  }
};
