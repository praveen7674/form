"use client";
import React, { useState, useEffect } from "react";
import { init, useFocusable, FocusContext, setFocus } from "@noriginmedia/norigin-spatial-navigation";

init({
  distanceCalculationMethod: 'center',
});

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    alert(`Logging in with Username: ${username}, Password: ${password}`);
  };

  const { ref, focusKey } = useFocusable({
    focusable: true,
    saveLastFocusedChild: true,
    trackChildren: true,
    isFocusBoundary: true,
    autoRestoreFocus: true,
  });

  const usernameInput = useFocusable({ focusKey: "USERNAME" });
  const passwordInput = useFocusable({ focusKey: "PASSWORD" });
  const loginButton = useFocusable({ focusKey: "LOGIN", onEnterPress: handleLogin });

  useEffect(() => {
    setFocus("USERNAME");
  }, []);

  return (
    <FocusContext.Provider value={focusKey}>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[var(--font-sans)] bg-[var(--color-background)] text-[var(--color-foreground)]">
        <div className="flex flex-col items-center justify-center h-screen w-full" ref={ref}>
          <h1 className="text-2xl mb-6">Smart TV Login</h1>

          <input
            ref={usernameInput.ref}
            className={`p-3 rounded mb-4 w-64 bg-[var(--color-background)] text-[var(--color-foreground)] border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${usernameInput.focused ? "ring-2 ring-blue-500" : ""}`}
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            ref={passwordInput.ref}
            className={`p-3 rounded mb-4 w-64 bg-[var(--color-background)] text-[var(--color-foreground)] border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${passwordInput.focused ? "ring-2 ring-blue-500" : ""}`}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            ref={loginButton.ref}
            className={`p-3 rounded w-64 bg-blue-500 text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-white ${loginButton.focused ? "ring-2 ring-white" : ""}`}
          >
            Login
          </button>
        </div>
      </div>
    </FocusContext.Provider>
  );
}
