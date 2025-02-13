import FormCheck from "@/Components/atoms/FormCheck";
import FormInput from "@/Components/atoms/FormInput";
import MediaLibrary from "@/Components/organisms/MediaLibrary";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import React from "react";
import { FiSave } from "react-icons/fi";
import { HiArrowUpTray } from "react-icons/hi2";

export default function ManageUser() {
    const page = usePage().props;
    const { user, roles } = page;
    const title = user ? "Edit User" : "Create User";

    const { data, setData, post, processing, errors, put } = useForm({
        name: user?.name ?? "",
        email: user?.email ?? "",
        password: "",
        password_confirmation: "",
        roles: user?.roles?.map((role) => role.name) ?? [],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (user) {
            put(route("dashboard.users.update", user.id));
        } else {
            post(route("dashboard.users.store"));
        }
    };

    return (
        <DashboardLayout>
            <Head title={title} />
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-bold uppercase mb-2">All Users</h1>
                    <div className="text-sm breadcrumbs">
                        <ul>
                            <li>
                                <Link href={route("dashboard.index")}>
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link href={route("dashboard.users")}>
                                    All Users
                                </Link>
                            </li>
                            <li>{title}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="page-section">
                <div className="page-section__header">
                    <h3 className="page-section__title">Form {title}</h3>
                </div>
                <div className="page-section__body">
                    <form onSubmit={handleSubmit} className="custom-form">
                        <FormInput
                            label="Nama"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            onBlur={(e) => setData("name", e.target.value)}
                            error={errors.name}
                        />
                        <FormInput
                            label="Email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            onBlur={(e) => setData("email", e.target.value)}
                            error={errors.email}
                        />
                        <FormInput
                            label="Password"
                            type="password"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            onBlur={(e) => setData("password", e.target.value)}
                            error={errors.password}
                        />
                        <FormInput
                            label="Password Confirmation"
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            onBlur={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            error={errors.password_confirmation}
                        />
                        <FormCheck
                            label="Roles"
                            value={data.roles}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setData("roles", [
                                        ...data.roles,
                                        e.target.value,
                                    ]);
                                } else {
                                    setData(
                                        "roles",
                                        data.roles.filter(
                                            (role) => role !== e.target.value
                                        )
                                    );
                                }
                            }}
                            error={errors.roles}
                            options={roles.map((role) => ({
                                label: role.display_name,
                                value: role.name,
                            }))}
                            layout="vertical"
                        />

                        <button type="submit" className="btn btn-primary">
                            <FiSave />
                            {processing ? "Saving..." : "Save"}
                        </button>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
}
