import {Grid} from "@mui/material"
import {Link} from "react-router-dom"
import PageHeader from "../../components/common/PageHeader"
import AnalysesTypeCard from "../../components/card/AnalysesTypeCard"
import { useSelector } from "react-redux"

const PhysicalChemicalAnalyses = () => {

    const carbonatedProducts = useSelector(state => state.products.data.filter(product => product.is_carbonated))
    const nonCarbonatedProducts = useSelector(state => state.products.data.filter(product => !product.is_carbonated))

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <PageHeader/>
            </Grid>
            <Grid item xs={6}>
                <AnalysesTypeCard
                    title="Carbonated Drinks"
                    subtitle="Results of physical-chemical analyses of carbonated drinks"
                    chips={carbonatedProducts}
                    component={Link}
                    to="/physical-chemical-analyses/carbonated-drinks"
                />
            </Grid>
            <Grid item xs={6}>
                <AnalysesTypeCard
                    title="Non-Carbonated Drinks"
                    subtitle="Results of physical-chemical analyses of non-carbonated drinks"
                    chips={nonCarbonatedProducts}
                    component={Link}
                    to="/physical-chemical-analyses/non-carbonated-drinks"
                />
            </Grid>
            </Grid>
    )
}

export default PhysicalChemicalAnalyses