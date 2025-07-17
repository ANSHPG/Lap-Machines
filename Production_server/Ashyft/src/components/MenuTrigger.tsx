import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Client from '../assets/Profiles/1711663959396.jpg'
import '../index.css'

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
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
  const navigate = useNavigate()
  const location = useLocation()
  const { logout } = useAuth()

  const [canGoBack, setCanGoBack] = useState(false)

  useEffect(() => {
    setCanGoBack(window.history.length > 1)
  }, [location])

  const handleBack = () => {
    if (canGoBack) navigate(-1)
  }

  const handleForward = () => {
    navigate(1) // Note: Forward won't work reliably unless user has gone back before
  }

  const handleReload = () => {
    window.location.reload()
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  // Left click to simulate right-click context menu
  const handleLeftClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const trigger = e.currentTarget
    const event = new MouseEvent("contextmenu", {
      bubbles: true,
      cancelable: true,
      view: window,
      clientX: e.clientX,
      clientY: e.clientY,
    })
    trigger.dispatchEvent(event)
  }

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) {
        switch (e.key) {
          case '[':
            e.preventDefault()
            handleBack()
            break
          case ']':
            e.preventDefault()
            handleForward()
            break
          case 'r':
          case 'R':
            e.preventDefault()
            handleReload()
            break
          case 'l':
          case 'L':
            e.preventDefault()
            handleLogout()
            break
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [canGoBack])

  return (
    <ContextMenu>
      <ContextMenuTrigger
        className="flex items-center justify-center rounded-md border border-dashed text-sm"
        onClick={handleLeftClick}
      >
        <img src={Client} alt="client" id='nav-client-profile' />
      </ContextMenuTrigger>

      <ContextMenuContent className="w-52 bg-[#262626] text-white border-[#3b3c3c]">
        <ContextMenuItem
          inset
          disabled={!canGoBack}
          className='flex justify-between pr-[20px] rounded-md hover:bg-[#404040] hover:text-white cursor-pointer'
          onClick={handleBack}
        >
          <p id='sub-menu-label'>Back</p>
          <ContextMenuShortcut>⌘[</ContextMenuShortcut>
        </ContextMenuItem>

        <ContextMenuItem
          inset
          className='flex justify-between pr-[20px] rounded-md hover:bg-[#404040] hover:text-white cursor-pointer'
          onClick={handleForward}
        >
          <p id='sub-menu-label'>Forward</p>
          <ContextMenuShortcut>⌘]</ContextMenuShortcut>
        </ContextMenuItem>

        <ContextMenuItem
          inset
          className='flex justify-between pr-[20px] rounded-md hover:bg-[#404040] hover:text-white cursor-pointer'
          onClick={handleReload}
        >
          <p id='sub-menu-label'>Reload</p>
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>

        <ContextMenuSub>
          <ContextMenuSubTrigger
            inset
            className='flex justify-between pr-[20px] items-center rounded-md hover:bg-[#404040] hover:text-white cursor-pointer'
          >
            <p id='sub-menu-label'>Canvas</p>
          </ContextMenuSubTrigger>

          <ContextMenuSubContent className="w-44 bg-[#262626] text-white border-[#3b3c3c]">
            <ContextMenuItem className="px-2 py-1.5 rounded-md hover:bg-[#404040] hover:text-white cursor-pointer">
              <Link to='/foundation/'><p id='sub-menu-label'>Home</p></Link>
            </ContextMenuItem>

            <ContextMenuItem className="px-2 py-1.5 rounded-md hover:bg-[#404040] hover:text-white cursor-pointer">
              <Link to='/foundation/upload'><p id='sub-menu-label'>Upload</p></Link>
            </ContextMenuItem>

            <ContextMenuItem className="px-2 py-1.5 rounded-md hover:bg-[#404040] hover:text-white cursor-pointer">
              <Link to='/foundation/download'><p id='sub-menu-label'>Download</p></Link>
            </ContextMenuItem>

            <ContextMenuSeparator />

            <ContextMenuItem className="px-2 py-1.5 rounded-md hover:bg-[#e2ad5c]/40 hover:text-white cursor-pointer">
              <p id='sub-menu-label' className='server font-bold'>Server</p>
            </ContextMenuItem>

            <ContextMenuSeparator />
          </ContextMenuSubContent>
        </ContextMenuSub>

        <ContextMenuSeparator />

        <ContextMenuRadioGroup value="pedro">
          <ContextMenuRadioItem value="pedro">
            <p id='sub-menu-label'>Profile</p>
          </ContextMenuRadioItem>
        </ContextMenuRadioGroup>

        <ContextMenuSeparator />

        <ContextMenuItem
          inset
          variant="destructive"
          className='flex justify-between pr-[20px] rounded-md hover:bg-[#513233] cursor-pointer text-[#f16063] font-bold'
          onClick={handleLogout}
        >
          <p id='sub-menu-label' className='logout'>Logout</p>
          <ContextMenuShortcut>⌘L</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
