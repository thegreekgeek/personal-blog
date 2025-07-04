const { DateTime } = require("luxon");
const pluginSEO = require("eleventy-plugin-seo");


/**
 * This is the JavaScript code that determines the config for your Eleventy site
 *
 * You can add lost of customization here to define how the site builds your content
 * Try extending it to suit your needs!
 */

module.exports = async function (eleventyConfig) {
  const { HtmlBasePlugin } = await import("@11ty/eleventy");

	eleventyConfig.addPlugin(HtmlBasePlugin, {
  baseHref: "/~thegreekgeek/", // Use a relative base href for subdirectory deployment
  extensions: "html"
});
  eleventyConfig.setTemplateFormats([
    // Templates:
    "html",
    "njk",
    "md",
    // Static Assets:
    "css",
    "jpeg",
    "jpg",
    "png",
    "svg",
    "woff",
    "woff2",
  ]);
  eleventyConfig.addPassthroughCopy("public");

  eleventyConfig.addPassthroughCopy(".well-known");

  eleventyConfig.addPassthroughCopy("blog");

  eleventyConfig.addPassthroughCopy("404.html");


  eleventyConfig.setBrowserSyncConfig({
      middleware: [
          function (req, res, next) {
              if (/^@blog$/.test(req.url)) {
                  res.setHeader('Content-Type', 'application/activity+json;');
              }
              next();
          }
      ]
  });

  /* From: https://github.com/artstorm/eleventy-plugin-seo
  
  Adds SEO settings to the top of all pages
  The "glitch-default" bit allows someone to set the url in seo.json while
  still letting it have a proper glitch.me address via PROJECT_DOMAIN
  */
  const seo = require("./src/seo.json");
  if (seo.url === "glitch-default") {
    seo.url = `https://${process.env.PROJECT_DOMAIN}.glitch.me`;
  }
  eleventyConfig.addPlugin(pluginSEO, seo);

  // Filters let you modify the content https://www.11ty.dev/docs/filters/
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "America/Chicago" }).toFormat("yyyy-LL-dd, HH:MM");
  });

  eleventyConfig.addFilter("isoDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toISO();
  });

  eleventyConfig.setBrowserSyncConfig({ ghostMode: false });

  /* Build the collection of posts to list in the site
     - Read the Next Steps post to learn how to extend this
  */
  eleventyConfig.addCollection("posts", function (collection) {
    /* The posts collection includes all posts that list 'posts' in the front matter 'tags'
       - https://www.11ty.dev/docs/collections/
    */

    // EDIT HERE WITH THE CODE FROM THE NEXT STEPS PAGE TO REVERSE CHRONOLOGICAL ORDER
    // (inspired by https://github.com/11ty/eleventy/issues/898#issuecomment-581738415)
    const coll = collection.getFilteredByTag("posts");

    // From: https://github.com/11ty/eleventy/issues/529#issuecomment-568257426
    // Adds {{ prevPost.url }} {{ prevPost.data.title }}, etc, to our njks templates
    for (let i = 0; i < coll.length; i++) {
      const prevPost = coll[i - 1];
      const nextPost = coll[i + 1];

      coll[i].data["prevPost"] = prevPost;
      coll[i].data["nextPost"] = nextPost;
    }

    return coll;
  });

  eleventyConfig.addCollection("notes", function (collection) {
    /* The notes collection includes all notes that list 'notes' in the front matter 'tags'
       - https://www.11ty.dev/docs/collections/
    */

    // EDIT HERE WITH THE CODE FROM THE NEXT STEPS PAGE TO REVERSE CHRONOLOGICAL ORDER
    // (inspired by https://github.com/11ty/eleventy/issues/898#issuecomment-581738415)
    const coll = collection.getFilteredByTag("notes");

    // From: https://github.com/11ty/eleventy/issues/529#issuecomment-568257426
    // Adds {{ prevPost.url }} {{ prevPost.data.title }}, etc, to our njks templates
    for (let i = 0; i < coll.length; i++) {
      const prevNote = coll[i - 1];
      const nextNote = coll[i + 1];

      coll[i].data["prevNote"] = prevNote;
      coll[i].data["nextNote"] = nextNote;
    }

    return coll;
  });

  eleventyConfig.addCollection("slashes", function (collection) {
    /* The slashes collection includes all slash pages that list 'slashes' in the front matter 'tags'
       - https://www.11ty.dev/docs/collections/
    */

    // EDIT HERE WITH THE CODE FROM THE NEXT STEPS PAGE TO REVERSE CHRONOLOGICAL ORDER
    // (inspired by https://github.com/11ty/eleventy/issues/898#issuecomment-581738415)
    const coll = collection.getFilteredByTag("slashes");

    // From: https://github.com/11ty/eleventy/issues/529#issuecomment-568257426
    // Adds {{ prevSlash.url }} {{ prevSlash.data.title }}, etc, to our njks templates
    for (let i = 0; i < coll.length; i++) {
      const prevSlash = coll[i - 1];
      const nextSlash = coll[i + 1];

      coll[i].data["prevSlash"] = prevSlash;
      coll[i].data["nextSlash"] = nextSlash;
    }

    return coll;
  });

  eleventyConfig.addCollection("projects", function (collection) {
    /* The projects collection includes all slash pages that list 'projects' in the front matter 'tags'
       - https://www.11ty.dev/docs/collections/
    */

    // EDIT HERE WITH THE CODE FROM THE NEXT STEPS PAGE TO REVERSE CHRONOLOGICAL ORDER
    // (inspired by https://github.com/11ty/eleventy/issues/898#issuecomment-581738415)
    const coll = collection.getFilteredByTag("projects");

    // From: https://github.com/11ty/eleventy/issues/529#issuecomment-568257426
    // Adds {{ prevSlash.url }} {{ prevSlash.data.title }}, etc, to our njks templates
    for (let i = 0; i < coll.length; i++) {
      const prevProject = coll[i - 1];
      const nextProject = coll[i + 1];

      coll[i].data["prevProject"] = prevProject;
      coll[i].data["nextProject"] = nextProject;
    }

    return coll;
  });

  eleventyConfig.addCollection("frontpage", function (collection) {
		return collection.getFilteredByGlob(["src/posts/*.md", "src/notes/*.md", "src/likes/*.md"]).reverse();
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "build",
    },
  };
};
