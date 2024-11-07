export interface ListItems {
    name: string;
    date: string;
}


export default function List({items}: { items: ListItems[] }) {
    return (
        <div
            className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            {items.map((item) => {
                return <div key={item.name}>
                    <h3>{item.name}</h3>
                    <p>{item.date}</p>
                </div>
            })}
        </div>
    );
}
