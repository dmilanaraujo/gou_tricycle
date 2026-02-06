import {ProductGallery} from "@/components/client/product-gallery";
import {listProducts} from "@/lib/actions/product";
import {getServiceById} from "@/lib/actions/service";
import {Product} from "@/types";
import {notFound} from "next/navigation";


export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    const product = await getServiceById<Product>(id);

    if (!product) {
        notFound();
    }

    return (
        <div>
            <h1>hdfvdbvfdbn</h1>
            <ProductGallery
                images={product.images.map(img => img.path)}
            />
        </div>

    )
}