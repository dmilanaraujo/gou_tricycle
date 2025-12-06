import { ImageResponse } from 'next/og'

// Image metadata
// export const alt = 'About Acme'
export const size = {
	width: 1200,
	height: 630,
}

export const contentType = 'image/png'

// Image generation
export default async function Image() {
	
	return new ImageResponse(
		(
			// ImageResponse JSX element
			<div
				style={{
					// fontSize: 128,
					// background: 'white',
					// width: '100%',
					// height: '100%',
					// display: 'flex',
					// alignItems: 'center',
					// justifyContent: 'center',
					
					display: 'flex',
					height: '100%',
					width: '100%',
					alignItems: 'center',
					justifyContent: 'center',
					flexDirection: 'column',
					backgroundImage: 'linear-gradient(to bottom, #2563eb, #1e40af)',
					fontSize: 60,
					letterSpacing: -2,
					fontWeight: 700,
					textAlign: 'center',
					color: 'white',
				}}
			>
				
				<div
					style={{
						display: 'flex',
						height: '100%',
						width: '100%',
						position: 'relative',
					}}
				>
					{/* Imagen de fondo */}
				
					
					{/* Overlay oscuro para mejorar legibilidad */}
					{/*<div*/}
					{/*	style={{*/}
					{/*		position: 'absolute',*/}
					{/*		width: '100%',*/}
					{/*		height: '100%',*/}
					{/*		backgroundColor: 'rgba(0, 0, 0, 0.5)',*/}
					{/*	}}*/}
					{/*/>*/}
					
					{/* Contenido */}
					<div
						style={{
							display: 'flex',
							position: 'relative',
							height: '100%',
							width: '100%',
							alignItems: 'center',
							justifyContent: 'space-between',
							flexDirection: 'column',
							color: 'white',
							fontSize: 60,
							fontWeight: 700,
							textAlign: 'center',
							padding: '20px 40px',
						}}
					>
						<img
							src={`${process.env.NEXT_PUBLIC_SITE_URL}/gou-blue.svg`}
							width={'50%'}
							height={'50%'}
							style={{
								position: 'absolute',
								width: '100%',
								height: '100%',
								objectFit: 'contain',
							}}
						/>
						<div style={{fontSize: 80, marginBottom: 20}}>{'Triciclos'}</div>
						<div style={{fontSize: 37}}>{'Encuentre triciclos disponibles en cuba'}</div>
					</div>
				</div>
			</div>
		
		
		),
		// ImageResponse options
		{
			// For convenience, we can re-use the exported opengraph-image
			// size config to also set the ImageResponse's width and height.
			...size,
			
			// fonts: [
			// 	{
			// 		name: 'Inter',
		// 		data: interSemiBold,
		// 		style: 'normal',
		// 		weight: 400,
		// 	},
		// ],
		}
	)
}
