import PageTitle from "@/Components/atoms/PageTitle";
import DataTable from "@/Components/molecules/DataTable";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { getAllQueryParams } from "@/utils";
import { Head, Link, router, usePage } from "@inertiajs/react";

export default function IndexSurat() {
    const page = usePage().props;
    const queryParams = getAllQueryParams();
    const { data, ...pagination } = page.surats;

    const handleSearch = (search) => {
        router.get(route("dashboard.roles"), {
            ...queryParams,
            search: search,
        });
    };

    return (
        <DashboardLayout>
            <Head title="Surat" />

            <div>
                <div class="flex items-center justify-center h-screen">
                    <div class="text-center">
                        <h1 class="text-9xl font-bold text-gray-800">404</h1>
                        <h2 class="text-2xl font-semibold text-gray-600">
                            Coming soon
                        </h2>
                        <p class="text-lg text-gray-500">
                            The page you are looking for is not available yet.
                            Please check back later.
                        </p>
                        <div class="mt-4">
                            <Link
                                href={route("dashboard.index")}
                                class="px-4 py-2.5 bg-blue-700 text-white rounded-xl inline-block hover:bg-blue-800 transition-all"
                            >
                                Go Back
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* <PageTitle
                title="Surat"
                links={[
                    {
                        title: "Semua Surat",
                        href: route("dashboard.surats"),
                        active: true,
                    },
                ]}
                btnLink={route("dashboard.surats.create")}
                btnTitle="Buat Surat"
            />

            <DataTable
                title="Data surat-surat"
                dataSource={data}
                searchable
                handleSearch={handleSearch}
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
                    },
                    {
                        title: "Perihal",
                        dataIndex: "perihal",
                    },
                    {
                        title: "Jenis Surat",
                        dataIndex: "jenis_surat",
                    },
                    {
                        title: "Status",
                        dataIndex: "status",
                    },
                    {
                        title: "Pengirim",
                        dataIndex: "pengirim",
                    },
                    {
                        title: "Keterangan",
                        dataIndex: "keterangan",
                        render: (value) => value,
                    }
                ]}
            /> */}
        </DashboardLayout>
    );
}
