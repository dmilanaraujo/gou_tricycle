import {Logo} from "@/components/client/brand";
import {UserButton} from "@/components/auth/user-button";

export default function NavBar() {
    return (
        <header className="w-full bg-card/80 backdrop-blur-sm sticky top-0 z-10 border-b">
            <div className="container mx-auto px-4 py-3">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                      <span className="flex justify-between w-full md:w-auto">
                        <Logo/>
                        <span className="md:hidden">
                           <UserButton/>
                        </span>
                      </span>
                      <div className="gap-2 w-full sm:w-auto items-center flex-col md:flex-row hidden md:block">
                        <UserButton/>
                      </div>
                </div>
            </div>
        </header>
    );
}
