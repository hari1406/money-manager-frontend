import Dashboard from "../components/Dashboard";
import Summary from "../components/Summary";
import Accounts from "../components/Accounts";

export default function DashboardPage({ role }) {
  return (
    <div className="p-6 space-y-6">
      <Dashboard />
      <Summary />
      <Accounts role={role} />
    </div>
  );
}
