import { User } from "@/generated/prisma";
import resend from "./resend";


import CompleteProfileEmail from "./templates/completeProfile";
import OTPEmail from "./templates/otp";

export const sendEmail = async ({ to, user, template, otp }: { to: string, user: User, template: "completeProfile" | "otp", otp?: string }) => {
    try {
        const response = await resend.emails.send({
            from: "ChilangoHacks <no-reply@chilangohacks.co>",
            to,
            subject: (() => {
                switch (template) {
                    case "completeProfile":
                        return "¡Bienvenidx a ChilangoHacks! Completa tu perfil para asegurar tu lugar";
                    case "otp":
                        return "Tu código de acceso ChilangoHacks";
                    default:
                        return "‼️ [Información importante] ChilangoHacks";
                }
            })(),
            react: (() => {
                switch (template) {
                    case "completeProfile":
                        return CompleteProfileEmail({ name: user.name, completeProfileUrl: "https://chilangohacks.co/complete" });
                    case "otp":
                        return OTPEmail({ name: user.name, otp: otp || "" });
                    default:
                        return null;
                }
            })(),
        });
        return response;
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};