// Small fetch wrapper that attaches the JWT and throws readable errors
const request = async (url, method = "GET", body) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`/api${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.message || "Something went wrong");
    err.status = res.status;
    throw err;
  }
  return data;
};

export const api = {
  register: (d) => request("/users/register", "POST", d),
  login: (d) => request("/users/login", "POST", d),
  me: () => request("/users/me"),
  getCustomers: () => request("/customers"),
  addCustomer: (d) => request("/customers", "POST", d),
  updateCustomer: (id, d) => request(`/customers/${id}`, "PUT", d),
  deleteCustomer: (id) => request(`/customers/${id}`, "DELETE"),
};
