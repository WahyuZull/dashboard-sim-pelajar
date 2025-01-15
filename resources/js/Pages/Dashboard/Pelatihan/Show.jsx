import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, Link } from "@inertiajs/react";

export default function ShowPelatihan() {
    const page = usePage().props;

    const { pelatihan } = page;

    return (
        <DashboardLayout>
            <Head title="Detail Pelatihan" />

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-bold uppercase mb-2">
                        Detail Pelatihan
                    </h1>
                    <div className="text-sm breadcrumbs">
                        <ul>
                            <li>
                                <Link href={route("dashboard.pelatihans")}>
                                    Pelatihan
                                </Link>
                            </li>
                            <li>Detail Pelatihan</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="page-section">
                <div className="page-section__header">
                    <h3 className="page-section__title">Detail Pelatihan</h3>
                </div>
                <div className="page-section__body">
                    {pelatihan && (
                        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                            <div className="card bg-base-100 shadow">
                                <div className="card-body">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h2 className="">Nama Pelatihan</h2>
                                            <p className="font-bold text-2xl">
                                                {pelatihan?.nama}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card bg-base-100 shadow">
                                <div className="card-body">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h2 className="">Jenis Anggota</h2>
                                            <p className="font-bold text-2xl">
                                                {pelatihan?.jenis_anggota}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
