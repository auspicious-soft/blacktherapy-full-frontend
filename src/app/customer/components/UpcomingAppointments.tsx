import React, { useState, CSSProperties } from "react";
import Image from "next/image";
import ReactPaginate from "react-paginate";
import PervIcon from "@/assets/images/pervicon.png";
import NextIcon from "@/assets/images/nexticon.png";

const UpcomingAppointments = (props:any) => {
  const {data, error} = props; 
  const {setQuery} = props;
  
  const upcomingData = data?.data;
  const { isLoading } = props
  const total = data?.total ?? 0;
  console.log('total:', total);
  const rowsPerPage = 10;
  const handlePageClick = (selectedItem: { selected: number }) => {
    setQuery(`page=${selectedItem.selected + 1}&limit=${rowsPerPage}`)
  }

  // const data = [ 
  //   {
  //     id: 1,
  //     apptDate: "12 September 2024",
  //     apptTime: "09:30 AM",
  //     chatWithClinician: "Start Chat",
  //     videoChat: "Start Chat",
  //     billingAmount: "$25.00",
  //   },
  //   {
  //     id: 2,
  //     apptDate: "20 September 2024",
  //     apptTime: "09:30 AM",
  //     chatWithClinician: "Start Chat",
  //     videoChat: "Unavailable Now",
  //     billingAmount: "$25.00",
  //   },
  //   {
  //     id: 3,
  //     apptDate: "21 September 2024",
  //     apptTime: "09:30 AM",
  //     chatWithClinician: "Unavailable Now",
  //     videoChat: "Start Chat",
  //     billingAmount: "$25.00",
  //   },
  //   // Add more data as needed
  // ];
  // ReactPaginate
  

  const getStyle = (text: string): CSSProperties => {
    let style: CSSProperties = {
      padding: "2px 10px",
      borderRadius: "20px",
      display: "inline-block",
      fontSize: "10px",
    };

    switch (text) {
      case "Unavailable Now":
        style.backgroundColor = "#FFFCEC";
        style.color = "#FFA234";
        break;
      case "Start Chat":
      case "Start Video Call":
        style.backgroundColor = "#CBFFB2";
        style.color = "#42A803";
        break;

      default:
        break;
    }

    return style;
  };

  return (
    <>
      <div className="table-common">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Appt Date</th>
              <th>Appt Time</th>
              <th>Chat With Clinician</th>
              <th>Video Chat</th>
              <th>Billing Amount</th>
            </tr>
          </thead>
          <tbody>
          {isLoading ? (
              <tr>
                <td colSpan={5} className="">
                  Loading...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={5} className="text-center text-red-500 ">
                  Error loading data.
                </td>
              </tr>
            ) : upcomingData?.length > 0 ? (
            upcomingData?.map((item: any) => (
              <tr key={item?._id}>
                <td>{item?._id}</td>
                <td>{item.apptDate}</td>
                <td>{item.apptTime}</td>
                <td>
                      <p className={`font-gothamMedium text-center rounded-3xl py-[2px] px-[10px] text-[10px] ${item.chat === 'Start Chat' ? ' text-[#42A803] bg-[#CBFFB2] ' : ' text-[#FFA234] bg-[#FFFCEC] '}`}>
                        {!item.message ? 'No chat' : <p className='cursor-pointer font-gothamMedium text-center rounded-3xl py-[2px] px-[10px] text-[10px]  text-[#42A803] bg-[#CBFFB2]'>Start Chat</p>}
                      </p>
                    </td>
                <td>{!item.video ? 'No video' : <p className='cursor-pointer font-gothamMedium text-center rounded-3xl py-[2px] px-[10px] text-[10px]  text-[#42A803] bg-[#CBFFB2]'>Start Video</p>}</td>
                <td>{item.billingAmount}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                className="w-full flex justify-center p-3 items-center"
                colSpan={5}
              >
                No data found
              </td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
      <div className="text-right reactpaginate ">
        <ReactPaginate
          previousLabel={<Image src={PervIcon} alt="PervIcon" />}
          nextLabel={<Image src={NextIcon} alt="NextIcon" />}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={Math.ceil(total / rowsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={
            "inline-flex mt-[34px] rounded-[5px] border border-[#d5dce9]"
          }
          pageClassName={"text-[#26395e]"} // List item
          pageLinkClassName={"py-2 px-4 inline-block"} // Anchor tag
          activeClassName={"bg-[#26395e] rounded-[5px] text-white"} // Active anchor
          previousLinkClassName={"py-2 px-4 inline-block"}
          nextLinkClassName={"py-2 px-4 inline-block"}
          disabledClassName={"opacity-50 cursor-not-allowed"}
        />
      </div>
    </>
  );
};
export default UpcomingAppointments;
