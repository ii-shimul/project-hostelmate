import Overview from "./Admin/Overview";
import StudentOverview from "./Student/Overview";
import CheckAdmin from "./CheckAdmin";

const OverviewGenerate = () => {
  const isAdmin = CheckAdmin();
  if (isAdmin) {
    return <Overview/>;
  }
  return <StudentOverview/>;
};

export default OverviewGenerate;