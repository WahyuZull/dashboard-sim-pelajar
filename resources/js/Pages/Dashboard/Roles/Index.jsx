import React from "react";
import DataTable from "@/Components/molecules/DataTable";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { getAllQueryParams } from "@/utils";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { HiBellAlert, HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import { toast } from "sonner";

export default function IndexRoles() {
    const page = usePage().props;

    const queryParams = getAllQueryParams();

    const { data, ...pagination } = page.roles;

    const handleSearch = (search) => {
        router.get(route("dashboard.roles"), {
            ...queryParams,
            search: search,
        });
    };

    const handleDelete = (id) => {
        toast("Delete Role", {
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
                    router.delete(route("dashboard.roles.destroy", id));
                },
            },
            cancel: {
                label: "Batal",
            },
        });
    };

    return (
        <DashboardLayout>
            <Head title={"All Roles"} />
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-bold uppercase mb-2">All Roles</h1>
                    <div className="text-sm breadcrumbs">
                        <ul>
                            <li>
                                <Link href={route("dashboard.index")}>
                                    Dashboard
                                </Link>
                            </li>
                            <li>All Roles</li>
                        </ul>
                    </div>
                </div>
                <div>
                    <Link
                        href={route("dashboard.roles.create")}
                        className="btn btn-primary btn-outline btn-sm"
                    >
                        Add New Role
                    </Link>
                </div>
            </div>

            <DataTable
                title="Browse Roles"
                searchable
                handleSearch={handleSearch}
                columns={[
                    {
                        title: "No",
                        dataIndex: "no",
                        render: (value, index, data) => index + 1,
                    },
                    {
                        title: "Role Name",
                        dataIndex: "display_name",
                        sorter: true,
                    },
                    {
                        title: "Key",
                        dataIndex: "name",
                    },
                    {
                        title: "Action",
                        dataIndex: "action",
                        render: (_, __, record) => {
                            return (
                                <div className="flex space-x-2">
                                    <Link
                                        href={route(
                                            "dashboard.roles.show",
                                            record.id
                                        )}
                                        className="btn btn-sm btn-primary btn-outline"
                                    >
                                        Detail
                                    </Link>
                                    <Link
                                        href={route(
                                            "dashboard.roles.edit",
                                            record.id
                                        )}
                                        className="btn btn-sm btn-primary"
                                    >
                                        <HiOutlinePencilSquare />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(record.id)}
                                        className="btn btn-sm btn-error"
                                    >
                                        <HiOutlineTrash />
                                    </button>
                                </div>
                            );
                        },
                    },
                ]}
                dataSource={data}
                pagination={pagination}
                handleSorterColumns={(column, direction) => {
                    router.get(route("dashboard.roles"), {
                        ...queryParams,
                        sortField: column,
                        sortDirection: direction ? direction : "asc",
                    });
                }}
            />
        </DashboardLayout>
    );
}
