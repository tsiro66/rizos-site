// Permanent redirect from www.rizosdairy.gr (and any other host bound to this
// worker) to the canonical apex domain, preserving path and query string.
export default {
	async fetch(request): Promise<Response> {
		const url = new URL(request.url);
		url.hostname = 'rizosdairy.gr';
		return Response.redirect(url.toString(), 301);
	},
} satisfies ExportedHandler;
