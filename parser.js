module.exports = {
  onWillParseMarkdown: function(markdown) {
    return new Promise((resolve, reject)=> {
      return resolve(markdown)
    })
  },
  onDidParseMarkdown: function(html, {cheerio}) {
    return new Promise((resolve, reject)=> {
      return resolve(html)
    })
  },
  onWillTransformMarkdown: function (markdown) {
        return new Promise((resolve, reject) => {
            return resolve(markdown);
        });
    },
  onDidTransformMarkdown: function (markdown) {
      return new Promise((resolve, reject) => {
          return resolve(markdown);
      });
  },

  onWillParseMarkdown: function(markdown) {
    return new Promise((resolve, reject) => {
      //enable collapse 
      markdown = markdown.replace(
        /:::\s*spoiler\s*(\{.+\})?\s*([\w\W]+?)\s*:::/g,
        (whole, s1, c1) =>`\<details\>
${(s1)?"\<summary\>"+s1.replaceAll("\{","").replaceAll("\}","")+"\<\/summary\>\n":""}
${c1}\n\n\<\/details\>`
      );
      //enable :::
      markdown = markdown.replace(
        /:::(\w+)?\s*(\{.+\})?\s*([\w\W]*?):::/g,
        (whole, t1,t2,c1) => `
!!!${(t1)?t1:""}  ${(t2)?t2.replaceAll("\{","").replaceAll("\}",""):""}\n
\t${c1.replaceAll("\n","\n\t")}\n`,
      );
      return resolve(markdown);
    });
  },
}
