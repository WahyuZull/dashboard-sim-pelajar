import PageSection from "@/Components/atoms/PageSection";
import PageTitle from "@/Components/atoms/PageTitle";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { formatDate } from "@/utils";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { HiOutlinePencilSquare, HiTrash } from "react-icons/hi2";
import { LuBadgeAlert, LuBadgeCheck } from "react-icons/lu";
import Table from "./Components/Table";

export default function ShowAnggota() {
    const page = usePage().props;
    const { anggota } = page;

    const activateAnggota = (id) => {
        router.patch(route("dashboard.activation-anggota", id));
    };

    const deactivatenggota = (id) => {
        router.patch(route("dashboard.deactivation-anggota", id));
    };

    return (
        <DashboardLayout>
            <Head title={"Detail Anggota"} />

            <PageTitle
                title={"Detail Anggota"}
                links={[
                    {
                        title: "Semua Anggota",
                        url: route("dashboard.anggota"),
                        active: false,
                    },
                    {
                        title: "Detail Anggota",
                        active: true,
                    },
                ]}
            />

            <PageSection
                title={"Data Diri Anggota"}
                header={
                    anggota?.is_active === false ? (
                        <>
                            <button
                                onClick={() => activateAnggota(anggota?.id)}
                                className="btn btn-sm btn-info text-white"
                            >
                                Aktivasi Anggota
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => deactivatenggota(anggota?.id)}
                                className="btn btn-sm btn-error text-white"
                            >
                                Nonaktifkan Anggota
                            </button>
                        </>
                    )
                }
            >
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/3">
                        <div className="flex flex-col justify-center items-center">
                            <div className="rounded-xl overflow-hidden border shadow-sm">
                                <img
                                    src={`/${anggota?.foto}`}
                                    alt={anggota?.nama_lengkap}
                                    className=""
                                />
                            </div>
                            <span
                                className={`mt-4 badge badge-lg ${
                                    anggota?.is_active === true
                                        ? "badge-success"
                                        : "badge-error"
                                }`}
                            >
                                {anggota?.is_active === true ? (
                                    <span className="flex items-center gap-1">
                                        <LuBadgeCheck /> Aktif
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-1">
                                        <LuBadgeAlert /> Tidak Aktif
                                    </span>
                                )}
                            </span>
                        </div>
                    </div>
                    <div className="w-full md:w-2/3">
                        <div>
                            <dl className="divide-y divide-gray-100">
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm/6 font-medium text-gray-900">
                                        Nomor Induk Anggota
                                    </dt>
                                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        {anggota?.nia}
                                    </dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm/6 font-medium text-gray-900">
                                        NIK
                                    </dt>
                                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        {anggota?.nik}
                                    </dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm/6 font-medium text-gray-900">
                                        Nama Lengkap
                                    </dt>
                                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        {anggota?.nama_lengkap}
                                    </dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm/6 font-medium text-gray-900">
                                        Tempat, Tanggal Lahir
                                    </dt>
                                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        {anggota?.tempat_lahir},{" "}
                                        {formatDate(anggota?.tanggal_lahir)}
                                    </dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm/6 font-medium text-gray-900">
                                        Jenis Kelamin
                                    </dt>
                                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        {anggota?.jenis_kelamin}
                                    </dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm/6 font-medium text-gray-900">
                                        Alamat
                                    </dt>
                                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        {anggota?.village_name} {anggota?.rt}/{" "}
                                        {anggota?.rw} KEC.{" "}
                                        {anggota?.district_name},{" "}
                                        {anggota?.regency_name}, PROV.{" "}
                                        {anggota?.province_name}
                                    </dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm/6 font-medium text-gray-900">
                                        Nama Orangtua
                                    </dt>
                                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        {anggota?.nama_orangtua}
                                    </dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm/6 font-medium text-gray-900">
                                        Pekerjaan Orangtua
                                    </dt>
                                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        {anggota?.pekerjaan_orangtua}
                                    </dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm/6 font-medium text-gray-900">
                                        No. Handphone
                                    </dt>
                                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        {anggota?.no_hp}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </PageSection>

            <PageSection
                title={"Riwayat Pelatihan"}
                header={
                    <>
                        <Link
                            href=""
                            className="btn btn-primary btn-sm btn-outline"
                        >
                            Tambah Pelatihan
                        </Link>
                    </>
                }
            >
                <Table
                    dataSource={anggota?.pelatihan}
                    columns={[
                        {
                            title: "No.",
                            render: (_, index) => <span>{index + 1}</span>,
                        },
                        {
                            title: "Nama Pelatihan",
                            dataIndex: "nama",
                        },
                        {
                            title: "Penyelenggara",
                            render: (_, __, record) => (
                                <div>
                                    {record?.pivot?.penyelenggara_pelatihan}
                                </div>
                            ),
                        },
                        {
                            title: "Tempat Pelatihan",
                            render: (_, __, record) => (
                                <div>{record?.pivot?.tempat_pelatihan}</div>
                            ),
                        },
                        {
                            title: "Tanggal Pelatihan",
                            render: (_, __, record) => (
                                <div>
                                    {formatDate(
                                        record?.pivot?.tanggal_pelatihan
                                    )}
                                </div>
                            ),
                        },
                        {
                            title: "Aksi",
                            render: (_, __, record) => (
                                <div className="flex gap-2">
                                    <Link
                                        href=""
                                        className="btn btn-sm btn-warning"
                                    >
                                        <HiOutlinePencilSquare />
                                    </Link>
                                    <button className="btn btn-sm btn-error">
                                        <HiTrash />
                                    </button>
                                </div>
                            ),
                        },
                    ]}
                />
            </PageSection>

            <PageSection
                title={"Riwayat Kepengurusan"}
                header={
                    <>
                        <Link
                            href=""
                            className="btn btn-primary btn-sm btn-outline"
                        >
                            Tambah Kepengurusan
                        </Link>
                    </>
                }
            >
                <Table
                    dataSource={anggota?.pimpinan}
                    columns={[
                        {
                            title: "No.",
                            render: (_, index) => <span>{index + 1}</span>,
                        },
                        {
                            title: "Jabatan",
                            render: (_, __, record) => (
                                <div>{record?.pivot?.jabatan}</div>
                            ),
                        },
                        {
                            title: "Nama Pimpinan",
                            dataIndex: "nama",
                        },
                        {
                            title: "Periode Kepengurusan",
                            render: (_, __, record) => (
                                <div>{record?.pivot?.periode_kepengurusan}</div>
                            ),
                        },
                        {
                            title: "Aksi",
                            render: (_, __, record) => (
                                <div className="flex gap-2">
                                    <Link
                                        href=""
                                        className="btn btn-sm btn-warning"
                                    >
                                        <HiOutlinePencilSquare />
                                    </Link>
                                    <button className="btn btn-sm btn-error">
                                        <HiTrash />
                                    </button>
                                </div>
                            ),
                        },
                    ]}
                />
            </PageSection>
        </DashboardLayout>
    );
}
