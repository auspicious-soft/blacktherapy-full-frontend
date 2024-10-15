import ResourceCards from "@/app/therapist/components/ResourceCards";
import Image from "next/image";
import { OverviewIcon1, OverviewIcon2, OverviewIcon3, OverviewIcon4, OverviewIcon5, OverviewIcon6 } from "@/utils/svgicons";
import WelcomeCard from "@/app/therapist/components/WelcomeCard";
const OverviewData = [
  {
    id: "1",
    icon: <OverviewIcon1 />,
    title: "Invoice Submission/ Payment Request",
    value: "Submit request for payment for service provided and documentation completed.",
  },
  {
    id: "2",
    icon: <OverviewIcon2 />,
    title: "OnPay(Payroll System)",
    value: "Link to payroll system; paystub, Direct deposit, Tax Document, Ect",
  },
  {
    id: "3", 
    icon: <OverviewIcon3 />,
    title: "Agency Policies & Procedures",
    value: "Employee Handbook, Policies & Procedures, and Rules",
  },
  {
    id: "4",
    icon: <OverviewIcon4 />,
    title: "Documents & Resources",
    value: "Submit request for payment for service provided and documentation completed.",
  },
  {
    id: "5",
    icon: <OverviewIcon5 />,
    title: "Training & Orientation",
    value: "Employee Training Videos and Resources",
  },
  {
    id: "6",
    icon: <OverviewIcon6 />,
    title: "Simple Practice ",
    value: "Practice forms and document",
  },
];
const CardData = [
   {
    id: "1",
    title: "Total Clients",
    countText: "34",
    bgColor: "#CCE9FA",
   },
   {
    id: "2",
    title: "Open Tasks",
    countText: "0",
    bgColor: "#FFBBCD",
   },
   {
    id: "3",
    title: "Pending Video Chat",
    countText: "1",
    bgColor: "#FFD899",
   },

];
export default function Home() {
  return (
  <div>
    <h1 className=" ">Welcome</h1>
    <div className="grid md:grid-cols-3 gap-[25px] my-[50px]">
      {CardData.map((cards)=>(
        <WelcomeCard 
        key={cards.id}
        title={cards.title}
        countText= {cards.countText}
        bgColor={cards.bgColor}
        />
      ))}
    </div>
    <h2 className="mb-5"> Employee Resource Portal</h2>

   <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-[30px]">
   {OverviewData.map((card) =>(
    <ResourceCards 
    key={card.id}
    icon={card.icon}
    title={card.title}
    value={card.value}
    />
  ))}
   </div>
  </div>
  );
}
