import { supabase } from "@/lib/supabaseClient";

interface User {
    id: string;
    name: string;
    email: string;
    account_number: string;
    balance: number;
    currency: string;
}

interface HomeContentProps {
    user: User;
    setUser: (user: null) => void;
}

const HomeContent: React.FC<HomeContentProps> = ({ user, setUser }) => {
    const handleLogout = async () => {
        await supabase.auth.signOut();
        await fetch("/api/auth/logout", { method: "POST" });
        setUser(null);
    };

    return (
        <div className="flex flex-col items-center justify-center text-center p-6 bg-gray-700 rounded-lg shadow-md w-96">
            <h1 className="text-2xl font-bold text-white">Welcome, {user.name || "Guest"}!</h1>
            <p className="text-lg mt-2 text-gray-300">Email: {user.email}</p>
            <p className="text-lg text-gray-300">User ID: {user.id}</p>
            <p className="text-lg font-semibold mt-4 text-white">Account Number: {user.account_number}</p>
            <p className="text-lg font-semibold text-green-400">Balance: {user.balance.toFixed(2)} {user.currency}</p>

            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                Change Currency
            </button>
            <button
                onClick={handleLogout}
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
                Logout
            </button>
        </div>
    );
};

export default HomeContent;
