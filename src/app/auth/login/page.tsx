"use client"


import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [otpSent, setOtpSent] = useState(false)
    const [otp, setOtp] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    async function handleSendOTP(e: React.FormEvent) {
        e.preventDefault()
        setError("")
        setLoading(true)
        try {
            const res = await fetch("/api/auth/otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            })
            if (res.ok) {
                setOtpSent(true)
                toast.success("¡Correo enviado! Revisa tu bandeja de entrada.")
            } else {
                setError("No se pudo enviar el código. Verifica tu correo.")
                toast.error("No se pudo enviar el código. Verifica tu correo.")
            }
        } catch {
            setError("Error de red. Intenta de nuevo.");
            toast.error("Error de red. Intenta de nuevo.");
        } finally {
            setLoading(false)
        }
    }

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault()
        setError("")
        setLoading(true)
        try {
            const res = await fetch("/api/auth/otp/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp }),
            })
            if (res.ok) {
                toast.success("¡Sesión iniciada correctamente!")
                setTimeout(() => router.push("/dashboard"), 1200)
            } else {
                setError("Código incorrecto o expirado.")
                toast.error("Código incorrecto o expirado.")
            }
        } catch {
            setError("Error de red. Intenta de nuevo.");
            toast.error("Error de red. Intenta de nuevo.");
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="relative min-h-screen flex items-center justify-center">
            <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <div className="bg-white/95 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-full max-w-md border border-[#9dd3e7]/30 relative z-10 mx-4 bg-white text-black">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-semibold mb-2 text-[#1775b0]">Iniciar sesión</h2>
                    <p className="text-[#003468]/70 text-sm">Accede a tu cuenta</p>
                </div>

                {!otpSent ? (
                    <form onSubmit={handleSendOTP} className="space-y-8">
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-semibold text-[#003468] block mb-1">
                                Correo electrónico
                            </label>
                            <Input
                                id="email"
                                placeholder="juan-lopez@unam.mx"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full border-2 border-[#9dd3e7]/50 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1775b0] focus:border-[#1775b0] text-base bg-white/80 hover:bg-white transition-all duration-300 text-[#003468]"
                            />
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
                                    Enviando...
                                </span>
                            ) : "Enviar código"}
                        </Button>

                        {error && (
                            <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-2xl text-sm text-center font-medium animate-pulse">
                                {error}
                            </div>
                        )}
                    </form>
                ) : (
                    <form onSubmit={handleLogin} className="space-y-8">
                        <div className="text-center mb-6">
                            <p className="text-[#003468]/70 text-sm mb-4">
                                Hemos enviado un código a <span className="font-semibold text-[#003468]">{email}</span>
                            </p>
                            <button
                                type="button"
                                onClick={() => setOtpSent(false)}
                                className="text-[#1775b0] hover:text-[#003468] text-sm font-semibold underline transition-colors duration-200"
                            >
                                Cambiar correo
                            </button>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="otp" className="text-sm font-semibold text-[#003468] block text-center mb-1">
                                Código de verificación
                            </label>
                            <Input
                                id="otp"
                                type="text"
                                className="w-full border-2 border-[#9dd3e7]/50 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1775b0] focus:border-[#1775b0] text-2xl tracking-widest text-center font-mono bg-white/80 hover:bg-white transition-all duration-300 text-[#003468]"
                                placeholder="000000"
                                value={otp}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOtp(e.target.value)}
                                maxLength={6}
                                required
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-[#1775b0] hover:bg-[#003468] text-white font-semibold py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0 border-0 focus:ring-2 focus:ring-[#1775b0] focus:ring-offset-2 flex items-center justify-center"
                            size="lg"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="flex items-center gap-2 justify-center">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                                    Ingresando...
                                </span>
                            ) : "Ingresar"}
                        </Button>

                        {error && (
                            <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-2xl text-sm text-center font-medium animate-pulse">
                                {error}
                            </div>
                        )}
                    </form>
                )}

                <div className="mt-8 pt-6 border-t border-[#9dd3e7]/30 text-center">
                    <p className="text-xs text-[#003468]/60 font-medium flex items-center justify-center gap-2">
                        <span className="w-2 h-2 bg-[#1775b0] rounded-full"></span>
                        chilangohacks • Made with ❤️ in Mexico City
                        <span className="w-2 h-2 bg-[#1775b0] rounded-full"></span>
                    </p>
                </div>
            </div>
        </div>
    )
}
