import type { PageLoad } from '../../../.svelte-kit/types/src/routes/$types';


export const load: PageLoad = async (event) => {
	let site_null = event.url.searchParams.get("url");
	if(site_null === null){
		return {};
	} 
	let site = site_null as unknown as string;
	

	let fetch_res = await fetch(site);
	return {
		extern_site_body: (await fetch_res.text()).replaceAll("=\"/", "=\"https://google.com/")
	}
};
