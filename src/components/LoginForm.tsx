import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface LoginFormProps {
    setUser: (user: { id: string; email: string; name: string }) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ setUser }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();

        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            setError(error.message);
            return;
        }

        const { data: userData } = await supabase.auth.getUser();

        if (userData.user) {
            console.log("User logged in:", userData.user);
            setUser({
                id: userData.user.id,
                email: userData.user.email || "",
                name: userData.user.user_metadata?.name || "Guest",
            });
        }
    };

    return (
        <form
            onSubmit={handleLogin}
            className="flex flex-col items-center justify-center text-center p-6 bg-gray-700 rounded-lg shadow-md"
        >
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
            {error && <p className="text-red-500">{error}</p>}
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                Login
            </button>
        </form>
    );
};

export default LoginForm;
