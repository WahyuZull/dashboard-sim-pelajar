import { Link, Head, useForm, usePage } from "@inertiajs/react";
import { HiBars3, HiXMark, HiBookmark } from "react-icons/hi2";
import { TfiStatsUp } from "react-icons/tfi";
import { CgDatabase } from "react-icons/cg";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { useEffect } from "react";
import FormInput from "@/Components/atoms/FormInput";
import { FiRefreshCcw, FiSearch } from "react-icons/fi";
import { FaCircleArrowUp } from "react-icons/fa6";
import { getCaptcha, getNewCaptcha } from "@/services/captcha.services";
import { toast } from "sonner";
import { FaRegUser } from "react-icons/fa";

export default function Welcome({ auth }) {
    const { flash } = usePage().props;

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showHeader, setShowHeader] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);

    const [anggota, setAnggota] = useState([]);
    const [captcha, setCaptcha] = useState("");

    const { data, setData, processing, get, errors } = useForm({
        nia: "",
        nama_lengkap: "",
        tanggal_lahir: "",
        captcha: "",
    });

    const navigation = [
        { name: "Beranda", href: "#beranda" },
        { name: "Fitur", href: "#features" },
        { name: "Tentang kami", href: "#about" },
    ];

    const features = [
        {
            name: "Data Anggota",
            description:
                "Informasi lengkap tentang data anggota organisasi, pelatihan dan lainnya.",
            icon: CgDatabase,
        },
        {
            name: "Administrasi Organisasi",
            description:
                "Menampilkan informasi lengkap tentang administrasi organisasi seperti struktur organisasi, daftar pengurus, dan administrasi lainnya.",
            icon: HiBookmark,
        },
        {
            name: "Statistik Organisasi dan Anggota",
            description:
                "Dapatkan informasi statistik lengkap mengenai struktur organisasi dan anggota, seperti jumlah pengurus, jumlah anggota, dan lainnya.",
            icon: TfiStatsUp,
        },
    ];

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success, {
                position: "top-center",
                closeButton: true,
            });
        }
        if (flash.error) {
            toast.error(flash.error, {
                position: "top-center",
                closeButton: true,
            });
        }
    }, [flash]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        getCaptcha().then((res) => {
            setCaptcha(res.data);
        });
    }, []);

    const handleScroll = () => {
        const scrollHeader = window.scrollY >= 10 ? "drop-shadow bg-white" : "";
        setShowHeader(scrollHeader);
        setShowScrollTop(window.scrollY >= 500 ? true : false);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const handleRefreshCaptcha = (e) => {
        e.preventDefault();
        getNewCaptcha().then((res) => {
            setCaptcha(res.data);
        });
    };

    const handleSearchNia = (e) => {
        e.preventDefault();
        const res = get(
            route("anggota.searchByNia", {
                nia: data.nia,
                captcha: data.captcha,
                key: captcha.key,
            })
        );
        setAnggota(res.data);
    };

    const handleSubmitTtl = (e) => {
        e.preventDefault();
        const res = get(
            route("anggota.searchByTtl", {
                nama_lengkap: data.nama_lengkap,
                tanggal_lahir: data.tanggal_lahir,
                captcha: data.captcha,
                key: captcha.key,
            })
        );
        setAnggota(res.data);
    };

    return (
        <>
            <Head title="Welcome" />

            <header className={`${showHeader} fixed inset-x-0 top-0 z-50`}>
                <nav
                    aria-label="Global"
                    className="flex items-center justify-between p-6 lg:px-8"
                >
                    <div className="flex lg:flex-1">
                        <Link href="#home" className="-m-1.5 p-1.5">
                            <span className="sr-only">SIM Pelajar Kudus</span>
                            <img
                                alt=""
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                className="h-8 w-auto"
                            />
                        </Link>
                    </div>
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(true)}
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        >
                            <span className="sr-only">Open main menu</span>
                            <HiBars3 aria-hidden="true" className="h-6 w-6" />
                        </button>
                    </div>
                    <div className="hidden lg:flex lg:gap-x-12">
                        {navigation.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="text-sm font-semibold leading-6 text-gray-900"
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        {auth.user ? (
                            <Link
                                href={route("dashboard.index")}
                                className="text-sm font-semibold leading-6 text-gray-900"
                            >
                                Dashboard{" "}
                            </Link>
                        ) : (
                            <Link
                                href={route("login")}
                                className="text-sm font-semibold leading-6 text-gray-900"
                            >
                                Log in <span aria-hidden="true">&rarr;</span>
                            </Link>
                        )}
                    </div>
                </nav>
                <Dialog
                    open={mobileMenuOpen}
                    onClose={setMobileMenuOpen}
                    className="lg:hidden"
                >
                    <div className="fixed inset-0 z-50" />
                    <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <Link href="#" className="-m-1.5 p-1.5">
                                <span className="sr-only">
                                    SIM Pelajar Kudus
                                </span>
                                <img
                                    alt=""
                                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                    className="h-8 w-auto"
                                />
                            </Link>
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(false)}
                                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            >
                                <span className="sr-only">Close menu</span>
                                <HiXMark
                                    aria-hidden="true"
                                    className="h-6 w-6"
                                />
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                    {navigation.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                                <div className="py-6">
                                    <Link
                                        href="#"
                                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                        Log in
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </header>

            {/* Beranda */}
            <section
                id="beranda"
                aria-labelledby="beranda-title"
                className="relative isolate px-6 pt-14 lg:px-8"
            >
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                >
                    <div
                        style={{
                            clipPath:
                                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                        }}
                        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-primary-two opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    />
                </div>
                <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                            SIM Pelajar NU Kudus
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Sistem Informasi dan Manajemen Pelajar NU Kudus{" "}
                            <br />
                            adalah aplikasi informasi dan menejerial Pelajar NU
                            di Kbupaten Kudus.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <a
                                href="#about"
                                className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                            >
                                Get started
                            </a>
                            <a
                                href="#features"
                                className="text-sm font-semibold leading-6 text-gray-900"
                            >
                                Learn more <span aria-hidden="true">→</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* About */}
            <section id="about" aria-labelledby="about-title">
                <div className="overflow-hidden bg-gray-50 py-24 sm:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center">
                            <h2
                                id="about-title"
                                className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
                            >
                                Apa itu SIM Pelajar Kudus?
                            </h2>
                            <p className="mt-2 text-lg leading-8 text-gray-600">
                                Aplikasi Sistem Informasi dan Manajemen (SIM)
                                Pelajar Kudus merupakan aplikasi yang
                                dikembangkan oleh Pelajar Kudus Dev. Aplikasi
                                ini dibangun untuk memudahkan dalam mengelola
                                data pelajar NU di Kabupaten Kudus serta
                                mengelola administrasi organisasi.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                <a
                                    href="#register"
                                    className="rounded-md bg-primary text-white px-3.5 py-2.5 text-sm font-semibold shadow-sm hover:bg-gray-100 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                                >
                                    Register
                                </a>
                                <Link
                                    href={route("login")}
                                    className="text-sm font-semibold leading-6 text-primary"
                                >
                                    Login <span aria-hidden="true">→</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section
                className="bg-white py-24 sm:py-32"
                id="features"
                aria-labelledby="features-title"
            >
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h2 className="text-base font-semibold leading-7 text-primary">
                            Fitur-fitur
                        </h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Tersedia semua fitur untuk manajemen organisasi
                        </p>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Semua fitur yang dibutuhkan untuk manajemen
                            organisasi seperti pendaftaran, pengelolaan data
                            anggota, pengelolaan data pelatihan, dan mengelola
                            administrasi organisasi.
                        </p>
                    </div>
                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
                            {features.map((feature) => (
                                <div
                                    key={feature.name}
                                    className="relative pl-16"
                                >
                                    <dt className="text-base font-semibold leading-7 text-gray-900">
                                        <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                                            <feature.icon
                                                aria-hidden="true"
                                                className="h-6 w-6 text-white"
                                            />
                                        </div>
                                        {feature.name}
                                    </dt>
                                    <dd className="mt-2 text-base leading-7 text-gray-600">
                                        {feature.description}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </section>

            {/* Cek Data */}
            <section>
                <div className="overflow-hidden bg-white py-24 sm:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                            <div className="lg:pr-8 lg:pt-4">
                                <div className="lg:max-w-lg">
                                    <h2 className="text-base font-semibold leading-7 text-primary">
                                        Cek datamu
                                    </h2>
                                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                        Pastikan sudah terdata
                                    </p>
                                    <p className="mt-6 text-lg leading-8 text-gray-600">
                                        Pastikan sudah terdata di sistem, agar
                                        kamu lebih mudah melakukan pengajuan
                                        atau pengecekan data tersebut.
                                    </p>

                                    {/* Pencarian data */}
                                    <div
                                        role="tablist"
                                        className="tabs tabs-lifted mt-10"
                                    >
                                        <input
                                            type="radio"
                                            name="tab_pencarian_data_anggota"
                                            role="tab"
                                            className="tab"
                                            aria-label="Cari berdasarkan NIA"
                                            defaultChecked
                                        />
                                        <div
                                            role="tabpanel"
                                            className="tab-content bg-base-100 border-base-300 rounded-box p-6"
                                        >
                                            <form
                                                onSubmit={handleSearchNia}
                                                className="custom-form"
                                            >
                                                <FormInput
                                                    label="Nomor Induk Anggota"
                                                    value={data?.nia}
                                                    placeholder="XX.11.02.******** atau XXXX.11.02.****"
                                                    onChange={(e) =>
                                                        setData(
                                                            "nia",
                                                            e.target.value
                                                        )
                                                    }
                                                    onBlur={(e) =>
                                                        setData(
                                                            "nia",
                                                            e.target.value
                                                        )
                                                    }
                                                    error={errors.nia}
                                                />
                                                <div className="flex space-x-4">
                                                    <img src={captcha.img} />
                                                    <span
                                                        className="btn btn-gosht"
                                                        onClick={
                                                            handleRefreshCaptcha
                                                        }
                                                    >
                                                        <FiRefreshCcw
                                                            size={20}
                                                        />
                                                    </span>
                                                </div>
                                                <div className="w-1/2">
                                                    <FormInput
                                                        label="Captcha"
                                                        value={data?.captcha}
                                                        onChange={(e) =>
                                                            setData(
                                                                "captcha",
                                                                e.target.value
                                                            )
                                                        }
                                                        onBlur={(e) =>
                                                            setData(
                                                                "captcha",
                                                                e.target.value
                                                            )
                                                        }
                                                        error={errors.captcha}
                                                    />
                                                </div>
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary"
                                                >
                                                    <FiSearch />
                                                    {processing
                                                        ? "Searching..."
                                                        : "Search"}
                                                </button>
                                            </form>
                                        </div>

                                        <input
                                            type="radio"
                                            name="tab_pencarian_data_anggota"
                                            role="tab"
                                            className="tab"
                                            aria-label="Cari berdasarkan tanggal lahir"
                                        />
                                        <div
                                            role="tabpanel"
                                            className="tab-content bg-base-100 border-base-300 rounded-box p-6"
                                        >
                                            <form
                                                onSubmit={handleSubmitTtl}
                                                className="custom-form"
                                            >
                                                <FormInput
                                                    label="Nama Lengkap"
                                                    value={data?.nama_lengkap}
                                                    placeholder="Mohammad Aminuddin"
                                                    onChange={(e) =>
                                                        setData(
                                                            "nama_lengkap",
                                                            e.target.value
                                                        )
                                                    }
                                                    onBlur={(e) =>
                                                        setData(
                                                            "nama_lengkap",
                                                            e.target.value
                                                        )
                                                    }
                                                    error={errors.nama_lengkap}
                                                />
                                                <FormInput
                                                    type="date"
                                                    label="Tanggal Lahir"
                                                    value={data?.tanggal_lahir}
                                                    onChange={(e) =>
                                                        setData(
                                                            "tanggal_lahir",
                                                            e.target.value
                                                        )
                                                    }
                                                    onBlur={(e) =>
                                                        setData(
                                                            "tanggal_lahir",
                                                            e.target.value
                                                        )
                                                    }
                                                    error={errors.tanggal_lahir}
                                                />
                                                <div className="flex space-x-4">
                                                    <img src={captcha.img} />
                                                    <span
                                                        className="btn btn-gosht"
                                                        onClick={
                                                            handleRefreshCaptcha
                                                        }
                                                    >
                                                        <FiRefreshCcw
                                                            size={20}
                                                        />
                                                    </span>
                                                </div>
                                                <div className="w-1/2">
                                                    <FormInput
                                                        label="Captcha"
                                                        value={data?.captcha}
                                                        onChange={(e) =>
                                                            setData(
                                                                "captcha",
                                                                e.target.value
                                                            )
                                                        }
                                                        onBlur={(e) =>
                                                            setData(
                                                                "captcha",
                                                                e.target.value
                                                            )
                                                        }
                                                        error={errors.captcha}
                                                    />
                                                </div>
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary"
                                                >
                                                    <FiSearch />
                                                    {processing
                                                        ? "Searching..."
                                                        : "Search"}
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center items-center">
                                <div className="overflow-hidden max-w-xl rounded-2xl shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_10px_10px_-5px_rgba(0,0,0,0.04)] ring-1 ring-gray-400/10 bg-[url('/bg/bg-colorfull.jpg')] bg-cover bg-center">
                                    <div className="px-4 py-8">
                                        <div className="card bg-white/70 shadow">
                                            <div className="card-body text-xs md:text-sm">
                                                <div className="card-title">
                                                    <hr className="bg-green-300 h-2 w-full mb-3" />
                                                </div>
                                                <div className="flex flex-auto space-x-3">
                                                    <table className="w-full">
                                                        <tbody>
                                                            <tr>
                                                                <td className=" font-medium">
                                                                    NIA
                                                                </td>
                                                                <td className="">
                                                                    :
                                                                </td>
                                                                <td className="">
                                                                    {anggota?.nia
                                                                        ? anggota?.nia
                                                                        : "XX.02.****.****"}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className=" font-medium">
                                                                    Nama Lengkap
                                                                </td>
                                                                <td className="">
                                                                    :
                                                                </td>
                                                                <td className="">
                                                                    {anggota?.nama_lengkap
                                                                        ? anggota?.nama_lengkap
                                                                        : "Ilham Ridwan"}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className=" font-medium">
                                                                    Tempat dan
                                                                    Tanggal
                                                                    Lahir
                                                                </td>
                                                                <td className="">
                                                                    :
                                                                </td>
                                                                <td className="">
                                                                    {anggota?.tempat_lahir
                                                                        ? anggota?.tempat_lahir
                                                                        : "Jember"}
                                                                    ,{" "}
                                                                    {anggota?.tanggal_lahir
                                                                        ? anggota?.tanggal_lahir
                                                                        : "01-02-2000"}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className=" font-medium">
                                                                    Alamat
                                                                </td>
                                                                <td className="">
                                                                    :
                                                                </td>
                                                                <td className="">
                                                                    Jember
                                                                    Wetan, Kulon
                                                                    Kali
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <div>
                                                        {anggota?.foto ? (
                                                            <div className="w-24 h-32 overflow-hidden rounded-lg">
                                                                <img
                                                                    src={getMediaUrl(
                                                                        anggota?.foto
                                                                    )}
                                                                    className="w-full h-full object-cover object-center"
                                                                />
                                                            </div>
                                                        ) : (
                                                            <div className="w-24 h-32 grid place-items-center bg-base-200 rounded-lg">
                                                                <FaRegUser
                                                                    size={36}
                                                                    className="text-neutral"
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <p className="mt-4 font-medium">
                                                    Kartu Tanda Anggota ini
                                                    berlaku sampai dengan yang
                                                    bersangkutan tidak lagi
                                                    memenuhi persyaratan
                                                    keanggotaan IPNU
                                                </p>
                                                {data?.jenis_kelamin ===
                                                "Laki-laki" ? (
                                                    <p className="uppercase font-bold text-center mt-4">
                                                        Pimpinan Cabang <br />
                                                        Ikatan Pelajar Nahdlatul
                                                        Ulama <br />
                                                        Kabupaten Kudus
                                                    </p>
                                                ) : data?.jenis_kelamin ===
                                                  "Perempuan" ? (
                                                    <p className="uppercase font-bold text-center mt-4">
                                                        Pimpinan Cabang <br />
                                                        Ikatan Pelajar Putri
                                                        Nahdlatul Ulama <br />
                                                        Kabupaten Kudus
                                                    </p>
                                                ) : (
                                                    <p className="uppercase font-bold text-center mt-4">
                                                        Pimpinan Cabang <br />
                                                        Ikatan Pelajar Nahdlatul
                                                        Ulama <br />
                                                        Kabupaten Kudus
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Register */}
            <section id="register" aria-labelledby="about-title">
                <div className="overflow-hidden bg-gray-50 py-24 sm:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center">
                            <h2
                                id="about-title"
                                className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
                            >
                                Kamu belum terdata?
                            </h2>
                            <p className="mt-2 text-lg leading-8 text-gray-600">
                                Segera daftarkan dirimu melalui Pimpinan
                                Ranting/ Komisariat/ Anak Cabang di wilayahmu
                                atau daftarkan dirimu secara mandiri melalui
                                link dibawah ini.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                <Link
                                    href={route("register")}
                                    className="rounded-md bg-primary text-white px-3.5 py-2.5 text-sm font-semibold shadow-sm hover:bg-gray-100 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                                >
                                    Daftar sekarang{" "}
                                    <span aria-hidden="true">→</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Back to top */}
            <div
                className={`${
                    showScrollTop ? "block" : "hidden"
                } ease-in-out duration-150 fixed bottom-5 right-5 z-40`}
            >
                <button onClick={scrollToTop}>
                    <FaCircleArrowUp size={30} color="#15804B" />
                </button>
            </div>

            {/* Footer */}
            <footer>
                <div className="footer bg-neutral text-primary-content p-10">
                    <div>
                        <span className="footer-title">Pelajar Kudus Dev</span>
                        <p>Jl. Pramuka No.20, Wergu Wetan</p>
                        <p>Kecamatan Kota Kudus, Kabupaten Kudus</p>
                        <p>Jawa Tengah 59318</p>
                    </div>
                    <nav>
                        <h6 className="footer-title">Menu</h6>
                        <a className="link link-hover" href="#">
                            Beranda
                        </a>
                        <a className="link link-hover" href="#features">
                            Fitur
                        </a>
                        <a className="link link-hover" href="#about">
                            Tentang kami
                        </a>
                    </nav>
                </div>
                <div className="footer bg-neutral text-primary-content border-base-300 border-t p-4">
                    <p>
                        Copyright © {new Date().getFullYear()} - All right
                        reserved by Pelajar Kudus Dev
                    </p>
                </div>
            </footer>
        </>
    );
}
