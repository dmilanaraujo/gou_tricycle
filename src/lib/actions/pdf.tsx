'use server'

import {listProducts} from '@/lib/actions/product';
import {MenuDocument} from '@/components/common/pdf/menu-document';
import { renderToBuffer} from '@react-pdf/renderer';
import {createClient} from '@/lib/supabase/server';
import {Business} from '@/types';

export async function generateMenuPdf(business: Business) {
	const response = await listProducts({
		business_id: business!.id,
		limit: 500,
	});
	const result = response.success ? response.data : { data: [] };
	
	if (result?.data.length == 0) {
		throw new Error('No existen productos');
	}

	const doc = (
		<MenuDocument
			business={business}
			products={result?.data || []}
		/>
	);

	const buffer = await renderToBuffer(doc)
	
	const filePath = `${business.slug}/menu.pdf`;
	
	const supabase = await createClient();

	await supabase.storage
		.from('restaurant_menus')
		.upload(filePath, buffer, {
			contentType: "application/pdf",
			upsert: true,
			cacheControl: "3600",
		});
	
	const { data: publicUrl } = supabase
		.storage
		.from("restaurant_menus")
		.getPublicUrl(filePath);
	
	return publicUrl.publicUrl;
}
