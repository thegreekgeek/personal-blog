const { DateTime } = require("luxon");

module.exports = {
  tags: ["notes"],
  layout: "layouts/note.njk",
  eleventyComputed: {
    likeOf: data => data.likeOf || data["like-of"],
    inReplyTo: data => data.inReplyTo || data["in-reply-to"],
    repostOf: data => data.repostOf || data["repost-of"],
    bookmarkOf: data => data.bookmarkOf || data["bookmark-of"],
    permalink: data => {
      // url: "~thegreekgeek/notes/{yyyy}-{MM}-{dd}-{slug}"
      // 11ty strips date from fileSlug. We need to reconstruct it or use the original filename.
      // If we use date from frontmatter/filename:
      if (data.date && data.page.fileSlug) {
        const d = DateTime.fromJSDate(data.date, { zone: "utc" });
        return `notes/${d.toFormat("yyyy-MM-dd")}-${data.page.fileSlug}/`;
      }
      return `notes/${data.page.fileSlug}/`;
    }
  }
};
