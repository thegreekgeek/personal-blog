module.exports = function (eleventyConfig) {
  eleventyConfig.setTemplateFormats([
    // Templates:
    'html',
    'njk',
    'md',
    // Static Assets:
    'css',
    'jpeg',
    'jpg',
    'png',
    'svg',
    'woff',
    'woff2',
  ]);
  eleventyConfig.addPassthroughCopy('static');

  return {
    dir: {
      input: 'src/templates',
      includes: '../includes',
      output: '_output',
    },
  };
};
