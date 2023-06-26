import { useSelector } from "react-redux";
import { DesignConditions, DwellingInfo, Location } from "./Project";
import { ProjectList } from "./ProjectList";

const ViewSwitcher = () => {
    const viewToRender = useSelector( state => state.viewSwitcher.viewToRender)

    const VIEWS_LIST = {
        ProjectList: <ProjectList />,
        Location: <Location />,
        DesignConditions: <DesignConditions />,
        DwellingInfo: <DwellingInfo />,
    }
    const DEFAULT_VIEW = <ProjectList />;

	return VIEWS_LIST[viewToRender] || DEFAULT_VIEW
};

export default ViewSwitcher;
