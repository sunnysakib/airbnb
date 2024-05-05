import { CreatioBottomBar } from "@/app/components/CreatioBottomBar";
import Map from "@/app/components/Map";
import { useCountries } from "@/app/lib/getCountries";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import countries from "world-countries";

export default function AddressPage() {
    const {getAllCountries} = useCountries()
  return (
    <>
      <div className="w-3/5 mx-auto">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors mb-10">
          Where is your Home located?
        </h2>
      </div>

      <form action="">
        {/* <input type="hidden" name="homeId" value={params.id} />
        <input type="hidden" name="countryValue" value={locationValue} /> */}
        <div className="w-3/5 mx-auto mb-36">
          <div className="mb-5">
            <Select required >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Countries</SelectLabel>
                  {getAllCountries().map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.flag} {item.label} / {item.region}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
           <Map/>
        </div>

        <CreatioBottomBar />
      </form>
    </>
  );
}
