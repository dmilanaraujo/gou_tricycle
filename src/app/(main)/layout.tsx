import '../globals.css';
import NavBar from "@/components/layout/nav-bar";
import {NavMobileBottom} from '@/components/layout/nav-mobile-bottom';

export default async function Layout({ children }: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <NavBar/>
            {children}
            <NavMobileBottom/>
        </div>
    );
}
