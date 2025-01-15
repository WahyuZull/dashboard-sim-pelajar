import { Link } from "@inertiajs/react";
import React from "react";

export default function MenuLink({ title, link, icon, items = [] }) {
    const location = window.location.href;
    return (
        <li className="text-white">
            {items.length > 0 ? (
                <details open={true}>
                    <summary>
                        {icon}
                        {title}
                    </summary>
                    <ul>
                        {items.map((item, index) => {
                            return (
                                <li key={`menu-item-${index}`}>
                                    <Link
                                        href={item.link}
                                        className={`${
                                            item.link === location
                                                ? "bg-white text-gray-900 font-semibold"
                                                : "text-white"
                                        } rounded-lg hover:bg-white hover:text-gray-900`}
                                    >
                                        {item.title}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </details>
            ) : (
                <Link
                    href={link}
                    className={`${
                        link === location
                            ? "bg-white text-gray-900 font-semibold"
                            : "text-white"
                    } rounded-lg hover:bg-white hover:text-gray-900`}
                >
                    {icon}
                    {title}
                </Link>
            )}
        </li>
    );
}
