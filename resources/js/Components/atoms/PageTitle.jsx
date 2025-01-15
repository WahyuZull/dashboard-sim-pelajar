import { Link } from "@inertiajs/react";

export default function PageTitle({
    title,
    links = [],
    btnLink,
    btnTitle,
    btnHandler,
    // Untuk beberapa tombol gunakan code dibawah ini
    // buttonsLink = [],
    btnLinks = [],
}) {
    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="font-bold uppercase mb-2">{title}</h1>
                <div className="text-sm breadcrumbs">
                    <ul>
                        <li>
                            <Link href={route("dashboard.index")}>
                                Dashboard
                            </Link>
                        </li>
                        {links.map((link, index) => {
                            if (!link.active) {
                                return (
                                    <li key={index}>
                                        <Link href={link.url}>
                                            {link.title}
                                        </Link>
                                    </li>
                                );
                            }
                            return <li key={index}>{link.title}</li>;
                        })}
                    </ul>
                </div>
            </div>

            {btnTitle && btnLink && btnLink !== "#" && (
                <div className="btn btn-primary btn-outline btn-sm">
                    <Link href={btnLink}>{btnTitle}</Link>
                </div>
            )}

            {btnTitle && btnLink === "#" && btnHandler && (
                <button
                    onClick={btnHandler}
                    className="btn btn-primary btn-outline btn-sm"
                >
                    {btnTitle}
                </button>
            )}

            {btnLinks.length > 0 && (
                <div className="flex items-center justify-center gap-4">
                    {btnLinks.map((btn, index) => {
                        return (
                            <div
                                className="btn btn-primary btn-outline btn-sm"
                                key={index}
                            >
                                <Link href={btn.link}>{btn.title}</Link>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Untuk beberapa tombol gunakna code dibawah */}
            {/* <div className="flex items-center gap-2">
                {title &&
                    buttonsLink.map((btn, index) => {
                        return (
                            <div
                                className="btn btn-primary btn-outline btn-sm"
                                key={index}
                            >
                                <Link href={btn.link}>{btn.title}</Link>
                            </div>
                        );
                    })}
            </div> */}
        </div>
    );
}
