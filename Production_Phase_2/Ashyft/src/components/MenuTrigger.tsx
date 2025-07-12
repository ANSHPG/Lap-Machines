import React from 'react'
import Client from '../assets/Profiles/1711663959396.jpg'
import '../index.css'

import {
    ContextMenu,
    ContextMenuCheckboxItem,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuLabel,
    ContextMenuRadioGroup,
    ContextMenuRadioItem,
    ContextMenuSeparator,
    ContextMenuShortcut,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"

export default function MenuTrigger() {
    return (
        <ContextMenu>
            <ContextMenuTrigger className="flex items-center justify-center rounded-md border border-dashed text-sm">
                <img src={Client} alt="client" id='nav-client-profile' />
            </ContextMenuTrigger>
            <ContextMenuContent className="w-52 bg-[#262626] text-white border-[#3b3c3c]">
                <ContextMenuItem inset disabled className='flex justify-between pr-[20px]  rounded-md  hover:bg-[#404040] hover:text-white cursor-pointer' >
                    <p id='sub-menu-label'>Back</p>
                    <ContextMenuShortcut>⌘[</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem inset className='flex justify-between pr-[20px]  rounded-md  hover:bg-[#404040] hover:text-white cursor-pointer' >
                    <p id='sub-menu-label'>Forward</p>
                    <ContextMenuShortcut>⌘]</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem inset className='flex justify-between pr-[20px]  rounded-md  hover:bg-[#404040] hover:text-white cursor-pointer' >
                    <p id='sub-menu-label'>Reload</p>
                    <ContextMenuShortcut>⌘R</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuSub>
                    <ContextMenuSubTrigger inset className='flex justify-between pr-[20px] items-center rounded-md  hover:bg-[#404040] hover:text-white cursor-pointer' ><p id='sub-menu-label'>Canvas</p> </ContextMenuSubTrigger>
                    <ContextMenuSubContent className="w-44 bg-[#262626] text-white border-[#3b3c3c]">
                        <ContextMenuCheckboxItem checked className="rounded-md  hover:bg-[#404040] hover:text-white cursor-pointer"><p id='sub-menu-label'>Home</p> </ContextMenuCheckboxItem>
                        <ContextMenuItem className="px-2 py-1.5 rounded-md  hover:bg-[#404040] hover:text-white cursor-pointer"><p id='sub-menu-label'>Upload</p></ContextMenuItem>
                        <ContextMenuItem className="px-2 py-1.5 rounded-md  hover:bg-[#404040] hover:text-white cursor-pointer"><p id='sub-menu-label'>Download</p></ContextMenuItem>
                        <ContextMenuSeparator />
                        <ContextMenuItem className="px-2 py-1.5 rounded-md  hover:bg-[#e2ad5c]/40 hover:text-white cursor-pointer"><p id='sub-menu-label' className='server font-bold'>Server</p></ContextMenuItem>
                        <ContextMenuSeparator />
                        <ContextMenuItem variant="destructive" className='flex justify-between pr-[20px]  rounded-md  hover:bg-[#404040] hover:text-white cursor-pointer hidden' >Delete</ContextMenuItem>
                    </ContextMenuSubContent>
                </ContextMenuSub>
                <ContextMenuSeparator />

                <ContextMenuSeparator />
                <ContextMenuRadioGroup value="pedro">
                    <ContextMenuRadioItem value="pedro" >
                        <p id='sub-menu-label'>Profile</p>
                    </ContextMenuRadioItem>
                </ContextMenuRadioGroup>
                <ContextMenuSeparator />
                <ContextMenuItem inset variant="destructive" className='flex justify-between pr-[20px]  rounded-md  hover:bg-[#513233]  cursor-pointer text-[#f16063] font-bold' >
                    <p id='sub-menu-label' className='logout'>Logout</p>
                    <ContextMenuShortcut>⌘L</ContextMenuShortcut>
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    )
}
