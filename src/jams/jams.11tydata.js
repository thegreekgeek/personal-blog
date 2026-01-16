const { DateTime } = require("luxon");

module.exports = {
  tags: ["jams"],
  layout: "layouts/jam.njk",
  eleventyComputed: {
    permalink: data => {
      // url: "jams/{yyyy}/{MM}/{dd}/{slug}"
      // We need to parse the date.
      if (data.date) {
        const d = DateTime.fromJSDate(data.date, { zone: "utc" }); // Use UTC to avoid timezone shifts
        return `jams/${d.toFormat("yyyy/MM/dd")}/${data.page.fileSlug}/`;
      }
      return `jams/${data.page.fileSlug}/`;
    }
  }
};
