import { useEffect, useState } from "react";

const empty = { name: "", email: "", phone: "", company: "", status: "lead" };

export default function CustomerForm({ editing, onSave, onCancel }) {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    setValues(editing ? { ...empty, ...editing } : empty);
    setErrors({});
    setServerError("");
  }, [editing]);

  const set = (k) => (e) => setValues({ ...values, [k]: e.target.value });

  const validate = () => {
    const e = {};
    if (!values.name.trim()) e.name = "Name is required";
    if (!/^\S+@\S+\.\S+$/.test(values.email)) e.email = "Enter a valid email";
    if (values.phone && !/^[0-9+\-\s()]{7,15}$/.test(values.phone)) e.phone = "Invalid phone";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    setServerError("");
    if (!validate()) return;
    try {
      await onSave(values);
      setValues(empty);
    } catch (err) {
      setServerError(err.message);
    }
  };

  const input = "w-full rounded border border-gray-300 p-2 text-sm focus:border-indigo-500 focus:outline-none";

  return (
    <form onSubmit={submit} noValidate className="rounded-lg bg-white p-4 shadow">
      <h2 className="mb-3 text-lg font-semibold">{editing ? "Edit customer" : "Add customer"}</h2>
      {serverError && <p className="mb-3 rounded bg-red-100 p-2 text-sm text-red-700">{serverError}</p>}
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <input placeholder="Name *" value={values.name} onChange={set("name")} className={input} />
          {errors.name && <p className="text-xs text-red-600">{errors.name}</p>}
        </div>
        <div>
          <input placeholder="Email *" value={values.email} onChange={set("email")} className={input} />
          {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
        </div>
        <div>
          <input placeholder="Phone" value={values.phone} onChange={set("phone")} className={input} />
          {errors.phone && <p className="text-xs text-red-600">{errors.phone}</p>}
        </div>
        <input placeholder="Company" value={values.company} onChange={set("company")} className={input} />
      </div>
      <div className="mt-4 flex gap-2">
        <button className="rounded bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700">
          {editing ? "Update" : "Add"}
        </button>
        {editing && (
          <button type="button" onClick={onCancel} className="rounded border px-4 py-2 text-sm hover:bg-gray-50">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
