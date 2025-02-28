import { LanguageProvider } from "@inlang/paraglide-next"
import { languageTag } from "@/paraglide/runtime.js"
import '@/styles/globals.css'
import { Fraunces, Nunito } from 'next/font/google'
import { Header, Footer } from '@/components/Layout'

const fraunces = Fraunces({ subsets: ['latin'], variable: "--font-fraunces" })
const nunito = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'ChilangoHacks',
  description: 'The first student hackathon in Mexico City'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LanguageProvider>
      <html lang={languageTag()}>
        <body className={`${fraunces.variable} ${nunito.className} antialiased flex flex-col min-h-screen w-full`}>
          {/*   <a id="mlh-trust-badge" style={{
            display: "block",
            maxWidth: "100px",
            minWidth: "60px",
            position: "fixed",
            right: "50px",
            top: "0",
            width: "10%",
            zIndex: 10000
          }} target="_blank">
            <Image
              width={50}
              height={50}
              src="https://s3.amazonaws.com/logged-assets/trust-badge/2025/mlh-trust-badge-2025-white.svg" alt="Major League Hacking 2025 Hackathon Season" style={{ width: "100%" }} />
          </a> */}
          <Header />
          <main className="flex-grow mt-0 px-0 bottom-0">
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </LanguageProvider>
  )
}

