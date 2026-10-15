import PropTypes from "prop-types";
import { FilterProvider } from './contexts/FiltersContext.jsx'


export default function GlobalProvider({ children }) {


    return (

        <FilterProvider>
            {children}

        </FilterProvider>
    )




}

GlobalProvider.propTypes = {
    children: PropTypes.node
};