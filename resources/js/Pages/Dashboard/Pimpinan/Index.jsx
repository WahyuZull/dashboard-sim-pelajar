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

export default function IndexPimpinan() {
    const page = usePage().props;
    const queryParams = getAllQueryParams();
    const { data, ...pagination } = page.pimpinans;

    const handleSearch = (search) => {
        router.get(route("dashboard.pimpinans"), {
            ...queryParams,
            search: search,
        });
    };

    const handleDelete = (pimpinan) => {
        toast("Hapus data", {
            description: "Yakin hapus data ini?",
            position: "top-center",
            unstyled: true,
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
                onClick: () => {
                    pimpinan.pimpinan_komisariat_id === null
                        ? router.delete(
                              route("dashboard.pimpinans.destroy", pimpinan?.id)
                          )
                        : router.delete(
                              route(
                                  "dashboard.komisariats.destroy",
                                  pimpinan?.pimpinan_komisariat_id
                              )
                          );
                },
            },
            cancel: {
                label: "Batal",
            },
        });
    };
    return (
        <DashboardLayout>
            <Head title={"Pimpinan"} />

            <PageTitle
                title="Semua Pimpinan"
                links={[
                    {
                        title: "Semua Pimpinan",
                        active: true,
                    },
                ]}
                btnLinks={[
                    {
                        title: "Tambah Pimpinan",
                        link: route("dashboard.pimpinans.create"),
                    },
                    {
                        title: "Tambah Komisariat",
                        link: route("dashboard.komisariats.create"),
                    },
                ]}
            />

            <DataTable
                title="Pimpinan Cabang"
                dataSource={data}
                searchable
                handleSearch={handleSearch}
                columns={[
                    {
                        title: "No",
                        dataIndex: "no",
                        render: (_, index) => index + 1,
                    },
                    {
                        title: "Nama Pimpinan",
                        dataIndex: "nama",
                    },
                    {
                        title: "Aksi",
                        dataIndex: "id",
                        render: (_, __, record) => {
                            return (
                                <div className="flex space-x-2">
                                    <Link
                                        href={
                                            record.pimpinan_komisariat_id ===
                                            null
                                                ? route(
                                                      "dashboard.pimpinans.edit",
                                                      record.id
                                                  )
                                                : route(
                                                      "dashboard.komisariats.edit",
                                                      record.id
                                                  )
                                        }
                                        className="btn btn-sm btn-warning"
                                    >
                                        <HiOutlinePencilSquare />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(record)}
                                        className="btn btn-sm btn-error"
                                    >
                                        <HiOutlineTrash />
                                    </button>
                                </div>
                            );
                        },
                    },
                ]}
                pagination={pagination}
            />
        </DashboardLayout>
    );
}
