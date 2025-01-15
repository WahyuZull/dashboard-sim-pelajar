import MenuLink from "@/Components/atoms/MenuLink";
import { Link, router, usePage } from "@inertiajs/react";
import React, { useEffect } from "react";
import {
    HiBars3,
    HiOutlineHome,
    HiOutlineLockClosed,
    HiOutlineUsers,
} from "react-icons/hi2";
import { toast } from "sonner";
import { MdOutlineSearch, MdOutlineSettings } from "react-icons/md";
import { LuCopyright } from "react-icons/lu";
import { BsClipboard2Check } from "react-icons/bs";
import { useState } from "react";

export default function DashboardLayout({ children }) {
    const { flash, auth } = usePage().props;
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
        if (flash.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    const canAccessMenu = (...roles) =>
        roles.includes(auth?.user?.roles[0]?.name);

    return (
        <div className="w-full overflow-x-hidden">
            <header className="navbar bg-base-100 fixed top-0 left-0 w-full shadow z-50">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                        <button
                            className="btn btn-ghost text-xl"
                            onClick={() => setIsOpen((isOpen) => !isOpen)}
                        >
                            <HiBars3 size={24} />
                        </button>
                        <div className="px-4 py-2">
                            <a className="navbar-brand font-bold">
                                SIM IPNU IPPNU KUDUS
                            </a>
                        </div>
                    </div>
                    <div className="">
                        <div className="dropdown dropdown-end">
                            <div
                                tabIndex={0}
                                role="button"
                                className="btn btn-ghost btn-circle avatar"
                            >
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="Tailwind CSS Navbar component"
                                        src={
                                            auth?.user?.detail
                                                ?.profile_picture ??
                                            "https://ui-avatars.com/api/?name=" +
                                                auth?.user?.name
                                        }
                                    />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                            >
                                <li>
                                    <Link
                                        href={route("dashboard.profile.edit")}
                                        className="justify-between"
                                    >
                                        Profile
                                        {/* <span className="badge">New</span> */}
                                    </Link>
                                </li>

                                <li>
                                    <a
                                        onClick={() =>
                                            router.post(route("logout"))
                                        }
                                    >
                                        Logout
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
            <aside
                className={`${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } fixed top-0 left-0 w-[250px] z-[40] bg-neutral overflow-y-auto h-full md:translate-x-0 transform transition-transform duration-200 ease-in-out`}
            >
                <ul className="menu mt-20 overflow-y-auto">
                    <MenuLink
                        icon={<HiOutlineHome size={18} />}
                        link={route("dashboard.index")}
                        title="Dashboard"
                    />

                    {canAccessMenu("admin", "super-admin") && (
                        <MenuLink
                            icon={<HiOutlineUsers size={18} />}
                            title="Anggota"
                            items={[
                                {
                                    link: route("dashboard.anggota"),
                                    title: "Semua Anggota",
                                },
                                {
                                    link: route("dashboard.anggota.create"),
                                    title: "Tambah Anggota",
                                },
                            ]}
                        />
                    )}
                    {canAccessMenu("secretary", "super-admin") && (
                        <MenuLink
                            icon={<BsClipboard2Check size={18} />}
                            link={route("dashboard.surats")}
                            title="Surat-surat"
                        />
                    )}
                    <MenuLink
                        icon={<MdOutlineSearch size={18} />}
                        link={route("dashboard.referensi")}
                        title="Referensi"
                    />
                    {canAccessMenu("super-admin") && (
                        <>
                            <MenuLink
                                icon={<MdOutlineSettings size={18} />}
                                title="Settings"
                                items={[
                                    {
                                        link: route("dashboard.pimpinans"),
                                        title: "Pimpinan",
                                    },
                                    {
                                        link: route("dashboard.pelatihans"),
                                        title: "Pelatihan",
                                    },
                                    {
                                        link: route("dashboard.media"),
                                        title: "Sertifikat",
                                    },
                                ]}
                            />
                            <MenuLink
                                icon={<HiOutlineLockClosed size={18} />}
                                title="Authentication"
                                items={[
                                    {
                                        link: route("dashboard.users"),
                                        title: "All Users",
                                    },
                                    {
                                        link: route("dashboard.roles"),
                                        title: "Roles",
                                    },
                                    {
                                        link: route("dashboard.permissions"),
                                        title: "Permissions",
                                    },
                                ]}
                            />
                        </>
                    )}
                </ul>
            </aside>
            <div className="main-content w-full md:pl-[250px] pt-[90px] bg-base-200">
                <div className="custom-container space-y-4 min-h-[100vh] ">
                    {children}
                    <footer className="pb-4 text-sm flex items-center space-x-2">
                        <LuCopyright />
                        <p className="">
                            {new Date().getFullYear()} PC IPNU IPPNU Kabupaten
                            Kudus
                        </p>
                    </footer>
                </div>
            </div>
        </div>
    );
}
