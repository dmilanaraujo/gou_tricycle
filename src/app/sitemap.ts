import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: process.env.NEXT_PUBLIC_SITE_URL || '',
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 1,
			// images: ['https://example.com/image.jpg'],
			// videos: [
			// 	{
			// 		title: 'example',
			// 		thumbnail_loc: 'https://example.com/image.jpg',
			// 		description: 'this is the description',
			// 	},
			// ],
		}
	]
}
