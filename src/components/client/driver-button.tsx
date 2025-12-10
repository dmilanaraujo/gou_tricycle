
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function DriverButton() {
    return (
        <Button asChild>
            <Link href='/me'>
                Eres chofer?
            </Link>
        </Button>
    );
}
