"use client"

import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import UserRoleSelect, { roles } from "./UserRoleSelect";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

type User = {
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
};

const getUsers = async () => {
    const response = await axios.get('/api/users')
    if (response.data.success === false) {
        toast.error('Failed to get users')
    }
    return response.data
}
export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [updating, setUpdating] = useState<string | null>(null);

    useEffect(() => {
        axios.get("/api/users")
            .then((res) => {
                const data = res.data;
                if (data.success) setUsers(data.users);
                else setError(data.message || "Failed to fetch users");
            })
            .catch(() => setError("Failed to fetch users"))
            .finally(() => setLoading(false));
    }, []);



    const handleRoleChange = async (id: string, role: string) => {
        setLoading(true)
        setUpdating(id)
        try {
            const res = await axios.patch("/api/users", {
                id,
                role,
                lastUpdated: Date.now(),
            });
            const data = res.data;
            if (data.success) {
                setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role } : u)));
            } else {
                setError(data.message || "Failed to update role");
            }
        } catch {
            setError("Failed to update role");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-6 relative">
            {loading && (
                <div className="absolute inset-0 flex justify-center items-center z-50 h-screen">
                    <Loader2 className="animate-spin w-8 h-8 text-gray-600" />
                </div>

            )}
            {error && <div className="text-red-500">{error}</div>}
            {!loading && (
                <>
                    <h1 className="text-2xl font-bold mb-6">User Management</h1>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Created</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <UserRoleSelect
                                            value={user.role}
                                            onChange={(role) => handleRoleChange(user.id, role)}
                                            loading={loading}
                                        />
                                    </TableCell>
                                    <TableCell>{new Date(user.createdAt).toLocaleString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </>
            )}
        </div>
    );
}