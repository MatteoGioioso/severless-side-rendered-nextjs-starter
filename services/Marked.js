const marked = require('marked');

marked.setOptions({
  renderer: new marked.Renderer(),
  sanitize: true,
  smartLists: true,
  smartypants: true
});