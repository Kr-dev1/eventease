"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { CopyIcon, CheckIcon, QrCodeIcon } from "lucide-react"

export default function CopyRsvpUrl({ url }: { url: string }) {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(url)
            setCopied(true)
            toast.success("RSVP URL copied to clipboard!")
            setTimeout(() => setCopied(false), 1500)
        } catch (err) {
            toast.error("Failed to copy URL.")
        }
    }

    return (
        <div className="space-y-3">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
                <Input
                    value={url}
                    readOnly
                    className="w-full md:w-[400px] font-mono"
                />
                <Button onClick={handleCopy} variant="outline" className="flex gap-2">
                    {copied ? <CheckIcon className="w-4 h-4 text-green-500" /> : <CopyIcon className="w-4 h-4" />}
                    {copied ? "Copied" : "Copy"}
                </Button>
            </div>
        </div>
    )
}
