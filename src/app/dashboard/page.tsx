

"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";



const USER_FIELDS = [
    "name", "email", "github", "phone", "dob", "school", "major", "gradYear", "dietary", "track", "shirtSize", "projectUrl", "historicalCheckIn", "status", "userType", "isBanned", "banReason"
];
const REQUIRED_FIELDS = ["name", "email", "phone", "dob", "track", "shirtSize", "gradYear", "school", "major"];

export default function Dashboard() {
    const [user, setUser] = useState<any>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [edit, setEdit] = useState(false);
    const [form, setForm] = useState<any>({});
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        fetch("/api/user")
            .then(async (r) => {
                if (r.status === 401) {
                    window.location.href = "/auth/login";
                    return;
                }
                const data = await r.json();
                setUser(data);
                setIsAdmin(data.userType === "ADMIN");
                setForm({
                    name: data.name || "",
                    email: data.email || "",
                    github: data.github || "",
                    phone: data.phone || "",
                    dob: data.dob ? data.dob.slice(0, 10) : "",
                    school: data.school || "",
                    major: data.major || "",
                    gradYear: data.gradYear ? data.gradYear.slice(0, 4) : "",
                    dietary: data.dietary || "",
                    track: data.track || "",
                    shirtSize: data.shirtSize || "",
                    projectUrl: data.projectUrl || "",
                    historicalCheckIn: data.historicalCheckIn || false,
                    status: data.status || "PENDING",
                    userType: data.userType || "PARTICIPANT",
                    isBanned: data.isBanned || false,
                    banReason: data.banReason || "",
                });
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
                setError("No se pudo cargar la información de usuario.");
            });
    }, []);

    const missingFields = user && REQUIRED_FIELDS.filter((f) => !user[f]);

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        // Only allow admins to update userType, status, isBanned, banReason
        const payload: any = {
            ...form,
            dob: form.dob ? new Date(form.dob).toISOString() : null,
            gradYear: form.gradYear ? new Date(form.gradYear + "-01-01").toISOString() : null,
            historicalCheckIn: Boolean(form.historicalCheckIn),
        };
        if (!form.github) {
            delete payload.github;
        }
        if (!isAdmin) {
            delete payload.userType;
            delete payload.status;
            delete payload.isBanned;
            delete payload.banReason;
        } else {
            payload.isBanned = Boolean(form.isBanned);
        }
        const res = await fetch("/api/user", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        if (res.ok) {
            setSuccess("¡Información actualizada!");
            setEdit(false);
            const updated = await res.json();
            setUser(updated);
        } else {
            const err = await res.json();
            setError(err.error || "Error al actualizar.");
        }
    };

    if (loading) return <div className="flex justify-center items-center min-h-screen">Cargando...</div>;

    return (
        <div className="relative">
            <div className="min-h-screen flex items-center justify-center px-2 py-8 z-10" style={{ margin: "130px auto" }}>
                <div className="bg-white/95 backdrop-blur-xl p-12 rounded-3xl shadow-2xl w-full max-w-2xl border border-[#9dd3e7]/30 bg-white text-black flex flex-col justify-center">
                    <div className="relative text-center mt-10 mb-8">
                        <h2 className="text-4xl font-extrabold mb-2 text-[#1775b0]">Dashboard</h2>
                        <p className="text-[#003468]/70 text-lg">Edita o completa tu información</p>
                    </div>
                    {error && <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-2xl text-sm text-center font-medium animate-pulse mb-4">{error}</div>}
                    {success && <div className="bg-green-50 border-2 border-green-200 text-green-700 px-4 py-3 rounded-2xl text-sm text-center font-medium animate-pulse mb-4">{success}</div>}
                    {(!user || missingFields.length > 0 || edit) ? (
                        <form onSubmit={handleSubmit} className="space-y-8 px-0 md:px-8">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-semibold text-[#003468] block mb-1">Nombre completo</label>
                                <Input id="name" name="name" value={form.name} onChange={handleChange} placeholder="Nombre completo" required className="w-full border-2 border-[#9dd3e7]/50 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1775b0] focus:border-[#1775b0] text-base bg-white/80 hover:bg-white transition-all duration-300 text-[#003468]" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-semibold text-[#003468] block mb-1">Correo electrónico</label>
                                <Input id="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" required type="email" className="w-full border-2 border-[#9dd3e7]/50 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1775b0] focus:border-[#1775b0] text-base bg-white/80 hover:bg-white transition-all duration-300 text-[#003468]" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="github" className="text-sm font-semibold text-[#003468] block mb-1">GitHub (opcional)</label>
                                <Input id="github" name="github" value={form.github} onChange={handleChange} placeholder="GitHub" className="w-full border-2 border-[#9dd3e7]/50 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1775b0] focus:border-[#1775b0] text-base bg-white/80 hover:bg-white transition-all duration-300 text-[#003468]" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="phone" className="text-sm font-semibold text-[#003468] block mb-1">Teléfono</label>
                                <Input id="phone" name="phone" value={form.phone} onChange={handleChange} placeholder="Teléfono" required className="w-full border-2 border-[#9dd3e7]/50 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1775b0] focus:border-[#1775b0] text-base bg-white/80 hover:bg-white transition-all duration-300 text-[#003468]" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="dob" className="text-sm font-semibold text-[#003468] block mb-1">Fecha de nacimiento</label>
                                <Input id="dob" name="dob" value={form.dob} onChange={handleChange} type="date" placeholder="Fecha de nacimiento" required className="w-full border-2 border-[#9dd3e7]/50 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1775b0] focus:border-[#1775b0] text-base bg-white/80 hover:bg-white transition-all duration-300 text-[#003468]" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="school" className="text-sm font-semibold text-[#003468] block mb-1">Escuela</label>
                                <Input id="school" name="school" value={form.school} onChange={handleChange} placeholder="Escuela" required className="w-full border-2 border-[#9dd3e7]/50 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1775b0] focus:border-[#1775b0] text-base bg-white/80 hover:bg-white transition-all duration-300 text-[#003468]" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="major" className="text-sm font-semibold text-[#003468] block mb-1">Carrera</label>
                                <Input id="major" name="major" value={form.major} onChange={handleChange} placeholder="Carrera" required className="w-full border-2 border-[#9dd3e7]/50 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1775b0] focus:border-[#1775b0] text-base bg-white/80 hover:bg-white transition-all duration-300 text-[#003468]" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="gradYear" className="text-sm font-semibold text-[#003468] block mb-1">Año de graduación</label>
                                <Input id="gradYear" name="gradYear" value={form.gradYear} onChange={handleChange} type="number" min="1900" max="2100" placeholder="Año de graduación" required className="w-full border-2 border-[#9dd3e7]/50 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1775b0] focus:border-[#1775b0] text-base bg-white/80 hover:bg-white transition-all duration-300 text-[#003468]" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="dietary" className="text-sm font-semibold text-[#003468] block mb-1">Restricción alimenticia</label>
                                <select id="dietary" name="dietary" value={form.dietary} onChange={handleChange} className="w-full border-2 border-[#9dd3e7]/50 p-4 rounded-2xl bg-white text-[#003468] focus:outline-none focus:ring-2 focus:ring-[#1775b0] focus:border-[#1775b0]">
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
                            <div className="space-y-2">
                                <label htmlFor="track" className="text-sm font-semibold text-[#003468] block mb-1">Track</label>
                                <select id="track" name="track" value={form.track} onChange={handleChange} required className="w-full border-2 border-[#9dd3e7]/50 p-4 rounded-2xl bg-white text-[#003468] focus:outline-none focus:ring-2 focus:ring-[#1775b0] focus:border-[#1775b0]">
                                    <option value="">Selecciona un track</option>
                                    <option value="OPEN">Innovación Abierta</option>
                                    <option value="EDUCATION">Educación</option>
                                    <option value="AI">Inteligencia Artificial</option>
                                    <option value="ENVIRONMENT">Medio ambiente</option>
                                    <option value="BUSINESS">Comercio</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="shirtSize" className="text-sm font-semibold text-[#003468] block mb-1">Talla de camiseta</label>
                                <select id="shirtSize" name="shirtSize" value={form.shirtSize} onChange={handleChange} required className="w-full border-2 border-[#9dd3e7]/50 p-4 rounded-2xl bg-white text-[#003468] focus:outline-none focus:ring-2 focus:ring-[#1775b0] focus:border-[#1775b0]">
                                    <option value="">Selecciona una talla</option>
                                    <option value="S">S</option>
                                    <option value="M">M</option>
                                    <option value="L">L</option>
                                    <option value="XL">XL</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="projectUrl" className="text-sm font-semibold text-[#003468] block mb-1">URL de proyecto (opcional)</label>
                                <Input id="projectUrl" name="projectUrl" value={form.projectUrl} onChange={handleChange} placeholder="URL de proyecto (opcional)" className="w-full border-2 border-[#9dd3e7]/50 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1775b0] focus:border-[#1775b0] text-base bg-white/80 hover:bg-white transition-all duration-300 text-[#003468]" />
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="historicalCheckIn" name="historicalCheckIn" checked={!!form.historicalCheckIn} onChange={e => setForm((f: any) => ({ ...f, historicalCheckIn: e.target.checked }))} />
                                <label htmlFor="historicalCheckIn" className="text-sm font-semibold text-[#003468]">Check-in histórico</label>
                            </div>
                            {isAdmin && (
                                <>
                                    <div className="space-y-2">
                                        <label htmlFor="status" className="text-sm font-semibold text-[#003468] block mb-1">Status</label>
                                        <select id="status" name="status" value={form.status} onChange={handleChange} className="w-full border-2 border-[#9dd3e7]/50 p-4 rounded-2xl bg-white text-[#003468] focus:outline-none focus:ring-2 focus:ring-[#1775b0] focus:border-[#1775b0]">
                                            <option value="PENDING">Pendiente</option>
                                            <option value="ACCEPTED">Aceptado</option>
                                            <option value="REJECTED">Rechazado</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="userType" className="text-sm font-semibold text-[#003468] block mb-1">Tipo de usuario</label>
                                        <select id="userType" name="userType" value={form.userType} onChange={handleChange} className="w-full border-2 border-[#9dd3e7]/50 p-4 rounded-2xl bg-white text-[#003468] focus:outline-none focus:ring-2 focus:ring-[#1775b0] focus:border-[#1775b0]">
                                            <option value="PARTICIPANT">Participante</option>
                                            <option value="STAFF">Staff</option>
                                            <option value="ADMIN">Admin</option>
                                        </select>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input type="checkbox" id="isBanned" name="isBanned" checked={!!form.isBanned} onChange={e => setForm((f: any) => ({ ...f, isBanned: e.target.checked }))} />
                                        <label htmlFor="isBanned" className="text-sm font-semibold text-[#003468]">¿Baneado?</label>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="banReason" className="text-sm font-semibold text-[#003468] block mb-1">Razón de baneo (opcional)</label>
                                        <Input id="banReason" name="banReason" value={form.banReason} onChange={handleChange} placeholder="Razón de baneo (opcional)" className="w-full border-2 border-[#9dd3e7]/50 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1775b0] focus:border-[#1775b0] text-base bg-white/80 hover:bg-white transition-all duration-300 text-[#003468]" />
                                    </div>
                                </>
                            )}
                            <Button type="submit" variant="secondary" className="w-full bg-[#1775b0] focus:ring-2 focus:ring-[#1775b0] focus:ring-offset-2 flex items-center justify-center" size="lg">Guardar</Button>
                            {user && !edit && (
                                <Button type="button" variant="default" className="w-full" onClick={() => setEdit(false)}>Cancelar</Button>
                            )}
                        </form>
                    ) : (
                        <>
                            <ul className="text-lg">
                                <li><strong>Nombre:</strong> {user.name}</li>
                                <li><strong>Email:</strong> {user.email}</li>
                                <li><strong>GitHub:</strong> {user.github}</li>
                                <li><strong>Teléfono:</strong> {user.phone}</li>
                                <li><strong>Fecha de nacimiento:</strong> {user.dob ? new Date(user.dob).toLocaleDateString() : ""}</li>
                                <li><strong>Escuela:</strong> {user.school}</li>
                                <li><strong>Carrera:</strong> {user.major}</li>
                                <li><strong>Graduación:</strong> {user.gradYear ? new Date(user.gradYear).getFullYear() : ""}</li>
                                <li><strong>Dieta:</strong> {user.dietary}</li>
                                <li className="flex items-center gap-2"><strong>Track:</strong> {user.track && (
                                    <span className={
                                        "inline-block px-3 py-1 rounded-full text-xs font-semibold " +
                                        (user.track === "OPEN" ? "bg-blue-100 text-blue-700" :
                                         user.track === "EDUCATION" ? "bg-green-100 text-green-700" :
                                         user.track === "AI" ? "bg-purple-100 text-purple-700" :
                                         user.track === "ENVIRONMENT" ? "bg-emerald-100 text-emerald-700" :
                                         user.track === "BUSINESS" ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-700")
                                    }>
                                        {user.track === "OPEN" ? "Innovación Abierta" :
                                         user.track === "EDUCATION" ? "Educación" :
                                         user.track === "AI" ? "Inteligencia Artificial" :
                                         user.track === "ENVIRONMENT" ? "Medio ambiente" :
                                         user.track === "BUSINESS" ? "Comercio" : user.track}
                                    </span>
                                )}</li>
                                <li><strong>Talla de camiseta:</strong> {user.shirtSize}</li>
                                <li><strong>URL de proyecto:</strong> {user.projectUrl}</li>
                                <li><strong>Check-in histórico:</strong> {user.historicalCheckIn ? "Sí" : "No"}</li>
                                <li className="flex items-center gap-2"><strong>Status:</strong> {user.status && (
                                    <span className={
                                        "inline-block px-3 py-1 rounded-full text-xs font-semibold " +
                                        (user.status === "PENDING" ? "bg-gray-200 text-gray-700" :
                                         user.status === "ACCEPTED" ? "bg-green-200 text-green-800" :
                                         user.status === "REJECTED" ? "bg-red-200 text-red-800" : "bg-gray-100 text-gray-700")
                                    }>
                                        {user.status === "PENDING" ? "Pendiente" :
                                         user.status === "ACCEPTED" ? "Aceptado" :
                                         user.status === "REJECTED" ? "Rechazado" : user.status}
                                    </span>
                                )}</li>
                                {user.banReason && <li><strong>Razón de baneo:</strong> {user.banReason}</li>}
                            </ul>
                            <Button className="mt-4 w-full bg-[#1775b0]" onClick={() => setEdit(true)} variant="secondary">Editar información</Button>
                        </>
                    )}
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
