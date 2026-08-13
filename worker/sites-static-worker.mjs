/** Cloudflare Worker entry point for the existing static Astro site. */
export default {
  async fetch(request, env) {
    return env.ASSETS.fetch(request);
  },
};
