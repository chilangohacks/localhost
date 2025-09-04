"use client"



import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RegisterPage() {
        const [email, setEmail] = useState("");
        const [name, setName] = useState("");
        const [github, setGithub] = useState("");
        const [dob, setDob] = useState("");
        const [phone, setPhone] = useState("");
        const [shirtSize, setShirtSize] = useState("");
        const [track, setTrack] = useState("");
        const [school, setSchool] = useState("");
        const [major, setMajor] = useState("");
        const [gradYear, setGradYear] = useState("");
        const [dietary, setDietary] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleRegister(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            email,
                            name,
                            github,
                            dob,
                            phone,
                            shirtSize,
                            track,
                            school,
                            major,
                            gradYear,
                            dietary,
                        }),
            });
            if (res.ok) {
                toast.success("¡Registro exitoso! Ahora inicia sesión.");
                setTimeout(() => router.push("/auth/login"), 1200);
            } else {
                setError("No se pudo registrar. Intenta de nuevo.");
                toast.error("No se pudo registrar. Intenta de nuevo.");
            }
        } catch {
            setError("Error de red. Intenta de nuevo.");
            toast.error("Error de red. Intenta de nuevo.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="relative">
            <div className="min-h-screen flex items-center justify-center px-2 py-8 z-10"
                style={{
                    margin: "130px auto",
                }}>
                <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
                <div className="bg-white/95 backdrop-blur-xl p-12 rounded-3xl shadow-2xl w-full max-w-2xl border border-[#9dd3e7]/30 bg-white text-black flex flex-col justify-center">
                    <div className="relative text-center mt-10 mb-8">
                        <h2 className="text-4xl font-extrabold mb-2 text-[#1775b0]">Registrarse</h2>
                        <p className="text-[#003468]/70 text-lg">Crea tu cuenta</p>
                    </div>
                    <form onSubmit={handleRegister} className="space-y-8 px-0 md:px-8">
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-semibold text-[#003468] block mb-1">Correo electrónico</label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="juan-lopez@unam.mx"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            required
                                            className="w-full border-2 border-[#9dd3e7]/50 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1775b0] focus:border-[#1775b0] text-base bg-white/80 hover:bg-white transition-all duration-300 text-[#003468]"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-semibold text-[#003468] block mb-1">Nombre completo</label>
                                        <Input
                                            id="name"
                                            type="text"
                                            placeholder="Juan López"
                                            value={name}
                                            onChange={e => setName(e.target.value)}
                                            required
                                            className="w-full border-2 border-[#9dd3e7]/50 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1775b0] focus:border-[#1775b0] text-base bg-white/80 hover:bg-white transition-all duration-300 text-[#003468]"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="github" className="text-sm font-semibold text-[#003468] block mb-1">Nombre de usuario de GitHub (opcional)</label>
                                        <Input
                                            id="github"
                                            type="text"
                                            placeholder="torvalds"
                                            value={github}
                                            onChange={e => setGithub(e.target.value)}
                                            className="w-full border-2 border-[#9dd3e7]/50 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1775b0] focus:border-[#1775b0] text-base bg-white/80 hover:bg-white transition-all duration-300 text-[#003468]"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="dob" className="text-sm font-semibold text-[#003468] block mb-1">Fecha de nacimiento</label>
                                        <Input
                                            id="dob"
                                            type="date"
                                            value={dob}
                                            onChange={e => setDob(e.target.value)}
                                            required
                                            className="w-full border-2 border-[#9dd3e7]/50 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1775b0] focus:border-[#1775b0] text-base bg-white/80 hover:bg-white transition-all duration-300 text-[#003468]"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="phone" className="text-sm font-semibold text-[#003468] block mb-1">Teléfono</label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            placeholder="55 1234 5678"
                                            value={phone}
                                            onChange={e => setPhone(e.target.value)}
                                            required
                                            className="w-full border-2 border-[#9dd3e7]/50 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1775b0] focus:border-[#1775b0] text-base bg-white/80 hover:bg-white transition-all duration-300 text-[#003468]"
                                        />
                                    </div>
                        <div className="space-y-2">
                            <label htmlFor="shirtSize" className="text-sm font-semibold text-[#003468] block mb-1">Talla de camiseta</label>
                            <select
                                id="shirtSize"
                                value={shirtSize}
                                onChange={e => setShirtSize(e.target.value)}
                                required
                                className="w-full border-2 border-[#9dd3e7]/50 p-4 rounded-2xl bg-white text-[#003468] focus:outline-none focus:ring-2 focus:ring-[#1775b0] focus:border-[#1775b0]"
                            >
                                <option value="">Selecciona una talla</option>
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="track" className="text-sm font-semibold text-[#003468] block mb-1">Track</label>
                            <select
                                id="track"
                                value={track}
                                onChange={e => setTrack(e.target.value)}
                                required
                                className="w-full border-2 border-[#9dd3e7]/50 p-4 rounded-2xl bg-white text-[#003468] focus:outline-none focus:ring-2 focus:ring-[#1775b0] focus:border-[#1775b0]"
                            >
                                <option value="">Selecciona un track</option>
                                <option value="OPEN">Innovación Abierta</option>
                                <option value="EDUCATION">Educación</option>
                                <option value="AI">Inteligencia Artificial</option>
                                <option value="ENVIRONMENT">Medio ambiente</option>
                                <option value="BUSINESS">Comercio</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="school" className="text-sm font-semibold text-[#003468] block mb-1">Escuela</label>
                            <Input
                                id="school"
                                type="text"
                                placeholder="UNAM, IPN, etc."
                                value={school}
                                onChange={e => setSchool(e.target.value)}
                                required
                                className="w-full border-2 border-[#9dd3e7]/50 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1775b0] focus:border-[#1775b0] text-base bg-white/80 hover:bg-white transition-all duration-300 text-[#003468]"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="major" className="text-sm font-semibold text-[#003468] block mb-1">Carrera</label>
                            <Input
                                id="major"
                                type="text"
                                placeholder="Ciencias de la Computación, Administración, etc."
                                value={major}
                                onChange={e => setMajor(e.target.value)}
                                required
                                className="w-full border-2 border-[#9dd3e7]/50 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1775b0] focus:border-[#1775b0] text-base bg-white/80 hover:bg-white transition-all duration-300 text-[#003468]"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="gradYear" className="text-sm font-semibold text-[#003468] block mb-1">Año de graduación</label>
                            <Input
                                id="gradYear"
                                type="number"
                                placeholder="2025"
                                value={gradYear}
                                onChange={e => setGradYear(e.target.value)}
                                required
                                className="w-full border-2 border-[#9dd3e7]/50 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1775b0] focus:border-[#1775b0] text-base bg-white/80 hover:bg-white transition-all duration-300 text-[#003468]"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="dietary" className="text-sm font-semibold text-[#003468] block mb-1">Restricción alimenticia</label>
                            <select
                                id="dietary"
                                value={dietary}
                                onChange={e => setDietary(e.target.value)}
                                required
                                className="w-full border-2 border-[#9dd3e7]/50 p-4 rounded-2xl bg-white text-[#003468] focus:outline-none focus:ring-2 focus:ring-[#1775b0] focus:border-[#1775b0]"
                            >
                                <option value="">Selecciona una opción</option>
                                <option value="NONE">Ninguna</option>
                                <option value="VEGETARIAN">Vegetariana</option>
                                <option value="VEGAN">Vegana</option>
                                <option value="HALAL">Halal</option>
                                <option value="KOSHER">Kosher</option>
                                <option value="GLUTEN_FREE">Sin gluten</option>
                                <option value="OTHER">Otra</option>
                            </select>
                        </div>
                        <Button
                            type="submit"
                            className="w-full focus:ring-2 focus:ring-[#1775b0] focus:ring-offset-2 flex items-center justify-center"
                            size="lg"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="flex items-center gap-2 justify-center">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                                    Registrando...
                                </span>
                            ) : "Registrarse"}
                        </Button>
                        {error && (
                            <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-2xl text-sm text-center font-medium animate-pulse">
                                {error}
                            </div>
                        )}
                    </form>
                    <div className="mt-8 mb-6 pt-6 border-t border-[#9dd3e7]/30 text-center">
                        <p className="text-xs text-[#003468]/60 font-medium flex items-center justify-center gap-2">
                            <span className="w-2 h-2 bg-[#1775b0] rounded-full"></span>
                            chilangohacks • Made with ❤️ in Mexico City
                            <span className="w-2 h-2 bg-[#1775b0] rounded-full"></span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
