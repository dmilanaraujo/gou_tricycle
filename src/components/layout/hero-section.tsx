import {ServiceSearch} from "@/components/search/service-search";

const HeroSection = () => {
    return (
        <section className='pt-8 flex max-w-4xl flex-col items-center gap-6 self-center text-center pb-8 sm:pb-6'>
            <h1 className='text-3xl leading-[1.29167] font-semibold text-balance sm:text-4xl lg:text-5xl'>
                ¿Qué necesitas hoy?
            </h1>
            <p className='text-muted-foreground mx-auto max-w-2xl text-xl'>
                Le hacemos mas simple la vida y lo conectamos con proveedores de servicios y productos en Cuba.
            </p>
            <div className='w-full flex items-center'>
                <ServiceSearch/>
            </div>
        </section>
    )
}

export default HeroSection
