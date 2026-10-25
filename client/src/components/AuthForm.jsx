import { useState } from "react";
import { Link } from "react-router-dom";


export default function AuthForm({ title, fields, submitLabel, onSubmit, footer }) {
  const [values, setValues] = useState(
    Object.fromEntries(fields.map((f) => [f.name, ""]))
  );
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    fields.forEach(({ name, label }) => {
      const v = values[name].trim();
      if (!v) e[name] = `${label} is required`;
      else if (name === "email" && !/^\S+@\S+\.\S+$/.test(v))
        e[name] = "Enter a valid email";
      else if (name === "password" && v.length < 6)
        e[name] = "Minimum 6 characters";
      else if (name === "confirmpassword" && values[name] !== values.password)
        e[name] = "Passwords do not match";
    });
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setServerError("");
    if (!validate()) return;
    setLoading(true);
    try {
      await onSubmit(values);
    } catch (err) {
      setServerError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-md rounded-lg bg-white p-6 shadow">
      <h1 className="mb-4 text-2xl font-semibold">{title}</h1>
      {serverError && (
        <p className="mb-3 rounded bg-red-100 p-2 text-sm text-red-700">
          {serverError}
        </p>
      )}
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {fields.map(({ name, label, type }) => (
          <div key={name}>
            <label className="mb-1 block text-sm font-medium">{label}</label>
            <input
              type={type}
              value={values[name]}
              onChange={(e) => setValues({ ...values, [name]: e.target.value })}
              className="w-full rounded border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none"
            />
            {errors[name] && (
              <p className="mt-1 text-xs text-red-600">{errors[name]}</p>
            )}
          </div>
        ))}
        <button
          disabled={loading}
          className="w-full rounded bg-indigo-600 p-2 text-white hover:bg-indigo-700 disabled:opacity-60"
        >
          {loading ? "Please wait..." : submitLabel}
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        {footer.text}{" "}
        <Link to={footer.to} className="text-indigo-600 hover:underline">
          {footer.link}
        </Link>
      </p>
    </div>
  );
}