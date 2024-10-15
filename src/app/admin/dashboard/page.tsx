
import DashboardCard from "@/app/admin/components/DashboardCard";
import { OverviewIcon1, OverviewIcon2, OverviewIcon3, OverviewIcon4, OverviewIcon5, OverviewIcon6, OverviewIcon7, OverviewIcon8 } from "@/utils/svgicons";

const OverviewData = [
  {
    id: "1",
    icon: <OverviewIcon1 />,
    title: "Active Clinician",
    value: "20",
  },
  {
    id: "2",
    icon: <OverviewIcon2 />,
    title: "New Clinician",
    value: "36",
  },
  {
    id: "3", 
    icon: <OverviewIcon3 />,
    title: "Active Client",
    value: "201",
  },
  {
    id: "4",
    icon: <OverviewIcon4 />,
    title: "Active Client",
    value: "800",
  },
  {
    id: "5",
    icon: <OverviewIcon5 />,
    title: "Clinician Approved",
    value: "38",
  },
  {
    id: "6",
    icon: <OverviewIcon6 />,
    title: "Total Payment Requests",
    value: "3695",
  },
  {
    id: "7",
    icon: <OverviewIcon7 />,
    title: "Pending Payment Requests",
    value: "164",
  },
  {
    id: "8",
    icon: <OverviewIcon8 />,
    title: "Pending Clinical Reviews",
    value: "2",
  },
];
const Home = () => {


  return(
    <>      
    <h1 className="font-antic text-[#283C63] text-[30px] leading-[1.2em] mb-[25px] lg:text-[40px] lg:mb-[50px]">
      Welcome
    </h1>
    <h2 className="mb-[30px]">Overview</h2>
   <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-[15px] md:gap-[30px]">
   {OverviewData.map((card) =>(
    <DashboardCard 
     key={card.id}
     icon={card.icon}
     title={card.title}
     value={card.value}

    />
   ))}
   </div>
   
  </>
  );
};
export default Home

