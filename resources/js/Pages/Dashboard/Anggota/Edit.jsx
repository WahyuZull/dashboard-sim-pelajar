import FileInput from "@/Components/atoms/FileInput";
import FormInput from "@/Components/atoms/FormInput";
import FormSelect from "@/Components/atoms/FormSelect";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { FiSave } from "react-icons/fi";
import { useState } from "react";
import PageSection from "@/Components/atoms/PageSection";
import PageTitle from "@/Components/atoms/PageTitle";
import FormRegion from "./Components/FormRegion";
import { formatDateForm } from "@/utils";
import { useRef } from "react";

export default function ManageAnggota() {
    const page = usePage().props;
    const { anggota } = page;

    const {
        data,
        setData,
        processing,
        errors,
        put: update,
    } = useForm({
        nik: anggota?.nik ?? "",
        nama_lengkap: anggota?.nama_lengkap ?? "",
        tempat_lahir: anggota?.tempat_lahir ?? "",
        tanggal_lahir: anggota?.tanggal_lahir ?? "",
        jenis_kelamin: anggota?.jenis_kelamin ?? "",
        province_id: anggota?.province_id ?? "",
        regency_id: anggota?.regency_id ?? "",
        district_id: anggota?.district_id ?? "",
        village_id: anggota?.village_id ?? "",
        rt: anggota?.rt ?? "",
        rw: anggota?.rw ?? "",
        no_hp: anggota?.no_hp ?? "",
        nama_orangtua: anggota?.nama_orangtua ?? "",
        pekerjaan_orangtua: anggota?.pekerjaan_orangtua ?? "",
        foto: anggota?.foto ?? null,
    });

    const inputRef = useRef();
    const [imageSrc, setImageSrc] = useState(data?.foto);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setData("foto", e.target.files[0]);
            setImageSrc(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        inputRef.current?.click();
        update(route("dashboard.anggota.update", anggota.id));
    };

    return (
        <DashboardLayout>
            <Head title={"Edit Anggota"} />

            <PageTitle
                title={"Edit Anggota"}
                links={[
                    {
                        title: "Semua Anggota",
                        url: route("dashboard.anggota"),
                        active: false,
                    },
                    {
                        title: "Edit Anggota",
                        url: route("dashboard.anggota.edit", anggota.id),
                        active: true,
                    },
                ]}
            />

            <form onSubmit={handleSubmit} className="custom-form">
                {/* Input foto */}
                <PageSection title={"Foto Anggota"}>
                    <div className="w-full">
                        {imageSrc && (
                            <div className="w-[300px] h-[400px] mb-4">
                                <img
                                    src={`/${imageSrc}`}
                                    alt="Foto Anggota"
                                    className="w-full h-auto object-cover object-center"
                                />
                            </div>
                        )}

                        <FileInput
                            type="file"
                            accept="image/*"
                            label={"Unggah foto"}
                            ref={inputRef}
                            description={
                                "Format file yang diizinkan: JPG, JPEG, PNG. Ukuran maksimal 2MB."
                            }
                            onChange={handleFileChange}
                            error={errors?.foto}
                        />
                    </div>
                </PageSection>

                {/* Input data anggota */}
                <PageSection title={"Data Diri Anggota"}>
                    <div className="grid grid-cols-1 md:grid-cols-2 w-full md:gap-6">
                        <div className="w-full">
                            {/* Input NIK */}
                            <FormInput
                                label="NIK"
                                value={data?.nik}
                                placeholder={"Masukkan NIK"}
                                onChange={(e) => setData("nik", e.target.value)}
                                onBlur={(e) => setData("nik", e.target.value)}
                                error={errors.nik}
                            />

                            {/* Input Nama */}
                            <FormInput
                                label="Nama"
                                value={data?.nama_lengkap}
                                placeholder={"Masukkan Nama"}
                                onChange={(e) =>
                                    setData("nama_lengkap", e.target.value)
                                }
                                onBlur={(e) =>
                                    setData("nama_lengkap", e.target.value)
                                }
                                error={errors.nama_lengkap}
                            />

                            <div className="grid grid-cols-2 gap-6">
                                {/* Input Tempat Lahir */}
                                <FormInput
                                    label="Tempat Lahir"
                                    value={data?.tempat_lahir}
                                    placeholder={"Masukkan Tempat Lahir"}
                                    onChange={(e) =>
                                        setData("tempat_lahir", e.target.value)
                                    }
                                    onBlur={(e) =>
                                        setData("tempat_lahir", e.target.value)
                                    }
                                    error={errors.tempat_lahir}
                                />

                                {/* Input Tanggal Lahir */}
                                <FormInput
                                    label="Tangal Lahir"
                                    type="date"
                                    value={formatDateForm(data?.tanggal_lahir)}
                                    placeholder={"Masukkan Tanggal Lahir"}
                                    onChange={(e) =>
                                        setData("tanggal_lahir", e.target.value)
                                    }
                                    onBlur={(e) =>
                                        setData("tanggal_lahir", e.target.value)
                                    }
                                    error={errors.tanggal_lahir}
                                />
                            </div>

                            {/* Input Jenis Kelamin */}
                            <FormSelect
                                label="Jenis Kelamin"
                                value={data?.jenis_kelamin}
                                placeholder={"Masukkan Jenis Kelamin"}
                                options={[
                                    {
                                        value: "Laki-laki",
                                        label: "Laki-laki",
                                    },
                                    {
                                        value: "Perempuan",
                                        label: "Perempuan",
                                    },
                                ]}
                                errors={errors.jenis_kelamin}
                                onChange={(e) => {
                                    setData("jenis_kelamin", e.target.value);
                                }}
                                onBlur={(e) => {
                                    setData("jenis_kelamin", e.target.value);
                                }}
                            />

                            {/* Input No. HP */}
                            <FormInput
                                label="No. Handphone"
                                value={data?.no_hp}
                                placeholder={"Masukkan No. Handphone"}
                                onChange={(e) =>
                                    setData("no_hp", e.target.value)
                                }
                                onBlur={(e) => setData("no_hp", e.target.value)}
                                error={errors.no_hp}
                            />
                        </div>
                        <div className="w-full">
                            <FormRegion
                                data={data}
                                setData={setData}
                                errors={errors}
                            />

                            {/* Input Orang tua */}
                            <FormInput
                                label="Nama Orangtua"
                                value={data?.nama_orangtua}
                                placeholder={"Masukkan Nama Orangtua"}
                                onChange={(e) =>
                                    setData("nama_orangtua", e.target.value)
                                }
                                onBlur={(e) =>
                                    setData("nama_orangtua", e.target.value)
                                }
                                error={errors.nama_orangtua}
                            />

                            <FormInput
                                label="Pekerjaan Orangtua"
                                value={data.pekerjaan_orangtua}
                                placeholder={"Masukkan Pekerjaan Orangtua"}
                                onChange={(e) =>
                                    setData(
                                        "pekerjaan_orangtua",
                                        e.target.value
                                    )
                                }
                                onBlur={(e) =>
                                    setData(
                                        "pekerjaan_orangtua",
                                        e.target.value
                                    )
                                }
                                error={errors.pekerjaan_orangtua}
                            />
                        </div>
                    </div>
                </PageSection>

                <div className="text-right mt-3">
                    <button type="submit" className="btn btn-primary">
                        <FiSave size={18} />
                        {processing ? "Saving..." : "Save"}
                    </button>
                </div>
            </form>
        </DashboardLayout>
    );
}
