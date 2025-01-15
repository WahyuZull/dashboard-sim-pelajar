import PageTitle from "@/Components/atoms/PageTitle";
import DataTable from "@/Components/molecules/DataTable";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { getAllQueryParams } from "@/utils";
import { Head, Link, router, usePage } from "@inertiajs/react";
import {
    HiBellAlert,
    HiOutlinePencilSquare,
    HiOutlineTrash,
} from "react-icons/hi2";
import { toast } from "sonner";

export default function IndexPelatihans() {
    const page = usePage().props;
    const queryParams = getAllQueryParams();
    const { data, ...pagination } = page.pelatihans;

    const handleSearch = (search) => {
        router.get(route("dashboard.pelatihans"), {
            ...queryParams,
            search: search,
        });
    };

    const handleDelete = (id) => {
        toast("Hapus data", {
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
            icon: <HiBellAlert size={24} className="text-error" />,
            action: {
                label: "Hapus",
                onClick: () =>
                    router.delete(route("dashboard.pelatihans.destroy", id)),
            },
            cancel: {
                label: "Batal",
            },
        });
    };

    return (
        <DashboardLayout>
            <Head title={"Pelatihan"} />

            <PageTitle
                title={"Pelatihan"}
                links={[
                    {
                        title: "Semua Pelatihan",
                        href: route("dashboard.pelatihans"),
                        active: true,
                    },
                ]}
                btnLink={route("dashboard.pelatihans.create")}
                btnTitle="Tambah Pelatihan"
            />

            <DataTable
                title="Data Pelatihan"
                dataSource={data}
                searchable
                pagination={pagination}
                handleSearch={handleSearch}
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
                        title: "Sertifikat",
                        dataIndex: "sertifikat",
                        render: (value) => (
                            <div className="grid grid-cols-2 gap-2">
                                {value.map((item, index) => (
                                    <div key={index} className="w-20 h-20">
                                        <img
                                            src={item}
                                            alt="sertifikat"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        ),
                    },
                    {
                        title: "Nama Pelatihan",
                        dataIndex: "nama",
                        render: (value) => value,
                    },
                    {
                        title: "Aksi",
                        dataIndex: "id",
                        render: (value) => (
                            <div className="flex space-x-2">
                                <Link
                                    href={route(
                                        "dashboard.pelatihans.edit",
                                        value
                                    )}
                                    className="btn btn-warning btn-sm"
                                >
                                    {" "}
                                    <HiOutlinePencilSquare />
                                </Link>
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
        </DashboardLayout>
    );
}
