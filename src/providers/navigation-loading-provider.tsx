"use client"

import {createContext, useContext, useEffect, useState, useTransition} from 'react'
import {usePathname, useRouter} from 'next/navigation';

type NavigationLoadingContextType = {
    isNavigating: boolean
    setIsNavigating: (value: boolean) => void
}

const NavigationLoadingContext = createContext<NavigationLoadingContextType>({
    isNavigating: false,
    setIsNavigating: () => {},
})

export function NavigationLoadingProvider({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const [isNavigating, setIsNavigating] = useState(false)

    useEffect(() => {
        setIsNavigating(false)
    }, [pathname])

    return (
        <NavigationLoadingContext.Provider value={{ isNavigating, setIsNavigating }}>
            {children}
        </NavigationLoadingContext.Provider>
    )
}

export function useNavigationLoading() {
    return useContext(NavigationLoadingContext)
}

export const useLoadingRouter = () => {
    const router = useRouter();
    const [isPendingTransition, startTransition] = useTransition();
    const { setIsNavigating } = useNavigationLoading();
    
    const push = (url: string, hideTimeout: number = 0) => {
        setIsNavigating(true);
        startTransition(() => {
            router.push(url);
            if (hideTimeout > 0) {
                setTimeout(() => setIsNavigating(false), hideTimeout);
            }
        });
    };
    
    return { ...router, push, isPendingTransition };
};
