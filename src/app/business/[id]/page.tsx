import { getBusinessById } from "@/lib/actions/business";
import { notFound } from "next/navigation";
import {getPublicImageUrl} from "@/lib/utils";
import Image from "next/image";

export default async function BusinessDetailPage(
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    const res = await getBusinessById(id);

    if (!res?.success || !res.data) notFound();

    const business = res.data;

    return (
        <main className="min-h-screen bg-background pt-2 w-full max-w-screen-xl mx-auto px-4 pb-8">
            {/* Banner */}
            <section className="relative h-[260px] w-full rounded-xl">
                <Image
                    src={getPublicImageUrl(business.banner || business.logo)}
                    alt={business.name}
                    fill
                    className="object-cover rounded-xl"
                    priority
                />

                {/* Logo flotante */}
                <div className="absolute -bottom-8 left-6">
                    <div className="relative h-20 w-20">
                        <Image
                            src={getPublicImageUrl(business.logo)}
                            alt={business.name}
                            fill
                            className="rounded-full border-4 border-background bg-white shadow-lg object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* Info */}
            <section className="max-w-5xl mx-auto px-4 pt-12 pb-6">
                <h2 className="text-3xl font-bold">{business.name}</h2>

                <div className="mt-2 flex flex-wrap gap-2 text-sm text-muted-foreground">
                    <span>⭐ {business.rating} ({business.reviews}+)</span>
                    <span>• {business.sections?.[0]?.name}</span>
                    <span>• {business.categories?.[0]?.name}</span>
                    <span>• {business.price_range || "$"}</span>
                </div>

                <p className="mt-3 text-sm text-muted-foreground">
                    {business.description}
                </p>

                <p className="mt-2 text-sm">
                    📍 {business.municipality}, {business.province}
                </p>
            </section>

            {/* Actions */}
            <section className="max-w-5xl mx-auto px-4 pb-10 flex gap-4">
                <button className="rounded-full bg-black text-white px-6 py-3">
                    Delivery
                </button>

                <button className="rounded-full border px-6 py-3">
                    Pickup
                </button>

                <button className="rounded-full border px-6 py-3">
                    Group order
                </button>
            </section>
        </main>
    );
}


