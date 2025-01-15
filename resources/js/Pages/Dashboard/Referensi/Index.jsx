import FormSelect from "@/Components/atoms/FormSelect";
import DataTable from "@/Components/molecules/DataTable";
import DashboardLayout from "@/Layouts/DashboardLayout";
import {
    getDistricts,
    getProvinces,
    getRegencies,
    getVillages,
} from "@/services/region.services";
import { Head, useForm, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { useState } from "react";

export default function IndexReferensi() {
    const user = usePage().props.auth.user;

    const canAccess = (...roles) => roles.includes(user?.roles[0]?.name);

    const { data, setData, get, processing, errors } = useForm({
        province_id: "",
        regency_id: "",
        district_id: "",
    });

    const [provinces, setProvinces] = useState([]);
    const [regencies, setRegencies] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [villages, setVillages] = useState([]);

    useEffect(() => {
        getProvinces().then((res) => {
            setProvinces(res.data);
        });
    }, []);

    useEffect(() => {
        if (data.province_id) {
            getRegencies(data.province_id).then((res) => {
                setRegencies(res.data);
                setDistricts([]);
                setVillages([]);
            });
        }
    }, [data.province_id]);

    useEffect(() => {
        if (data.regency_id) {
            getDistricts(data.regency_id).then((res) => {
                setDistricts(res.data);
                setVillages([]);
            });
        }
    }, [data.regency_id]);

    useEffect(() => {
        if (data.district_id) {
            getVillages(data.district_id).then((res) => {
                setVillages(res.data);
            });
        }
    }, [data.district_id]);

    return (
        <DashboardLayout>
            <Head title={"Referensi"} />

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-bold uppercase mb-2">Referensi</h1>
                    <div className="text-sm breadcrumbs">
                        <ul>
                            <li>Referensi</li>
                        </ul>
                    </div>
                </div>
            </div>

            {canAccess("admin", "super-admin") && (
                <>
                    <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Pilih Provinsi */}
                        <FormSelect
                            label="Provinsi"
                            options={provinces.map((province) => ({
                                value: province.id,
                                label: province.name,
                            }))}
                            onChange={(e) =>
                                setData("province_id", e.target.value)
                            }
                            onBlur={(e) =>
                                setData("province_id", e.target.value)
                            }
                            error={errors?.province_id}
                        />
                        {/* Pilih Kabupaten/Kota */}
                        <FormSelect
                            label="Kabupaten/Kota"
                            options={regencies.map((regency) => ({
                                value: regency.id,
                                label: regency.name,
                            }))}
                            onChange={(e) =>
                                setData("regency_id", e.target.value)
                            }
                            onBlur={(e) =>
                                setData("regency_id", e.target.value)
                            }
                            error={errors?.regency_id}
                        />
                        {/* Pilih Kecamatan */}
                        <FormSelect
                            label="Kecamatan"
                            options={districts.map((district) => ({
                                value: district.id,
                                label: district.name,
                            }))}
                            onChange={(e) =>
                                setData("district_id", e.target.value)
                            }
                            onBlur={(e) =>
                                setData("district_id", e.target.value)
                            }
                            error={errors?.district_id}
                        />
                    </form>
                </>
            )}

            {canAccess("secretary") && (
                <>
                    <p className="text-center">
                        Halaman ini sedang dalam tahap pengembangan untuk
                        sekretaris
                    </p>
                </>
            )}

            <div className="page-section">
                <div className="page-section__header">
                    <h2 className="page-section__title">Daftar Referensi</h2>
                </div>
                <div className="page-section__body">
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Kode Provinsi</th>
                                    <th>Kode Kabupaten/Kota</th>
                                    <th>Kode Kecamatan</th>
                                    <th>Kode Desa</th>
                                    <th>Nama Desa</th>
                                </tr>
                            </thead>
                            <tbody>
                                {villages.map((village) => (
                                    <tr>
                                        <td>{data.province_id}</td>
                                        <td>{data.regency_id}</td>
                                        <td>{data.district_id}</td>
                                        <td>{village.id}</td>
                                        <td>{village.name}</td>
                                    </tr>
                                ))}
                                {/* {referensi.map((ref) => (
                                    <tr>
                                        <td>{data.province_id}</td>
                                        <td>{data.regency_id}</td>
                                        <td>{data.district_id}</td>
                                        <td>33190522</td>
                                        <td>3319052203</td>
                                    </tr>
                                ))} */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
