import type { BlockPost, NPFPost } from '~/utils/tumblr/tumblrApi';

export const getHtmlForBlock = (post: NPFPost | BlockPost) => {
  let ret = '';

  for (const block of post.content) {
    if (block.type === 'image') {
      const largestMedia = block.media.reduce((prev, curr) => {
        if (!prev) return curr;
        return prev.width > curr.width ? prev : curr;
      }, block.media[0]);
      if (!largestMedia) continue;
      ret += `<img src="${largestMedia.url}">`;
    } else if (block.type === 'text') {
      ret += '<br>TEXT: ' + JSON.stringify(block);
    } else if (block.type === 'blocks') {
      ret += getHtmlForBlock(block);
    }
  }

  return ret;
};
