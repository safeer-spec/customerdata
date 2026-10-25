import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomerForm from "../components/CustomerForm.jsx";
import { api } from "../api.js";

const badge = {
  lead: "bg-yellow-100 text-yellow-800",
  active: "bg-green-100 text-green-800",
  inactive: "bg-gray-200 text-gray-700",
};

export default function Userdata() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const handleError = (err) => {
    if (err.status === 401) {
      localStorage.clear();
      navigate("/login");
    } else setError(err.message);
  };

  useEffect(() => {
    (async () => {
      try {
        const [me, list] = await Promise.all([api.me(), api.getCustomers()]);
        setUser(me.user);
        setCustomers(list);
      } catch (err) {
        handleError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const save = async (values) => {
    if (editing) {
      const updated = await api.updateCustomer(editing._id, values);
      setCustomers(customers.map((c) => (c._id === updated._id ? updated : c)));
      setEditing(null);
    } else {
      const created = await api.addCustomer(values);
      setCustomers([created, ...customers]);
    }
  };

  const remove = async (id) => {
    if (!confirm("Delete this customer?")) return;
    try {
      await api.deleteCustomer(id);
      setCustomers(customers.filter((c) => c._id !== id));
    } catch (err) {
      handleError(err);
    }
  };

  if (loading) return <p className="p-8 text-center">Loading...</p>;

  return (
    <div className="space-y-4">
      <div className="rounded-lg bg-white p-4 shadow">
        <p className="text-sm text-gray-500">Logged in as</p>
        <p className="font-semibold">{user?.name} <span className="font-normal text-gray-600">({user?.email})</span></p>
      </div>

      {error && <p className="rounded bg-red-100 p-2 text-sm text-red-700">{error}</p>}

      <CustomerForm editing={editing} onSave={save} onCancel={() => setEditing(null)} />

      <div className="overflow-x-auto rounded-lg bg-white shadow">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Company</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.length === 0 && (
              <tr><td colSpan="6" className="p-6 text-center text-gray-500">No customers yet</td></tr>
            )}
            {customers.map((c) => (
              <tr key={c._id} className="border-t">
                <td className="p-3 font-medium">{c.name}</td>
                <td className="p-3">{c.email}</td>
                <td className="p-3">{c.phone || "-"}</td>
                <td className="p-3">{c.company || "-"}</td>
                <td className="p-3">
                  <span className={`rounded-full px-2 py-1 text-xs ${badge[c.status]}`}>{c.status}</span>
                </td>
                <td className="space-x-2 p-3 text-right">
                  <button onClick={() => { setEditing(c); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="text-indigo-600 hover:underline">Edit</button>
                  <button onClick={() => remove(c._id)} className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
