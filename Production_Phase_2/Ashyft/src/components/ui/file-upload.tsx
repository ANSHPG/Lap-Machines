import { useRef, useState } from "react"
import { cn } from "@/lib/utils"

export function FileUpload() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [files, setFiles] = useState<File[]>([])

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
    }
  }

  return (
    <div
      className={cn(
        "w-full border-2 border-dashed border-gray-400 rounded-lg p-6 text-center cursor-pointer hover:border-amber-600 transition",
        files.length > 0 && "bg-gray-50"
      )}
      onClick={() => inputRef.current?.click()}
    >
      <input
        type="file"
        multiple
        ref={inputRef}
        onChange={handleFiles}
        className="hidden"
      />
      <p className="text-gray-500">Click or drag files here to upload</p>
      {files.length > 0 && (
        <ul className="mt-4 text-sm text-left text-gray-700">
          {files.map((file) => (
            <li key={file.name}>{file.name}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
  