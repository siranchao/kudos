import KudoCardDetail from "@/app/components/KudoCardDetail";
import Back from "@/app/components/Back";
import CardDetailTab from "@/app/components/CardDetailTab";

export default async function DisplayKudo({ params }: any) {
    const res: any = await fetch(`${process.env.NEXT_PUBLIC_API}/kudo/oneKudo/${params.id}`, { cache: 'no-store' });
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    const data: any = await res.json();
    console.log(data.data);
    return (
        <div>
            <Back />
            <KudoCardDetail kudo={data.data} />
            <CardDetailTab kudo={data.data} />
        </div>
    )
}