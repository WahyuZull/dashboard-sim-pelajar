import FormSelect from "@/Components/atoms/FormSelect";
import PageTitle from "@/Components/atoms/PageTitle";
import DataTable from "@/Components/molecules/DataTable";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { getAllQueryParams } from "@/utils";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import {
    HiBellAlert,
    HiOutlineInformationCircle,
    HiOutlinePencilSquare,
    HiOutlineTrash,
} from "react-icons/hi2";
import { toast } from "sonner";

export default function IndexAnggotas({ auth }) {
    const page = usePage().props;
    const queryParams = getAllQueryParams();
    const { data, ...pagination } = page.anggotas;

    const canAccess = (...roles) => roles.includes(auth?.user?.roles[0]?.name);

    const handleSearch = (search) => {
        router.get(route("dashboard.anggota"), {
            ...queryParams,
            search: search,
        });
    };

    const handleFilterJenis = (e) => {
        router.get(route("dashboard.anggota"), {
            ...queryParams,
            jenis_anggota: e.target.value,
        });
    };

    const handleFilterStatus = (e) => {
        router.get(route("dashboard.anggota"), {
            ...queryParams,
            is_active: e.target.value,
        });
    };

    const handleResetFilter = () => {
        router.get(route("dashboard.anggota"), {
            ...queryParams,
            jenis_anggota: "",
            is_active: "",
        });
    }

    const handleDelete = (id) => {
        toast("Hapus Anggota", {
            description: "Yakin hapus anggota?",
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
                onClick: () =>
                    router.delete(route("dashboard.anggota.destroy", id)),
            },
            cancel: {
                label: "Batal",
            },
        });
    };

    return (
        <DashboardLayout>
            <Head title={"Anggota"} />

            <PageTitle
                title={"Data Anggota"}
                links={[
                    {
                        title: "Semua Anggota",
                        active: true,
                    },
                ]}
                btnLinks={[
                    {
                        title: "Tambah Anggota",
                        link: route("dashboard.anggota.create"),
                    },
                ]}
            />

            {/* Filter anggota */}
            <div className="flex space-x-4 w-1/2 items-center">
                <div className="w-full lg:w-1/3">
                    <FormSelect
                        label="Jenis Anggota"
                        value={queryParams.jenis_anggota}
                        options={[
                            {
                                label: "IPNU",
                                value: "Laki-laki",
                            },
                            {
                                label: "IPPNU",
                                value: "Perempuan",
                            },
                        ]}
                        placeholder="Pilih jenis anggota"
                        onChange={(e) => {
                            handleFilterJenis(e);
                        }}
                        onBlur={(e) => {
                            handleFilterJenis(e);
                        }}
                    />
                </div>
                <div className="w-full lg:w-1/3">
                    <FormSelect
                        label={"Status Anggota"}
                        value={queryParams.is_active}
                        options={[
                            {
                                label: "Aktif",
                                value: true,
                            },
                            {
                                label: "Tidak Aktif",
                                value: false,
                            },
                        ]}
                        placeholder="Pilih status anggota"
                        onChange={(e) => {
                            handleFilterStatus(e);
                        }}
                        onBlur={(e) => {
                            handleFilterStatus(e);
                        }}
                    />
                </div>
                <div className="flex items-center mt-5">
                    <button
                    className="btn btn-primary"
                        onClick={() => handleResetFilter()}
                    >Reset</button>
                </div>
            </div>

            {/* Table anggota */}
            <DataTable
                title="Data Anggota"
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
                        title: "NIA",
                        dataIndex: "nia",
                        render: (value) => (
                            <span className="text-center">{value}</span>
                        ),
                    },
                    {
                        title: "NIK",
                        dataIndex: "nik",
                    },
                    {
                        title: "Nama Anggota",
                        dataIndex: "nama_lengkap",
                    },
                    {
                        title: "Status",
                        dataIndex: "is_active",
                        render: (value) => (
                            <span
                                className={`badge ${
                                    value == true
                                        ? "badge-success"
                                        : "badge-error"
                                } text-center text-xs`}
                            >
                                {value == true ? "Aktif" : "Tidak Aktif"}
                            </span>
                        ),
                    },
                    {
                        title: "Aksi",
                        dataIndex: "id",
                        render: (value) => (
                            <div className="flex space-x-2">
                                <Link
                                    href={route(
                                        "dashboard.anggota.show",
                                        value
                                    )}
                                    className="btn btn-sm btn-info"
                                >
                                    <HiOutlineInformationCircle />
                                </Link>
                                <Link
                                    href={route(
                                        "dashboard.anggota.edit",
                                        value
                                    )}
                                    className="btn btn-sm btn-warning"
                                >
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
