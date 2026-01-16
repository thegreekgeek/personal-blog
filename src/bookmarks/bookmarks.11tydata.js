module.exports = {
  tags: ["bookmarks"],
  layout: "layouts/bookmark.njk",
  eleventyComputed: {
    bookmarkOf: data => data.bookmarkOf || data["bookmark-of"],
    permalink: data => `bookmarks/${data.page.fileSlug}/`
  }
};
