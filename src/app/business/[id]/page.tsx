import {getBusinessById, getBusinessReviews} from "@/lib/actions/business";
import { notFound } from "next/navigation";
import {getPublicImageUrl} from "@/lib/utils";
import Image from "next/image";
import {ArrowDownIcon, LocateIcon, MapPin, StarIcon} from "lucide-react";
import * as React from "react";
import {Badge} from "@/components/ui/badge";
import {municipalities, provinces} from "@/lib/data/locations";
import {Button} from "@/components/ui/button";

export default async function BusinessDetailPage(
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    const res = await getBusinessById(id);
    const { data: reviews } = await getBusinessReviews(id);


    if (!res?.success || !res.data) notFound();

    const business = res.data;

    const provinceLabel = provinces.find(p => p.value === business.province)?.label || business.province;
    const municipalityLabel =
        municipalities[business.province]?.find((m) => m.value === business.municipality)?.label || business.municipality;

    const fullLocationLabel = `${municipalityLabel}, ${provinceLabel}`;

    return (
        <main className="min-h-screen bg-background pt-2 w-full max-w-screen-xl mx-auto px-10 pb-8">
            {/* Banner */}
            <section className="relative h-[250px] w-full rounded-xl">
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
                            className="rounded-full border-4 border-background bg-white object-cover"
                        />
                    </div>
                </div>

                {/* Ubicación */}
                <div className="absolute bottom-3 right-4">
                    <Badge className="bg-black/50 text-white backdrop-blur-sm border border-white/10 text-xs px-3 py-1">
                        {fullLocationLabel}
                    </Badge>
                </div>
            </section>

            {/* Info */}
            <section className="w-full pt-8 pb-6">
                <h2 className="text-4xl font-semibold">{business.name}</h2>

                <div className="mt-2 flex flex-wrap gap-2 text-lg text-muted-foreground">
                    <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 text-lg text-muted-foreground">
                                <StarIcon className="w-4 h-4"/>
                                <span className="font-bold">
                                    {business.rating}
                                </span>
                                <span>
                                    ({business.reviews || 0}+)
                                </span>
                            </div>
                    </div>
                    <span>• {business.sections?.[0]?.name}</span>
                    <span>• {business.categories?.[0]?.name}</span>
                </div>

                <p className="text-md text-muted-foreground">
                    {business.description}
                </p>

                <p className="flex gap-1 items-center text-md text-muted-foreground">
                    <MapPin className="w-4 h-4" />{business.address}
                </p>
            </section>

            {/* Ratings & Reviews */}
            <section className="w-full">
                <h3 className="text-2xl font-semibold mb-4">Valoraciones y Comentarios</h3>

                <div className="rounded-xl border bg-card p-6 flex flex-col md:flex-row gap-6">

                    {/* Columna izquierda – Rating */}
                    <div className="flex flex-col items-center justify-center w-full md:w-1/4 border-r md:pr-6">
                        <span className="text-5xl font-bold">{business.rating}</span>

                        <div className="flex mt-2">
                            {[1, 2, 3, 4, 5].map(i => (
                                <StarIcon
                                    key={i}
                                    className={`w-5 h-5 ${
                                        i <= Math.round(business.rating)
                                            ? "fill-amber-500 stroke-amber-500"
                                            : "stroke-muted-foreground"
                                    }`}
                                />
                            ))}
                        </div>

                        <span className="mt-2 text-sm text-muted-foreground">
                            {business.reviews}+ Votos
                        </span>
                    </div>

                    <div className="flex-1 space-y-4">
                        {reviews && reviews.length > 0 ? (
                            reviews.slice(0, 2).map((review) => (
                                <div key={review.id}>
                                    <p className="text-sm">"{review.comment}"</p>

                                    <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                                        <div className="flex">
                                            {[1, 2, 3, 4, 5].map(i => (
                                                <StarIcon
                                                    key={i}
                                                    className={`w-4 h-4 ${
                                                        i <= review.rating
                                                            ? "fill-amber-500 stroke-amber-500"
                                                            : "stroke-muted-foreground"
                                                    }`}
                                                />
                                            ))}
                                        </div>

                                        <span>{review.user_display_name ?? "Usuario"}</span>
                                        <span>· {new Date(review.created_at).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-muted-foreground">
                                Este negocio aún no tiene valoraciones.
                            </p>
                        )}

                        {reviews && reviews.length > 2 && (
                            <Button
                                variant="secondary"
                                className="px-3 py-1 rounded-full font-semibold transition hover:cursor-pointer bg-muted hover:bg-primary hover:text-white"
                            >
                                <ArrowDownIcon className="w-4 h-4"/>
                                Mostrar más
                            </Button>
                        )}
                    </div>
                </div>
            </section>

        </main>
    );
}


