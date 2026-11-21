import HeroMix from "../../components/HeroMix/HeroMix";
import FilterSearch from "../../components/FilterSearch/FilterSearch";
import HomeProperties from "../../components/HomeProperties";

export default function HomePage() {

    return (
        <>
            <HeroMix></HeroMix>
            <FilterSearch></FilterSearch>
            <main>
                <HomeProperties></HomeProperties>
            </main>
        </>
    )
}
