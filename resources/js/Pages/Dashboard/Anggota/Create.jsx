import FileInput from "@/Components/atoms/FileInput";
import FormInput from "@/Components/atoms/FormInput";
import FormSelect from "@/Components/atoms/FormSelect";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { FiSave } from "react-icons/fi";
import PageSection from "@/Components/atoms/PageSection";
import FormRegion from "./Components/FormRegion";
import PageTitle from "@/Components/atoms/PageTitle";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";

export default function CreateAnggota() {
    const page = usePage().props;
    const { pimpinans, pelatihans } = page;

    const { data, setData, post, processing, errors } = useForm({
        // data diri
        nik: "",
        nama_lengkap: "",
        tempat_lahir: "",
        tanggal_lahir: "",
        jenis_kelamin: "",
        province_id: "",
        regency_id: "",
        district_id: "",
        village_id: "",
        rt: "",
        rw: "",
        no_hp: "",
        nama_orangtua: "",
        pekerjaan_orangtua: "",
        // kepengurusan
        jabatan: "",
        pimpinan_id: "",
        periode_kepengurusan: "",
        // pelatihan
        pelatihan_id: "",
        tempat_pelatihan: "",
        tanggal_pelatihan: "",
        penyelenggara_pelatihan: "",
        // foto
        foto: "",
    });

    const inputRef = useRef();
    const [imageSrc, setImageSrc] = useState(data.foto);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setData("foto", e.target.files[0]);
            setImageSrc(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        inputRef.current?.click();
        post(route("dashboard.anggota.store"));
    };

    return (
        <DashboardLayout>
            <Head title={"Tambah Anggota"} />

            <PageTitle
                title={"Tambah Anggota"}
                links={[
                    {
                        title: "Semua Anggota",
                        url: route("dashboard.anggota"),
                        active: false,
                    },
                    {
                        title: "Tambah Anggota",
                        active: true,
                    },
                ]}
            />

            <form onSubmit={handleSubmit} className="custom-form">
                {/* Input foto anggota*/}
                <PageSection title={"Foto Anggota"}>
                    <div className="w-full">
                        {imageSrc && (
                            <div className="w-[300px] h-[400px] mb-4">
                                <img
                                    src={imageSrc}
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

                {/* Input data diri anggota */}
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
                                    value={data?.tanggal_lahir}
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

                {/* Input riwayat pelatihan */}
                <PageSection title={"Data Riwayat Pelatihan"}>
                    {/* Input Nama dan Tanggal Pelatihan */}
                    <div className="flex flex-col lg:gap-4 lg:flex-row">
                        {/* Input Nama Pelatihan */}
                        <div className="w-full lg:w-1/2">
                            <FormSelect
                                label="Nama Pelatihan"
                                placeholder={"Pilih Pelatihan"}
                                value={data?.pelatihan_id}
                                options={
                                    pelatihans.length > 0 &&
                                    pelatihans.map((pelatihan) => ({
                                        value: pelatihan.id,
                                        label: pelatihan.nama,
                                    }))
                                }
                                onChange={(e) => {
                                    setData("pelatihan_id", e.target.value);
                                }}
                                onBlur={(e) => {
                                    setData("pelatihan_id", e.target.value);
                                }}
                                error={errors.pelatihan_id}
                            />
                        </div>
                        {/* Input Tanggal Pelatihan */}
                        <div className="w-full lg:w-1/2">
                            <FormInput
                                type="date"
                                label="Tanggal Pelatihan"
                                value={data?.tanggal_pelatihan}
                                placeholder={"Masukkan Tanggal Pelatihan"}
                                onChange={(e) => {
                                    setData(
                                        "tanggal_pelatihan",
                                        e.target.value
                                    );
                                }}
                                onBlur={(e) => {
                                    setData(
                                        "tanggal_pelatihan",
                                        e.target.value
                                    );
                                }}
                                error={errors.tanggal_pelatihan}
                            />
                        </div>
                    </div>

                    {/* Input Tempat Pelatihan dan Penyelenggara */}
                    <div className="flex flex-col lg:gap-4 lg:flex-row">
                        {/* Input Tempat Pelatihan */}
                        <div className="w-full lg:w-1/2">
                            <FormInput
                                label="Tempat Pelatihan"
                                value={data?.tempat_pelatihan}
                                placeholder={"Masukkan Tempat Pelatihan"}
                                onChange={(e) => {
                                    setData("tempat_pelatihan", e.target.value);
                                }}
                                onBlur={(e) => {
                                    setData("tempat_pelatihan", e.target.value);
                                }}
                                error={errors.tempat_pelatihan}
                            />
                        </div>
                        {/* Input Penyelenggara Pelatihan */}
                        <div className="w-full lg:w-1/2">
                            <FormSelect
                                label="Penyelenggara Pelatihan"
                                placeholder={"Masukkan Penyelenggara Pelatihan"}
                                value={data?.penyelenggara_pelatihan}
                                options={
                                    pimpinans.length > 0 &&
                                    pimpinans.map((pimpinan) => ({
                                        value: pimpinan.id,
                                        label: pimpinan.nama,
                                    }))
                                }
                                onChange={(e) => {
                                    setData(
                                        "penyelenggara_pelatihan",
                                        e.target.value
                                    );
                                }}
                                onBlur={(e) => {
                                    setData(
                                        "penyelenggara_pelatihan",
                                        e.target.value
                                    );
                                }}
                                error={errors.penyelenggara_pelatihan}
                            />
                        </div>
                    </div>
                </PageSection>

                {/* Input riwayat kepengurusan */}
                <PageSection title={"Data Riwayat Kepengurusan"}>
                    {/* Input Nama Pimpinan */}
                    <FormInput
                        label="Jabatan"
                        value={data?.jabatan}
                        placeholder={"Jabatan dalam Pengurus"}
                        helper={"Contoh: Ketua / Wakil Ketua / Sekretaris"}
                        onChange={(e) => setData("jabatan", e.target.value)}
                        onBlur={(e) => setData("jabatan", e.target.value)}
                        error={errors.jabatan}
                    />
                    {/* Input Nama Pimpinan */}
                    <FormSelect
                        label="Nama Pimpinan"
                        value={data?.pimpinan_id}
                        placeholder={"Pilih Nama Pimpinan"}
                        options={pimpinans.map((pimpinan) => ({
                            value: pimpinan.id,
                            label: pimpinan.nama,
                        }))}
                        onChange={(e) => setData("pimpinan_id", e.target.value)}
                        onBlur={(e) => setData("pimpinan_id", e.target.value)}
                        error={errors.pimpinan_id}
                    />
                    {/* Input Periode Kepengurusan */}
                    <FormInput
                        label="Periode Kepengurusan"
                        value={data?.periode_kepengurusan}
                        placeholder={"Periode Kepengurusan"}
                        helper={"Contoh: 2022-2023"}
                        onChange={(e) =>
                            setData("periode_kepengurusan", e.target.value)
                        }
                        onBlur={(e) =>
                            setData("periode_kepengurusan", e.target.value)
                        }
                        error={errors.periode_kepengurusan}
                    />
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
