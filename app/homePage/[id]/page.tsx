
import KudoCardDetail from "@/app/components/KudoCardDetail";


export default async function DisplayKudo({ params }: any) {
    const res: any = await fetch(`http://localhost:8080/api/kudo/oneKudo/${params.id}`, { cache: 'no-store' });
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    const data: any = await res.json();

    return (
        <div>
            <KudoCardDetail kudo={data.data} />
        </div>
    )
}