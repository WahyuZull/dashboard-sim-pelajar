import FormInput from "@/Components/atoms/FormInput";
import FormSelect from "@/Components/atoms/FormSelect";
import {
    getDistricts,
    getProvinces,
    getRegencies,
    getVillages,
} from "@/services/region.services";
import { useState } from "react";
import { useEffect } from "react";

export default function FormRegion({ data, setData, errors }) {
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
        <>
            {/* Input Provinsi dan Kabupaten/Kota */}
            <div className="grid grid-cols-2 gap-6">
                {/* Input Provinsi */}
                <FormSelect
                    label="Provinsi"
                    placeholder={"Pilih Provinsi"}
                    options={provinces.map((province) => ({
                        label: province.name,
                        value: province.id,
                    }))}
                    value={data?.province_id}
                    onChange={(e) => {
                        setData("province_id", e.target.value);
                    }}
                    error={errors?.province_id}
                />

                {/* Input Kabupaten/Kota */}
                <FormSelect
                    label="Kabupaten/Kota"
                    placeholder={"Pilih Kabupaten/Kota"}
                    options={regencies.map((regency) => ({
                        label: regency.name,
                        value: regency.id,
                    }))}
                    value={data?.regency_id}
                    onChange={(e) => setData("regency_id", e.target.value)}
                    error={errors?.regency_id}
                />
            </div>

            {/* Input Kecamatan dan Desa */}
            <div className="grid grid-cols-2 gap-6">
                <FormSelect
                    label="Kecamatan"
                    placeholder={"Pilih Kecamatan"}
                    options={districts.map((district) => ({
                        label: district.name,
                        value: district.id,
                    }))}
                    value={data?.district_id}
                    onChange={(e) => setData("district_id", e.target.value)}
                    error={errors?.district_id}
                />

                <FormSelect
                    label="Desa"
                    placeholder={"PIlih Desa"}
                    options={villages.map((village) => ({
                        label: village.name,
                        value: village.id,
                    }))}
                    value={data?.village_id}
                    onChange={(e) => setData("village_id", e.target.value)}
                    error={errors?.village_id}
                />
            </div>

            {/* Input RT dan RW */}
            <div className="grid grid-cols-2 gap-6">
                {/* Input RT */}
                <FormInput
                    label="RT"
                    value={data?.rt}
                    placeholder={"Masukkan RT"}
                    onChange={(e) => setData("rt", e.target.value)}
                    onBlur={(e) => setData("rt", e.target.value)}
                    error={errors.rt}
                />

                {/* Input RW */}
                <FormInput
                    label="RW"
                    value={data?.rw}
                    placeholder={"Masukkan RW"}
                    onChange={(e) => setData("rw", e.target.value)}
                    onBlur={(e) => setData("rw", e.target.value)}
                    error={errors.rw}
                />
            </div>
        </>
    );
}
