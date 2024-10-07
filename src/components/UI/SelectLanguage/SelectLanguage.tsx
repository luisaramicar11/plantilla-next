import React from 'react';
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Dropdown } from "./SelectLanguageStyles"
export default function SelectLanguage(): React.ReactElement {
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        Cookies.set("locale", e.target.value);
        router.refresh();
    };

    return (
        <Dropdown onChange={handleChange}>
            <option value="en">English</option>
            <option value="es">Español</option>
        </Dropdown>
    );
}
