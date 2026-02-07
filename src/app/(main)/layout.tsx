import '../globals.css';
import NavBar from "@/components/layout/nav-bar";
import {NavMobileBottom} from '@/components/layout/nav-mobile-bottom';
import FooterSection from "@/components/layout/footer-section";

export default async function Layout({ children }: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <NavBar/>
            {children}
            <NavMobileBottom/>
            <FooterSection />
        </div>
    );
}
