// src/lib/localAuth.ts

export const localAuth = {
  getUser: () => {
    // Try to get the stored user
    const user = localStorage.getItem("user");
    if (user) return JSON.parse(user);

    // If none exists, create a fake one
    const fakeUser = {
      id: "local-user",
      email: "student@local.app",
      user_metadata: { full_name: "Local Student" },
    };
    localStorage.setItem("user", JSON.stringify(fakeUser));
    return fakeUser;
  },

  signOut: () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  },
};
