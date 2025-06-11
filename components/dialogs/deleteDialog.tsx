"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { deleteEvent } from "@/app/(protected)/event/action" // server action if you have one

export default function DeleteModalButton({ eventId }: { eventId: string }) {
    const [open, setOpen] = useState(false)

    return (
        <>
            <Button variant="destructive" onClick={() => setOpen(true)}>
                Delete
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Delete</DialogTitle>
                    </DialogHeader>
                    <p>Are you sure you want to delete this event? This action cannot be undone.</p>

                    <DialogFooter className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <form action={() => deleteEvent(eventId)}>
                            <Button type="submit" variant="destructive">
                                Confirm Delete
                            </Button>
                        </form>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
