import FileInput from "@/Components/atoms/FileInput";
import FormInput from "@/Components/atoms/FormInput";
import FormSelect from "@/Components/atoms/FormSelect";
import PageSection from "@/Components/atoms/PageSection";
import PageTitle from "@/Components/atoms/PageTitle";
import MediaLibrary from "@/Components/organisms/MediaLibrary";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { FiSave } from "react-icons/fi";
import { HiOutlineArrowUpOnSquare, HiXCircle } from "react-icons/hi2";

export default function ManagePelatihans() {
    const page = usePage().props;
    const { pelatihan } = page;
    const title = pelatihan ? "Edit Pelatihan" : "Tambah Pelatihan";

    const { data, setData, post, processing, errors, put } = useForm({
        nama: pelatihan?.nama ?? "",
        jenis_anggota: pelatihan?.jenis_anggota ?? "",
        sertifikat: pelatihan?.sertifikat ?? [],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (pelatihan) {
            put(route("dashboard.pelatihans.update", pelatihan.id));
        } else {
            post(route("dashboard.pelatihans.store"));
        }
    };

    const handleSelectMedia = (selectedMedia) => {
        const sertifikats = [...data.sertifikat];
        const selectedMediaUrls = selectedMedia.map((media) => media);
        setData("sertifikat", [...sertifikats, ...selectedMediaUrls]);
    };

    const handleDeleteMedia = (index) => {
        const sertifikat = [...data.sertifikat];
        sertifikat.splice(index, 1);
        setData("sertifikat", sertifikat);
    };

    return (
        <DashboardLayout>
            <Head title={title} />

            <PageTitle
                title={title}
                links={[
                    {
                        title: "Pelatihan",
                        url: route("dashboard.pelatihans"),
                        active: false,
                    },
                    {
                        title: title,
                        active: true,
                    },
                ]}
            />

            <form onSubmit={handleSubmit} className="custom-form">
                <PageSection title={`Form ${title}`}>
                    {/* Input nama pelatihan */}
                    <FormInput
                        label="Nama"
                        value={data?.nama}
                        placeholder={"Masukkan Nama"}
                        onChange={(e) => setData("nama", e.target.value)}
                        onBlur={(e) => setData("nama", e.target.value)}
                        error={errors.nama}
                    />

                    {/* Input Sertifikat */}
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text font-bold">
                                Sertifikat
                            </span>
                        </div>
                    </label>
                    <div className="my-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {data?.sertifikat.length > 0 &&
                                data?.sertifikat.map((sertifikat, index) => {
                                    return (
                                        <div key={index} className="relative">
                                            <div className="w-[300px] h-[200px] mb-2 overflow-hidden rounded-xl">
                                                <img
                                                    src={
                                                        sertifikat
                                                            ? sertifikat
                                                            : "https://placehold.co/600x400/gray/white/png?text=Sertifikat"
                                                    }
                                                    alt="Sertifikat"
                                                    className="w-full h-full object-cover"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleDeleteMedia(index)
                                                    }
                                                    className="absolute top-[-10px] right-[-10px] text-2xl text-red-500 active:scale-[1.2]"
                                                >
                                                    <HiXCircle />
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            {data?.sertifikat.length === 0 && (
                                <p className="text-center py-5">
                                    No product images added yet.
                                </p>
                            )}
                        </div>
                        <button
                            type="button"
                            onClick={() =>
                                document
                                    .getElementById("media-library-modal")
                                    .showModal()
                            }
                            className="btn btn-primary btn-outline"
                        >
                            <HiOutlineArrowUpOnSquare size={25} />
                            Upload Media
                        </button>
                    </div>
                </PageSection>

                <div className="text-right mt-3">
                    <button type="submit" className="btn btn-primary">
                        <FiSave size={18} />
                        {processing ? "Saving..." : "Save"}
                    </button>
                </div>
            </form>

            <MediaLibrary
                onConfirm={handleSelectMedia}
                multiple={true}
                selectMultiple={true}
            />
        </DashboardLayout>
    );
}
