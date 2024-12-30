import { invariant } from '@workers-utils/common';
import { StructError } from 'superstruct';
import type { JSONFeedGetter } from '~/utils/makeJsonFeedRoute';
import { getFeedItemsForPosts } from '~/utils/tumblr/getFeedItemsForPosts';
import {
  getAvatarUrl,
  getDashboard,
  getTumblrAuthDataFromKV,
  getUserInfo,
} from '~/utils/tumblr/tumblrApi';

export const getDashboardFeed: JSONFeedGetter = async (context) => {
  try {
    invariant(context.params.uuid, 'Missing UUID');
    const authData = await getTumblrAuthDataFromKV(
      context.params.uuid,
      context.locals
    );

    const userInfo = await getUserInfo(authData);
    const dashboardPosts = await getDashboard(authData, {
      limit: 20,
      notes_info: true,
      reblog_info: true,
      npf: true,
    });

    const feedItems = getFeedItemsForPosts(dashboardPosts);

    const feedUrl = new URL(context.url);
    feedUrl.pathname = '';
    feedUrl.search = '';

    return {
      version: 'https://jsonfeed.org/version/1.1',
      title: userInfo.user.name + ' — Dashboard',
      description: 'Dashboard feed for ' + userInfo.user.name,
      feed_url: feedUrl.toString(),
      home_page_url: userInfo.user.blogs[0]?.url,
      icon: getAvatarUrl('tumblr', 512),
      favicon: getAvatarUrl('tumblr', 128),
      authors: [{ name: userInfo.user.name, url: userInfo.user.blogs[0]?.url }],
      items: feedItems,
    };
  } catch (error) {
    if (error instanceof StructError) {
      console.error(error.message, {
        branch: error.branch,
        failures: error.failures(),
      });
      return {
        version: 'https://jsonfeed.org/version/1.1',
        title: 'StructError',
        items: [],
      };
    }
    throw error;
  }
};
