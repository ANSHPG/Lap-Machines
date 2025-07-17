// src/Sections/DataTable.tsx

"use client"

import * as React from "react"
import type {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
} from "@tanstack/react-table"
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import axios from "axios"
import { ArrowUpDown, ChevronDown, MoreHorizontal, Trash2, Eye, Download } from "lucide-react"
import { Button } from "../components/ui/button"
import { Checkbox } from "../components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import { Input } from "../components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../components/ui/table"

import clsx from "clsx";
import { Badge } from "../components/ui/badge";
import sunIcon from '../assets/imgs/sunIcon.svg'
import nightIcon from '../assets/imgs/nightIcon.svg'

export type FileRow = {
    id: string
    name: string
    type: string
    size: number
    location: string
    uploaded_at: string
}

export default function DataTableDemo() {
    const [data, setData] = React.useState<FileRow[]>([])
    // const [selectedIds, setSelectedIds] = React.useState<string[]>([])
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const fetchFiles = async () => {
        try {
            const baseURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080"
            const res = await axios.get<FileRow[]>(`${baseURL}/files`)
            setData(res.data || [])
        } catch (error) {
            console.error("Error fetching files:", error)
            setData([])
        }
    }


    React.useEffect(() => {
        fetchFiles()
    }, [])

    // Helper function to format file size
    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes'
        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }

    // Helper function to check if file is previewable
    const isPreviewable = (type: string): boolean => {
        return type.startsWith("image/") || type === "application/pdf"
    }

    // Helper function to download file
    const downloadFile = (fileName: string) => {
        const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080'
        const link = document.createElement('a')
        link.href = `${backendURL}/download?file=${encodeURIComponent(fileName)}`
        link.download = fileName
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }


    // Helper function to safely parse date
    // const parseDate = (dateString: string): Date | null => {
    //     if (!dateString) return null

    //     // Try parsing as ISO string first
    //     let date = new Date(dateString)

    //     // If invalid, try parsing as timestamp
    //     if (isNaN(date.getTime())) {
    //         const timestamp = parseInt(dateString)
    //         if (!isNaN(timestamp)) {
    //             date = new Date(timestamp)
    //         }
    //     }

    //     return isNaN(date.getTime()) ? null : date
    // }

    const columns: ColumnDef<FileRow>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value: boolean) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                    className="bg-[#151515] border-2 border-[#373737]"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                    className="bg-[#151515] border-2 border-[#373737] data-[state=checked]:text-black data-[state=checked]:bg-[#e5e5e5] data-[state=checked]:border-[#e5e5e5]"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "name",
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Name <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => (
                <div className="max-w-[190px] truncate text-ellipsis text-start overflow-hidden">
                    {row.getValue("name")}
                </div>
            ),
        },
        {
            accessorKey: "type",
            header: "Type",
            cell: ({ row }) => {
                const types = (row.getValue("type") as string).split("/") // handle multiple types

                const getClassByType = (type: string) => {
                    if (type.includes("pdf")) return "bg-[#2f0001] text-[#d4a4a4] border-2 border-[#340b10]"
                    if (type.includes("image")) return "bg-[#122600] text-[#c2de89] border-2 border-[#21321a]"
                    if (type.includes("text")) return "bg-green-500 text-white"
                    if (type.includes("application")) return "bg-[#221301] text-[#c9b08f] border-2 border-[#3c2f1d]"
                    if (type.includes("png")) return "bg-[#180854] text-[#beb4f3] border-2 border-[#283252]"
                    if (type.includes("jpeg")) return "bg-[#180854] text-[#beb4f3] border-2 border-[#283252]"

                    return "bg-black text-[#e04c65] border-[#373737] border-2"
                }

                return (
                    <div className="flex flex-wrap  gap-1 max-h-[80px] overflow-auto">
                        {types.map((type: string) => (
                            <Badge key={type} className={clsx("capitalize", getClassByType(type))}>
                                {type}
                            </Badge>
                        ))}
                    </div>
                )
            },

        },
        {
            accessorKey: "size",
            header: "Size",
            cell: ({ row }) => formatFileSize(row.getValue("size")),
        },
        {
            accessorKey: "uploaded_at",
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Date <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => {
                const rawDate = row.getValue("uploaded_at") as string;
                const utcDate = new Date(rawDate);
                if (isNaN(utcDate.getTime())) return "Invalid Date";

                // Apply IST offset (+5:30)
                const istOffsetMinutes = 330;
                const istDate = new Date(utcDate.getTime() + istOffsetMinutes * 60 * 1000);

                return istDate.toLocaleDateString("en-IN", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                });
            },
        },
        {
            id: "time",
            accessorKey: "uploaded_at",
            header: "Time",
            cell: ({ row }) => {
                const rawDate = row.getValue("uploaded_at") as string;
                const utcDate = new Date(rawDate);
                if (isNaN(utcDate.getTime())) return "Invalid Time";

                const istOffsetMinutes = 390 + 720;
                const istDate = new Date(utcDate.getTime() + istOffsetMinutes * 60 * 1000);

                const hours = istDate.getHours();
                const isAM = hours < 12;

                const formattedTime = istDate.toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                })
                    .replace(/(AM|PM)/i, "") // remove AM/PM
                    .trim();

                return (
                    <div className="flex items-center gap-2">
                        <img
                            src={isAM ? sunIcon : nightIcon}
                            alt={isAM ? "AM" : "PM"}
                            className="w-4 h-4"
                            title={isAM ? "Morning" : "Evening"}
                        />
                        <span>{formattedTime}</span>
                    </div>
                );
            },
        },


        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const file = row.original as FileRow
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild className="bg-transparent text-[#d4d4d4] hover:bg-[#3d3d3d]">
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-[#262626] text-[#fafaee] border-1 border-[#3b3c3c] font-[500] font-[Tilium] p-0 flex flex-col gap-0">
                            {isPreviewable(file.type) && (
                                <DropdownMenuItem
                                    onClick={() => {
                                        const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";
                                        window.open(`${backendURL}/download?file=${encodeURIComponent(file.name)}`, "_blank");
                                    }}

                                    className="hover:bg-[#404040] dropMenuItem"
                                >
                                    <Eye className="mr-2 h-4 w-4 " /> Preview
                                </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator className="h-[1px] bg-[#4b4b4b] my-3" />
                            <DropdownMenuItem onClick={() => downloadFile(file.name)} className="hover:bg-[#404040] dropMenuItem">
                                <Download className="mr-2 h-4 w-4" /> Download
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={async () => {
                                    try {
                                        const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080"
                                        await axios.post(`${backendURL}/delete`, { ids: [file.id] })
                                        fetchFiles()
                                    } catch (error) {
                                        console.error("Error deleting file:", error)
                                    }
                                }}

                                className="hover:bg-[#404040] dropMenuItem"
                            >
                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        initialState: {
            pagination: {
                pageSize: 5, // Set page size to 5
            },
        },
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    const handleBatchDelete = async () => {
        const ids = table.getFilteredSelectedRowModel().rows.map(row => row.original.id)
        if (ids.length === 0) return

        try {
            const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080"
            await axios.post(`${backendURL}/delete`, { ids })
            setRowSelection({})
            fetchFiles()
        } catch (error) {
            console.error("Error batch deleting files:", error)
        }

    }

    const handleBatchDownload = () => {
        const files = table.getFilteredSelectedRowModel().rows.map(row => row.original)
        if (files.length === 0) return

        files.forEach((file, index) => {
            setTimeout(() => {
                downloadFile(file.name)
            }, index * 100)
        })
    }

    return (
        <div id="dataTable" className="w-full text-gray-500 bg-transparent" style={{
            scrollbarWidth: "none",         // Firefox
            msOverflowStyle: "none",        // IE 10+
        }}>
            <div className="flex items-center py-4 gap-2 w-full justify-between" >
                <Input
                    placeholder="Search file name..."
                    value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                    onChange={(e) => table.getColumn("name")?.setFilterValue(e.target.value)}
                    className="max-w-sm bg-[#151515] text-[#a1a1a1] font-[Tilium] font-[600] tracking-wide border-[#373737] border-2"
                />
                <div className="flex flex-row gap-2">
                    <Button
                        variant="outline"
                        onClick={handleBatchDownload}
                        disabled={table.getFilteredSelectedRowModel().rows.length === 0}
                        className="bg-[#212121] text-[#d4d4d4] border-2 border-gray-500 "
                    >
                        Download Selected ({table.getFilteredSelectedRowModel().rows.length})
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleBatchDelete}
                        disabled={table.getFilteredSelectedRowModel().rows.length === 0}
                        className="bg-[#212121] text-[#d4d4d4] border-2 border-gray-500 cursor-pointer"
                    >
                        Delete Selected ({table.getFilteredSelectedRowModel().rows.length})
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild className="bg-[#151515] text-[#d4d4d4] border-2 border-[#373737] cursor-pointer">
                            <Button variant="outline" className="ml-auto">
                                Columns <ChevronDown className="ml-2 h-4 w-4 " />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-[#262626] boreder-1 border-[#373737]">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize text-[#fafafa] font-[Tilium] hover:bg-[#404040] cursor-pointer"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) =>
                                                column.toggleVisibility(!!value)
                                            }
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    )
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div className="rounded-md border-2 border-[#222323] overflow-hidden bg-[#0a0a0a] text-[#fafafa] font-[Tilium]">
                <div className="overflow-x-auto overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] text-[#222323]">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}
                                    className="">
                                    {headerGroup.headers.map((header) => (
                                        <TableHead key={header.id} className="text-[#fafafa] bg-trasparent pl-2">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                        // className={row.getIsSelected() ? "bg-[#262626]" : ""}
                                        className={clsx({ "bg-[#262626]": row.getIsSelected() })}
                                        id="tableRow"
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id} className="border-0 text-[#d4d4d4] ">
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow className="">
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
            <div className="flex items-center flex-row justify-between  w-full py-4">
                <div className="text-muted-foreground  text-sm " id="rowsSelected">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2 flex flex-row justify-between gap-2 ">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="bg-[#151515] text-[#a1a1a1] font-[Formula1] text-[12px] font-[600] tracking-wide border-[#373737] border-2"
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="bg-[#151515] text-[#a1a1a1] font-[Formula1] text-[12px] font-[600] tracking-wide border-[#373737] border-2"
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}