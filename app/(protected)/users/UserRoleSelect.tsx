"use client";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

export const roles = ["ADMIN", "STAFF", "OWNER", "USER"];

export default function UserRoleSelect({ value, onChange, loading }: { value: string; onChange: (role: string) => void; loading: boolean }) {
    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent >
                {roles.map((role) => (
                    <SelectItem disabled={loading} key={role} value={role}>
                        {role}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
