import { Badge, Mail } from "@mui/icons-material";
import useUser from "../../../hooks/useUser";
import LoadingHand from "../../../components/LoadingHand";
import { ChartBar } from "lucide-react";

const Profile = () => {
  const { userDB, loading } = useUser();

  if (loading) {
    return <LoadingHand />;
  }

  return (
    <div className="max-w-4xl flex items-center justify-center h-auto lg:h-[calc(100vh-115px)] flex-wrap mx-auto my-32 lg:my-0">
      <div
        id="profile"
        className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl lg:mx-0"
      >
        <div className="p-4 md:p-12 text-center lg:text-left">
          <div
            className="rounded-full shadow-xl mx-auto -mt-20 h-48 w-48 bg-cover bg-center mb-5"
            style={{
              backgroundImage: `url(${userDB.image})`,
            }}
          ></div>

          <h1 className="text-3xl font-bold pt-8 lg:pt-0">{userDB.name}</h1>
          <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25" />
          <p className="pt-4 text-base font-bold flex items-center justify-center gap-2 lg:justify-start">
            <Mail />
            {userDB.email}
          </p>
          <p className="pt-2 text-base font-bold flex items-center justify-center gap-2 lg:justify-start">
            <Badge />
            <br />
            {userDB.badge}
          </p>
          <p className="pt-2 text-base font-bold flex items-center justify-center gap-2 lg:justify-start">
            <ChartBar />
            <br />
            {userDB.role}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
