import Image from "next/image";

interface Props {
    title: string;
    image: string;
}

export function ServiceCard({ title, image }: Props) {
    return (
        <div className="relative min-w-[280px] h-[200px] rounded-2xl overflow-hidden cursor-pointer group">
            <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/35" />

            {/* Text */}
            <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white font-semibold text-base leading-snug">
                    {title}
                </h3>
            </div>
        </div>
    );
}
