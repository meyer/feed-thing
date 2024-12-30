# Well, well, well, what have we here…

This thing that I have made turns different sites’ authenticated feed APIs into RSS feeds on a per-site basis. It’s built with Cloudflare workers in mind. Only Tumblr and Flickr are supported for now.

My motivation is twofold.

1. Internet Creators have built these beautiful Things, but instead of helping these Things mature and age gracefully, they’ve been under pressure to Monetise and Stay Relevant and Appeal To The Teens. These Things that drew me in with their elegance and simplicity have become a mess of Apps and Engagement Bullshit.

    This is an opinionated step in the other direction.
2. Tumblr retains no read status and I follow a lot of people on Tumblr, which means I end up missing out on a lot of great stuff. RSS readers were built to solve this problem, but Tumblr lacks a private dashboard RSS feed, so I had to build my own.

# Technical details

- Hosted on [Cloudflare Workers](https://workers.cloudflare.com/)
- Built using [Astro](https://astro.build/)

# How do I use this thing

1. Update the `wrangler.jsonc` file:
    - (Optional) Update `name` to whatever subdomain name you want your thing to live at. Defaults to "feeds", which turns into `feeds.yourcloudflarename.workers.dev`.
    - Change `kv_namespaces` to point to a KV namespace you own.
    - Update `vars` to point to your Flickr/Tumblr keys and Flickr/Tumblr username/user ID.
2. Run `pnpm dev` to test it locally.
3. Run `pnpm run deploy` to push it up to your worker.


# Configuratin’

You’ll need to set two secrets on Cloudflare:
```
pnpm wrangler secret put TUMBLR_OAUTH_CONSUMER_SECRET
pnpm wrangler secret put FLICKR_API_SECRET
```

If you want to run this biz locally (and you do), make a `.dev.vars` file in the root of this folder with those environmental variables set. Should look a little something like this:

```sh
TUMBLR_OAUTH_CONSUMER_SECRET=*****
FLICKR_API_SECRET=*****
```

Once everything’s up and running, your RSS feeds will be available at http://localhost:4710. To authenticate with Tumblr, go to http://localhost:4710/tumblr. For Flickr: http://localhost:4710/tumblr.

# TODO

## Additional Feeds
* Instagram (?)

---

Questions/problems? File an issue and/or bug me [on 🦋 Bluesky][@meyer].

[@meyer]: https://bsky.app/profile/meyer.fm
