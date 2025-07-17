import {
    Menubar,
    // MenubarContent,
    // MenubarItem,
    MenubarMenu,
    // MenubarSeparator,
    MenubarTrigger,
} from "@/components/ui/menubar"

import Sides from '../components/Sides';
import Home from '../assets/Sides/home.svg';
import Upoad from '../assets/Sides/upload.svg';
import Download from '../assets/Sides/download.svg';

export default function MenubarDemo() {
    return (
        <Menubar className="flex flex-col justify-between gap-[3vw] h-full border-amber-300 border-0">
            <MenubarMenu>
                <MenubarTrigger>
                    <Sides location={Home} label="home" state="true"/>
                </MenubarTrigger>
            </MenubarMenu>

            <MenubarMenu>
                <MenubarTrigger>
                    <Sides location={Upoad} label="upload" state="true"/>
                </MenubarTrigger>
            </MenubarMenu>

            <MenubarMenu>
                <MenubarTrigger>
                    <Sides location={Download} label="download" state="true"/>
                </MenubarTrigger>
            </MenubarMenu>
        </Menubar>
    )
}
