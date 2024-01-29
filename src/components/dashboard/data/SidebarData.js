import {
  FaFileInvoiceDollar,
  FaChartArea,
  FaTruck,
  FaCheckCircle,
} from "react-icons/fa";

const SidebarData = [
  {
    label: "Invoice Processing",
    items: ["Create New", "In-progress", "Resolution"],
    icon: FaFileInvoiceDollar,
  },
  {
    label: "Approvals",
    items: ["Pending Approvals", "Delegated Approvals", "Approval Histroy"],
    icon: FaCheckCircle,
  },
  {
    label: "Vendor Management",
    items: ["Add New", "Vendor Profiles"],
    icon: FaTruck,
  },
  {
    label: "Analytics",
    items: ["Financial Reports", "Vendor Reports", "Audit Trails"],
    icon: FaChartArea,
  },
];

export default SidebarData;
