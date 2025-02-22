import { useState } from "react";

interface RegisterFormProps {
    setUser: (user: { id: string; name: string; email: string }) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ setUser }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleRegister = async (event: React.FormEvent) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        const response = await fetch("/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            console.log("Registration successful", data);
            setUser(data.user); // Directly update state after signup
        } else {
            setError(data.error || "Registration failed");
        }
    };

    return (
        <form
            onSubmit={handleRegister}
            className="flex flex-col items-center justify-center text-center p-6 bg-gray-700 rounded-lg shadow-md"
        >
            <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 px-4 py-2 w-full rounded-lg border border-gray-900 text-gray-800"
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 px-4 py-2 w-full rounded-lg border border-gray-900 text-gray-800"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 px-4 py-2 w-full rounded-lg border border-gray-900 text-gray-800"
            />
            <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-2 px-4 py-2 w-full rounded-lg border border-gray-900 text-gray-800"
            />
            {error && <p className="text-red-500">{error}</p>}
            <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                Register
            </button>
        </form>
    );
};

export default RegisterForm;
