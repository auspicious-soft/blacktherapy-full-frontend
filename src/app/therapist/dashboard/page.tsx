
import ResourceCards from "@/app/therapist/components/ResourceCards";
import { OverviewIcon2, OverviewIcon3, OverviewIcon4, OverviewIcon5, OverviewIcon6, } from "@/utils/svgicons";
import WelcomeCard from "@/app/therapist/components/WelcomeCard";
import { auth } from "@/auth";
import { getTherapistDashboardStats, getTherapistsAlerts } from "@/services/therapist/therapist-service.";
import { LottieNotification } from "@/components/notification-lottie";



const OverviewData = [
  // {
  //   id: "1",
  //   icon: <OverviewIcon1 />,
  //   title: "Invoice Submission/ Payment Request",
  //   value:
  //     "Submit request for payment for service provided and documentation completed.",
  //   link: "/therapist/payment-request",
  //   target: "_self",
  // },
  {
    id: "2",
    icon: <OverviewIcon2 />,
    title: "OnPay(Payroll System)",
    value: "Link to payroll system; paystub, Direct deposit, Tax Document, Ect",
    link: "https://app.onpay.com/app/login",
    target: "_blank",
  },
  {
    id: "3",
    icon: <OverviewIcon3 />,
    title: "Agency Policies & Procedures",
    value: "Employee Handbook, Policies & Procedures, and Rules",
    link: "https://drive.google.com/drive/folders/1l1hjzMSde0rcNDKVZF3yNl2DyuvYmV1R",
    target: "_blank",
  },
  {
    id: "4",
    icon: <OverviewIcon4 />,
    title: "Documents & Resources",
    value:
      "Submit request for payment for service provided and documentation completed.",
    link: "https://drive.google.com/drive/folders/1kRItBD39mI3Os0CgLllztnOsvIewfFpj",
    target: "_blank",
  },
  {
    id: "5",
    icon: <OverviewIcon5 />,
    title: "Training & Orientation",
    value: "Employee Training Videos and Resources",
    link: "/therapist/training",
    target: "_self",
  },
  {
    id: "6",
    icon: <OverviewIcon6 />,
    title: "Simple Practice ",
    value: "Practice forms and document",
    link: "https://secure.simplepractice.com/users/sign_in",
    target: "_blank",
  },
];

export default async function Home() {
  const session = await auth();
  const response = await getTherapistDashboardStats(`/therapist/dashboard/${session?.user?.id}`);
  const name  = session?.user?.name;
  const CardsData = await response?.data?.data;
  const alerts = await getTherapistsAlerts(`/therapist/notifications/${session?.user?.id}`);
  const alertsData = await alerts.data?.data;

  const CardData = [
    {
      id: "1",
      title: "Total Clients",
      countText: CardsData?.totalClients,
      bgColor: "#CCE9FA",
    },
    {
      id: "2",
      title: "Open Tasks",
      countText: CardsData?.myOpenTasks,
      bgColor: "#FFBBCD",
    },
    {
      id: "3",
      title: "Pending Video Chat",
      countText: CardsData?.pendingVideoChat,
      bgColor: "#FFD899",
    },
  ];
  return (
    <div>
      <div className="flex justify-between items-center ">
        <h1 className="text-[40px]">Welcome {name} 👋</h1>
        <LottieNotification data={alertsData} id={session?.user?.id} />
      </div>
      <div className="grid md:grid-cols-3 gap-[25px] my-[50px]">
        {CardData.map((cards) => (
          <WelcomeCard
            key={cards.id}
            title={cards.title}
            countText={cards.countText}
            bgColor={cards.bgColor}
          />
        ))}
      </div>
      <h2 className="mb-5"> Employee Resource Portal</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-[30px]">
        {OverviewData.map((card) => (
          <ResourceCards
            key={card.id}
            icon={card.icon}
            title={card.title}
            value={card.value}
            link={card.link}
            target={card.target as string}
          />
        ))}
      </div>
    </div>
  );
}
