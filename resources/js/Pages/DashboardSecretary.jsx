import DataTable from "@/Components/molecules/DataTable";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, router, usePage } from "@inertiajs/react";
import { TbMail, TbMailDown, TbMailUp } from "react-icons/tb";

export default function DashboardSecretary({ auth }) {
    const page = usePage().props;

    const { data, ...pagination } = page.new_surat;

    return (
        <DashboardLayout>
            <Head title="Dashboard Sekretaris" />
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-bold uppercase mb-2">Dashboard</h1>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                <div className="card bg-base-100 max-w-70 shadow">
                    <div className="card-body">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="">Total Surat</h2>
                                <p className="font-bold text-2xl">0</p>
                            </div>
                            <TbMail
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
                                <h2 className="">Total Surat Masuk</h2>
                                <p className="font-bold text-2xl">0</p>
                            </div>
                            <TbMailDown
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
                                <h2 className="">Total Surat Keluar</h2>
                                <p className="font-bold text-2xl">0</p>
                            </div>
                            <TbMailUp
                                size={40}
                                className="text-primary bg-primary-content rounded-full p-2"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <DataTable
                title="Surat-surat terbaru"
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
                        title: "Nomor Surat",
                        dataIndex: "nomor_surat",
                        render: (value) => value,
                        sorter: true,
                    },
                    {
                        title: "Perihal",
                        dataIndex: "perihal",
                        render: (value) => value,
                    },
                    {
                        title: "Jenis Surat",
                        dataIndex: "jenis_surat",
                        render: (value) => value,
                    },
                    {
                        title: "Status",
                        dataIndex: "status",
                        render: (value) => value,
                    },
                ]}
                handleSorterColumns={(column, direction) => {
                    router.get(route("dashboard.surats"), {
                        ...queryParams,
                        sortField: column,
                        sortDirection: direction ? direction : "asc",
                    });
                }}
            />
        </DashboardLayout>
    );
}
