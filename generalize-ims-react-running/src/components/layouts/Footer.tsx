import { appConfig } from "@/config/app";
import { ModeToggle } from "../mode-toggle";

export function Footer() {
    return (
        <footer className="flex flex-col items-center justify-between gap-4 min-h-[1rem] md:h-20 py-2 md:flex-row ">
            <p className="text-center text-1xl leading-loose text-muted-foreground md:text-left font-bold">©2024 Central Manufacturing Technology Institute.</p>
            {/* <div className="hidden md:block">
                <ModeToggle />
            </div> */}
        </footer>
    )
} 