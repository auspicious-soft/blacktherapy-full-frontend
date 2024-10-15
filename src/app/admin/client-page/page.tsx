import ClientTable from "@/app/admin/components/ClientTable";

const page = () => {
    return(
        <>
            <h1 className="font-antic text-[#283C63] text-[30px] leading-[1.2em] mb-[25px] lg:text-[40px] lg:mb-[50px]">
      Clients
    </h1>
    <ClientTable />
        </>
    );
};
export default page