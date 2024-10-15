import React, { useState, CSSProperties } from "react";
import Image from "next/image";
import ReactPaginate from "react-paginate";
import PervIcon from "@/assets/images/pervicon.png";
import NextIcon from "@/assets/images/nexticon.png";

const UpcomingAppointments = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const data = [
    {
      id: 1,
      apptDate: "12 September 2024",
      apptTime: "09:30 AM",
      chatWithClinician: "Start Chat",
      videoChat: "Start Chat",
      billingAmount: "$25.00",
    },
    {
      id: 2,
      apptDate: "20 September 2024",
      apptTime: "09:30 AM",
      chatWithClinician: "Start Chat",
      videoChat: "Unavailable Now",
      billingAmount: "$25.00",
    },
    {
      id: 3,
      apptDate: "21 September 2024",
      apptTime: "09:30 AM",
      chatWithClinician: "Unavailable Now",
      videoChat: "Start Chat",
      billingAmount: "$25.00",
    },
    // Add more data as needed
  ];
  // ReactPaginate
  const rowsPerPage = 10;
  const indexOfLastRow = (currentPage + 1) * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);
  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

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
            {currentRows.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.apptDate}</td>
                <td>{item.apptTime}</td>
                <td>
                  {item.chatWithClinician === "Start Chat" ? (
                    <span
                      className="cursor-pointer"
                      style={getStyle("Start Chat")}
                    >
                      {item.chatWithClinician}
                    </span>
                  ) : (
                    <span style={getStyle("Unavailable Now")}>
                      {item.chatWithClinician}
                    </span>
                  )}
                </td>
                <td>
                 {item.videoChat === "Start Chat" ? (
                    <span
                      className="cursor-pointer"
                      style={getStyle("Start Chat")}
                    >
                      {item.videoChat}
                    </span>
                  ) : (
                    <span style={getStyle("Unavailable Now")}>
                      {item.videoChat}
                    </span>
                  )}
                </td>
                <td>{item.billingAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-right reactpaginate ">
        <ReactPaginate
          previousLabel={<Image src={PervIcon} alt="PervIcon" />}
          nextLabel={<Image src={NextIcon} alt="NextIcon" />}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={Math.ceil(data.length / rowsPerPage)}
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
