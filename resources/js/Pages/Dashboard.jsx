import DataTable from "@/Components/molecules/DataTable";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { IoManOutline, IoWomanOutline } from "react-icons/io5";
import { PiBuildingOffice } from "react-icons/pi";

export default function Dashboard({ auth }) {
    const page = usePage().props;

    const {
        anggota_count,
        anggota_ipnu_count,
        anggota_ippnu_count,
        pimpinan_count,
    } = page;

    const { data, ...pagination } = page.new_anggota;

    return (
        <DashboardLayout>
            <Head title={"Dashboard"} />
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-bold uppercase mb-2">Dashboard</h1>
                </div>
            </div>
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
                <div className="card bg-base-100 max-w-70 shadow">
                    <div className="card-body">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="">Total Anggota</h2>
                                <p className="font-bold text-2xl">
                                    {anggota_count}
                                </p>
                            </div>
                            <HiOutlineUserGroup
                                size={40}
                                className="text-primary bg-primary-content rounded-full p-2"
                            />
                        </div>
                    </div>
                </div>
                <div className="card bg-base-100 max-w-70 shadow">
                    <div className="card-body">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="">IPNU</h2>
                                <p className="font-bold text-2xl">
                                    {anggota_ipnu_count}
                                </p>
                            </div>
                            <IoManOutline
                                size={40}
                                className="text-primary bg-primary-content rounded-full p-2"
                            />
                        </div>
                    </div>
                </div>
                <div className="card bg-base-100 max-w-70 shadow">
                    <div className="card-body">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="">IPPNU</h2>
                                <p className="font-bold text-2xl">
                                    {anggota_ippnu_count}
                                </p>
                            </div>
                            <IoWomanOutline
                                size={40}
                                className="text-primary bg-primary-content rounded-full p-2"
                            />
                        </div>
                    </div>
                </div>
                <div className="card bg-base-100 max-w-70 shadow">
                    <div className="card-body">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="">Total Pimpinan</h2>
                                <p className="font-bold text-2xl">
                                    {pimpinan_count}
                                </p>
                            </div>
                            <PiBuildingOffice
                                size={40}
                                className="text-primary bg-primary-content rounded-full p-2"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <DataTable
                title={`Data Anggota Baru Tahun ${new Date().getFullYear()}`}
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
                        title: "NIK",
                        dataIndex: "nik",
                        render: (value) => value,
                    },
                    {
                        title: "Nama Anggota",
                        dataIndex: "nama_lengkap",
                        render: (value) => value,
                    },
                    {
                        title: "Jenis Kelamin",
                        dataIndex: "jenis_kelamin",
                        render: (value) => value,
                    },
                    {
                        title: "Status Anggota",
                        dataIndex: "is_active",
                    },
                ]}
            />
        </DashboardLayout>
    );
}
