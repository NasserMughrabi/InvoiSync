import { FaMoneyCheckDollar } from "react-icons/fa6";
import { FaCheckCircle, FaHourglassStart } from "react-icons/fa";

const CardsData = [
    {
      label: "Start Workflow",
      icon: FaHourglassStart,
      vendors: [
        { name: "Vendor 1", filesNum: 4 },
        { name: "Vendor 2", filesNum: 5 },
        { name: "Vendor 3", filesNum: 14 },
        { name: "Vendor 3", filesNum: 14 },
      ],
    },
    {
      label: "Awaiting Approval",
      icon: FaCheckCircle,
      vendors: [
        { name: "Vendor 1", filesNum: 2 },
        { name: "Vendor 2", filesNum: 51 },
        { name: "Vendor 3", filesNum: 10 },
        { name: "Vendor 3", filesNum: 10 },
        { name: "Vendor 3", filesNum: 10 },
        { name: "Vendor 3", filesNum: 10 },
        { name: "Vendor 3", filesNum: 10 },
        { name: "Vendor 3", filesNum: 10 },
        { name: "Vendor 3", filesNum: 10 },
        { name: "Vendor 3", filesNum: 10 },
      ],
    },
    {
      label: "Awaiting Payment",
      icon: FaMoneyCheckDollar,
      vendors: [
        { name: "Vendor 1", filesNum: 6 },
        { name: "Vendor 2", filesNum: 7 },
        { name: "Vendor 3", filesNum: 24 },
        { name: "Vendor 3", filesNum: 24 },
      ],
    },
    {
      label: "Recent",
      icon: FaMoneyCheckDollar,
      vendors: [
        { name: "Vendor 1", filesNum: 6 },
        { name: "Vendor 2", filesNum: 7 },
        { name: "Vendor 3", filesNum: 24 },
        { name: "Vendor 3", filesNum: 24 },
      ],
    },
    {
      label: "Analytics",
      icon: FaMoneyCheckDollar,
      vendors: [
        { name: "Vendor 1", filesNum: 6 },
        { name: "Vendor 2", filesNum: 7 },
        { name: "Vendor 3", filesNum: 24 },
        { name: "Vendor 3", filesNum: 24 },
      ],
    },
    {
      label: "Manager Approval",
      icon: FaMoneyCheckDollar,
      vendors: [
        { name: "Vendor 1", filesNum: 6 },
        { name: "Vendor 2", filesNum: 7 },
        { name: "Vendor 3", filesNum: 24 },
        { name: "Vendor 3", filesNum: 24 },
      ],
    },
  ];

  export default CardsData