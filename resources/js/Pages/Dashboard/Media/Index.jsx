import DataTable from "@/Components/molecules/DataTable";
import MediaLibrary from "@/Components/organisms/MediaLibrary";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { getMediaUrl } from "@/utils";
import { Head, Link, router, usePage } from "@inertiajs/react";
import React from "react";
import { HiBellAlert, HiOutlineTrash } from "react-icons/hi2";
import { toast } from "sonner";

export default function Index() {
    const page = usePage().props;

    const { data, ...pagination } = page.medias;

    const handleDelete = (id) => {
        toast("Delete Media", {
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
                    router.delete(route("dashboard.media.destroy", id));
                },
            },
            cancel: {
                label: "Batal",
            },
        });
    };

    return (
        <DashboardLayout>
            <Head title="Sertifikat" />

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-bold uppercase mb-2">
                        Semua Sertifikat
                    </h1>
                    <div className="text-sm breadcrumbs">
                        <ul>
                            <li>
                                <Link href={route("dashboard.index")}>
                                    Dashboard
                                </Link>
                            </li>
                            <li>Semua Sertifikat</li>
                        </ul>
                    </div>
                </div>
                <div>
                    <button
                        onClick={() =>
                            document
                                .getElementById("media-library-modal")
                                .showModal()
                        }
                        className="btn btn-primary btn-outline btn-sm"
                    >
                        Tambah Sertifikat
                    </button>
                </div>
            </div>
            <DataTable
                title="Data Sertifikat"
                dataSource={data}
                pagination={pagination}
                columns={[
                    {
                        title: "No",
                        dataIndex: "no",
                        render: (_, index) => (
                            <div className="text-center">
                                {pagination.from + index}
                            </div>
                        ),
                    },
                    {
                        title: "Image",
                        dataIndex: "filepath",
                        render: (value) => (
                            <div className="w-[200px] overflow-hidden h-[200px] flex items-center justify-center">
                                <img
                                    src={getMediaUrl(value)}
                                    className="w-[200px]"
                                    alt=""
                                />
                            </div>
                        ),
                    },
                    {
                        title: "Uploaded At",
                        dataIndex: "created_at",
                        render: (value) => new Date(value).toLocaleString(),
                    },
                    {
                        title: "Action",
                        dataIndex: "id",
                        render: (value) => (
                            <div className="flex items-center justify-center">
                                <button
                                    onClick={() => handleDelete(value)}
                                    className="btn btn-error btn-sm"
                                >
                                    <HiOutlineTrash />
                                </button>
                            </div>
                        ),
                    },
                ]}
            />
            <MediaLibrary multiple={true} isInMediaPage={true} />
        </DashboardLayout>
    );
}
