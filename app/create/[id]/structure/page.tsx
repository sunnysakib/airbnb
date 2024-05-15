import { createCategoryPage } from "@/app/actions";
import { CreatioBottomBar } from "@/app/components/CreationBottomBar";
import { SelectCategory } from "@/app/components/SelectCategory";


export default function StructureRoute({params}: {params: {id: string}}) {
    return(
        <>
            <div className="w-3/5 mx-auto">
                <h2 className="text-3xl font-semibold tracking-tight transition-colors">Which of these items are in your house?</h2>
            </div>
            <form action={createCategoryPage}>
                <input type="hidden" name="homeId" value={params.id} />
                <SelectCategory/>
                <CreatioBottomBar/>
            </form>
        </>
    )
}