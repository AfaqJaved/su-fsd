"use client";

import List, {ListItems} from "@/app/List";
import React from "react";

export default function Home() {
    const [items, setItems] = React.useState<ListItems[]>([]);

    const getListsByCreatedDate = async () => {
        const response = await fetch("http://localhost:4000/createdDate", {method: "GET"});
        setItems(await response.json() as ListItems[]);
    }

    const getListsByFileNameAsc = async () => {
        const response = await fetch("http://localhost:4000/file/asc",{method: "GET"});
        setItems(await response.json() as ListItems[]);
    }


    const getListsByFileNameDesc = async () => {
        const response = await fetch("http://localhost:4000/file/desc",{method: "GET"});
        setItems(await response.json() as ListItems[]);
    }

    const onOptionChange = (value: string) => {
        setItems([]);
        if (value === "1") {
            getListsByCreatedDate();
        } else if (value === "2") {
            getListsByFileNameAsc();
        } else if (value === "3") {
            getListsByFileNameDesc();
        }
    }


    React.useEffect(() => {
        (async function () {
            await getListsByCreatedDate()
        })();
    }, [])



    return (
        <div
            className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <select onChange={(event) => onOptionChange(event.target.value)}>
                <option value={"1"} defaultValue={"1"}>Created Date</option>
                <option value={"2"}>File Name Asc</option>
                <option value={"3"}>File Name Desc</option>
            </select>
            <List items={items}></List>
        </div>
    );
}
