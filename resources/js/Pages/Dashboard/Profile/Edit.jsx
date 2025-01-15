import FormInput from "@/Components/atoms/FormInput";
import FormSelect from "@/Components/atoms/FormSelect";
import MediaLibrary from "@/Components/organisms/MediaLibrary";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { HiArrowUpTray } from "react-icons/hi2";

export default function EditProfile() {
    const page = usePage().props;
    const { user, pimpinans } = page;
    const { data, setData, patch, processing, errors } = useForm({
        profile_picture:
            user?.detail?.profile_picture ??
            "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
        name: user?.name ?? "",
        email: user?.email ?? "",
        pimpinan_id: user?.pimpinan_id ?? "",
    });

    const handleConfirmMedia = (selectedMedia) => {
        setData("profile_picture", selectedMedia);
        // Do something with the selected media
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route("dashboard.profile.update"));
    };

    return (
        <DashboardLayout>
            <Head title="Profile" />
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-bold uppercase mb-2">Edit Profile</h1>
                    <div className="text-sm breadcrumbs">
                        <ul>
                            <li>
                                <Link href={route("dashboard.index")}>
                                    Dashboard
                                </Link>
                            </li>
                            <li>Edit Profile</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="page-section">
                <div className="page-section__header">
                    <h3 className="page-section__title">
                        Customize your profile
                    </h3>
                </div>
                <div className="page-section__body">
                    <form
                        onSubmit={handleSubmit}
                        className="form-wrapper p-4 max-w-xl"
                    >
                        <div>
                            <img
                                className="w-32 h-32 rounded-full object-cover"
                                src={data?.profile_picture}
                                alt=""
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() =>
                                document
                                    .getElementById("media-library-modal")
                                    .showModal()
                            }
                            className="btn btn-primary btn-outline mt-4"
                        >
                            <HiArrowUpTray />
                            Upload Your Photo
                        </button>

                        <div>
                            <FormInput
                                label="Name"
                                value={data?.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                error={errors?.name}
                            />
                            <FormInput
                                label="Email Address"
                                value={data?.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                error={errors?.email}
                            />
                            <FormSelect
                                label="Pimpinan"
                                value={data?.pimpinan_id}
                                options={pimpinans.map((pimpinan) => ({
                                    value: pimpinan.id,
                                    label: pimpinan.name,
                                }))}
                                onChange={(e) =>
                                    setData("pimpinan_id", e.target.value)
                                }
                                error={errors?.pimpinan_id}
                            />
                        </div>
                        <div className="text-right pt-5">
                            <button className="btn btn-primary">Save</button>
                        </div>
                    </form>
                </div>
            </div>
            <MediaLibrary multiple={false} onConfirm={handleConfirmMedia} />
        </DashboardLayout>
    );
}
