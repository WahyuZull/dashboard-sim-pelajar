import FormInput from "@/Components/atoms/FormInput";
import FormSelect from "@/Components/atoms/FormSelect";
import PageSection from "@/Components/atoms/PageSection";
import PageTitle from "@/Components/atoms/PageTitle";
import DashboardLayout from "@/Layouts/DashboardLayout";
import {
    getPimpinanAnakCabang,
    getPimpinanCabang,
    getPimpinanKomisariat,
    getPimpinanRanting,
} from "@/services/pimpinan.services";
import { Head, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import { useEffect } from "react";
import { FiSave } from "react-icons/fi";

export default function ManagePimpinan() {
    const page = usePage().props;
    const { pimpinan } = page;
    const title = pimpinan ? "Edit Pimpinan" : "Tambah Pimpinan";

    const [pimpinanCabang, setPimpinanCabang] = useState([]);
    const [pimpinanAnakCabang, setPimpinanAnakCabang] = useState([]);
    const [pimpinanRanting, setPimpinanRanting] = useState([]);
    const [pimpinanKomisariat, setPimpinanKomisariat] = useState([]);

    const { data, setData, post, processing, errors, put } = useForm({
        nama: pimpinan?.nama ?? "",
        pimpinan_cabang_id: pimpinan?.pimpinan_cabang_id ?? "",
        pimpinan_anak_cabang_id: pimpinan?.pimpinan_anak_cabang_id ?? "",
        pimpinan_ranting_id: pimpinan?.pimpinan_ranting_id ?? "",
        pimpinan_komisariat_id: pimpinan?.pimpinan_komisariat_id ?? "",
    });

    useEffect(() => {
        getPimpinanCabang().then((res) => {
            setPimpinanCabang(res.data);
        });
    }, []);

    useEffect(() => {
        if (data?.pimpinan_cabang_id) {
            getPimpinanAnakCabang(data?.pimpinan_cabang_id).then((res) => {
                setPimpinanAnakCabang(res.data);
                setPimpinanRanting([]);
            });
        }
    }, [data?.pimpinan_cabang_id]);

    useEffect(() => {
        if (data?.pimpinan_anak_cabang_id) {
            getPimpinanRanting(data?.pimpinan_anak_cabang_id).then((res) => {
                setPimpinanRanting(res.data);
            });
        }
    }, [data?.pimpinan_anak_cabang_id]);

    useEffect(() => {
        if (data?.pimpinan_anak_cabang_id) {
            getPimpinanKomisariat(data?.pimpinan_anak_cabang_id).then((res) => {
                setPimpinanKomisariat(res.data);
            });
        }
    }, [data?.pimpinan_anak_cabang_id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
        if (pimpinan) {
            put(route("dashboard.pimpinans.update", pimpinan.id));
        } else {
            post(route("dashboard.pimpinans.store"));
        }
    };
    return (
        <DashboardLayout>
            <Head title="Pimpinan" />

            <PageTitle
                title={title}
                links={[
                    {
                        title: "Semua Pimpinan",
                        active: false,
                        url: route("dashboard.pimpinans"),
                    },
                    {
                        title,
                        active: true,
                    },
                ]}
            />

            <form onSubmit={handleSubmit} className="custom-form">
                <PageSection title={`Form ${title}`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
                        <FormSelect
                            label="Pimpinan Cabang"
                            options={pimpinanCabang.map((cabang) => ({
                                label: cabang.nama,
                                value: cabang.id,
                            }))}
                            value={data?.pimpinan_cabang_id}
                            placeholder={"Pilih Pimpinan Cabang"}
                            onChange={(e) =>
                                setData("pimpinan_cabang_id", e.target.value)
                            }
                            onBlur={(e) =>
                                setData("pimpinan_cabang_id", e.target.value)
                            }
                            error={errors?.pimpinan_cabang_id}
                        />
                        <FormSelect
                            label="Pimpinan Anak Cabang"
                            options={pimpinanAnakCabang.map((anakCabang) => ({
                                label: anakCabang.nama,
                                value: anakCabang.id,
                            }))}
                            value={data?.pimpinan_anak_cabang_id}
                            placeholder={"Pilih Pimpinan Anak Cabang"}
                            onChange={(e) =>
                                setData(
                                    "pimpinan_anak_cabang_id",
                                    e.target.value
                                )
                            }
                            error={errors?.pimpinan_anak_cabang_id}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
                        <FormSelect
                            label="Pimpinan Ranting"
                            options={pimpinanRanting.map((ranting) => ({
                                label: ranting.nama,
                                value: ranting.id,
                            }))}
                            value={data?.pimpinan_ranting_id}
                            placeholder={"Pilih Pimpinan Ranting"}
                            onChange={(e) =>
                                setData("pimpinan_ranting_id", e.target.value)
                            }
                            error={errors?.pimpinan_ranting_id}
                        />
                        {pimpinanKomisariat.length > 0 && (
                            <FormSelect
                                label="Pimpinan Komisariat"
                                options={pimpinanKomisariat.map(
                                    (komisariat) => ({
                                        label: komisariat.nama,
                                        value: komisariat.id,
                                    })
                                )}
                                value={data?.pimpinan_komisariat_id}
                                placeholder={"Pilih Pimpinan Komisariat"}
                                onChange={(e) =>
                                    setData(
                                        "pimpinan_komisariat_id",
                                        e.target.value
                                    )
                                }
                                error={errors?.pimpinan_komisariat_id}
                            />
                        )}
                    </div>
                    <FormInput
                        label="Nama Pimpinan"
                        value={data?.nama ?? ""}
                        onChange={(e) => setData("nama", e.target.value)}
                        placeholder={"Masukkan Nama Pimpinan"}
                        error={errors?.nama}
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
