import {
	Document,
	Page,
	Text,
	View,
	StyleSheet,
} from "@react-pdf/renderer";
import {Business, Product} from '@/types';

interface MenuDocumentProps {
	business: Business;
	products: Product[];
}

const styles = StyleSheet.create({
	page: {
		padding: 40,
		backgroundColor: "#D9C3B0", // beige similar a tu imagen
		fontFamily: "Helvetica",
	},
	
	header: {
		textAlign: "center",
		marginBottom: 30,
	},
	
	title: {
		fontSize: 28,
		marginBottom: 5,
	},
	
	subtitle: {
		fontSize: 12,
		letterSpacing: 2,
	},
	
	categorySection: {
		marginTop: 25,
	},
	
	categoryTitle: {
		fontSize: 14,
		marginBottom: 8,
		borderBottomWidth: 0.5,
		borderBottomColor: "#333",
		// borderBottomColor: "#000",
		paddingBottom: 4,
	},
	
	productRow: {
		marginTop: 12,
	},
	
	productHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	
	productName: {
		fontSize: 13,
	},
	
	productPrice: {
		fontSize: 13,
	},
	
	description: {
		fontSize: 10,
		marginTop: 4,
		color: "#333",
	},
	
	divider: {
		marginTop: 8,
		// borderBottomWidth: 0.5,
		// borderBottomColor: "#333",
	},
	
	footer: {
		position: "absolute",
		bottom: 30,
		left: 40,
		right: 40,
		textAlign: "center",
		fontSize: 10,
	},
});

export const MenuDocument = ({ business, products }: MenuDocumentProps) => {
	// Agrupar por categoría
	const grouped = products.reduce<Record<string, Product[]>>(
		(acc, product) => {
			const catId = product.category?.name || 'otros';
			if (!acc[catId]) {
				acc[catId] = [];
			}
			acc[catId].push(product);
			return acc;
		},
		{}
	);
	
	return (
		<Document>
			<Page size="A4" style={styles.page}>
				<View style={styles.header}>
					<Text style={styles.title}>{business.name}</Text>
					{/*<Text style={styles.subtitle}>{business.description}</Text>*/}
				</View>
				
				{Object.entries(grouped).map(([category, items]) => (
					<View key={category} style={styles.categorySection}>
						<Text style={styles.categoryTitle}>
							{category.toUpperCase()}
						</Text>
						
						{items.map((item) => (
							<View key={item.id} style={styles.productRow}>
								<View style={styles.productHeader}>
									<Text style={styles.productName}>
										{item.name}
									</Text>
									<Text style={styles.productPrice}>
										${Number(item.price).toLocaleString()}
									</Text>
								</View>
								
								{item.description && (
									<Text style={styles.description}>
										{item.description}
									</Text>
								)}
								
								<View style={styles.divider} />
							</View>
						))}
					</View>
				))}
				
				<Text style={styles.footer}>
					{business.description}
				</Text>
			</Page>
		</Document>
	);
};
