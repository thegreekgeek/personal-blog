const { DateTime } = require("luxon");

module.exports = {
  tags: ["photos"],
  layout: "layouts/photo.njk",
  eleventyComputed: {
    permalink: data => {
      // url: "photos/{yyyy}/{DDD}/{slug}/"
      // DDD is day of year (1-366)
      if (data.date) {
        const d = DateTime.fromJSDate(data.date, { zone: "utc" });
        return `photos/${d.toFormat("yyyy/ooo")}/${data.page.fileSlug}/`;
        // Luxon 'o' is day of year (1-366). 'ooo' pads to 3 digits.
      }
      return `photos/${data.page.fileSlug}/`;
    }
  }
};
