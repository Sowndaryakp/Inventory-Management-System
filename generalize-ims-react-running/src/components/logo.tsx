import { appConfig } from "@/config/app";
import { Icons } from "./icons";

export function Logo() {
    return (
        <>
            {/* <Icons.logo className="h-6 w-6" /> */}
            <img src="../src/assets/images/cmti.png" className="h-14 w-24"></img>
            <span className="font-bold">{appConfig.name}</span>
        </>
    )
}