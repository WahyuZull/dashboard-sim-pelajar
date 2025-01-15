import DataTable from "@/Components/molecules/DataTable";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { roleColorMapper } from "@/constants";
import { formatDate, getAllQueryParams } from "@/utils";
import { Head, Link, router, usePage } from "@inertiajs/react";
import React from "react";
import { HiBellAlert, HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import { toast } from "sonner";

export default function IndexUser() {
    const page = usePage().props;

    const queryParams = getAllQueryParams();

    const { data, ...pagination } = page.users;

    const handleSearch = (search) => {
        router.get(route("dashboard.users"), {
            ...queryParams,
            search: search,
        });
    };

    const handleDelete = (id) => {
        toast("Delete User", {
            description: "Yakin hapus data ini?",
            position: "top-center",
            unstyled: true,
            expand: true,
            classNames: {
                toast: "p-4 bg-white shadow-lg rounded-lg flex flex-col space-y-4 w-full",
                title: "text-error font-bold text-lg",
                description: "text-base",
                actionButton: "btn btn-error btn-sm justify-end",
                cancelButton: "btn btn-ghost text-error",
            },
            icon: <HiBellAlert size={30} className="text-red-500" />,
            action: {
                label: "Delete",
                onClick: () => {
                    router.delete(route("dashboard.users.destroy", id));
                },
            },
            cancel: {
                label: "Batal",
            },
        });
    };

    return (
        <DashboardLayout>
            <Head title={"Users"} />
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-bold uppercase mb-2">All Users</h1>
                    <div className="text-sm breadcrumbs">
                        <ul>
                            <li>
                                <Link href={route("dashboard.index")}>
                                    Dashboard
                                </Link>
                            </li>
                            <li>All Users</li>
                        </ul>
                    </div>
                </div>
                <div>
                    <Link href={route("dashboard.users.create")}>
                        <button className="btn btn-primary btn-outline btn-sm">
                            Add New User
                        </button>
                    </Link>
                </div>
            </div>

            <DataTable
                title="Browse Users"
                searchable
                handleSearch={handleSearch}
                columns={[
                    {
                        title: "No",
                        dataIndex: "no",
                        render: (value, index, data) => index + 1,
                    },
                    {
                        title: "Name",
                        dataIndex: "name",
                        sorter: true,
                    },
                    {
                        title: "Email",
                        dataIndex: "email",
                    },
                    {
                        title: "Roles",
                        dataIndex: "roles",
                        render: (_, __, data) => (
                            <div className="flex space-x-2">
                                {data.roles.map((role) => (
                                    <span
                                        key={role.id}
                                        className={`badge badge-custom text-center ${
                                            roleColorMapper[role.display_name]
                                        }`}
                                    >
                                        {role.display_name}
                                    </span>
                                ))}
                            </div>
                        ),
                    },
                    {
                        title: "Joined Date",
                        dataIndex: "created_at",
                        render: (value) => formatDate(value),
                    },
                    {
                        title: "Action",
                        dataIndex: "action",
                        render: (_, __, record) => (
                            <div className="flex space-x-2">
                                <Link
                                    href={route(
                                        "dashboard.users.edit",
                                        record.id
                                    )}
                                >
                                    <button className="btn btn-sm btn-primary">
                                        <HiOutlinePencilSquare />
                                    </button>
                                </Link>
                                <button
                                    onClick={() => handleDelete(record.id)}
                                    className="btn btn-sm btn-error"
                                >
                                    <HiOutlineTrash />
                                </button>
                            </div>
                        ),
                    },
                ]}
                dataSource={data}
                pagination={pagination}
            />
        </DashboardLayout>
    );
}
