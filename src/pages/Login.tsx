import Loginform from "@/components/custom/Loginform"
import { Label } from "@/components/ui/label"
import { Shield } from "lucide-react"

export default function Login() {
  return (
    <div className="flex min-h-screen w-full flex-row">
      <div className="hidden w-1/2 flex-col bg-[url('/assets/background_auth.jpg')] bg-cover bg-center sm:flex">
        <div className="m-5 p-5">
          <div className="mb-5 flex flex-row items-center gap-2">
            <Shield className="text-primary"></Shield>
            <Label className="text-2xl text-primary">Enrolment App</Label>
          </div>
          <div className="mt-5 flex w-2/3 flex-row items-center text-left">
            <Label className="text-md text-slate-600">
              Secure biometric and demographic data capture portal. Restricted
              to authorized government agents.
            </Label>
          </div>
        </div>

        <div className="m-5 mt-auto p-5">
          <div className="flex flex-row gap-2 text-sm text-primary">
            <Shield></Shield>
            <Label>End-to-End Encrypted Session</Label>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-center bg-[#F8F9FA] text-center sm:w-1/2">
        <Loginform></Loginform>
        <div className="mt-auto mb-5">
          <Label className="text-slate-400">
            © 2024 National Identity Systems. Restricted Government Access.
          </Label>
        </div>
      </div>
    </div>
  )
}
