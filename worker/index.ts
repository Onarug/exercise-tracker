export default {
  async fetch(request: Request, env: any): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/")) {
      const backendUrl = "https://exercise-tracker-y5ud.onrender.com" + url.pathname.replace("/api", "") + url.search;
      const proxiedRequest = new Request(backendUrl, request);
      return fetch(proxiedRequest);
    }

    return env.ASSETS.fetch(request);
  },
};