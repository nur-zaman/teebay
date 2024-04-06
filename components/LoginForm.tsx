import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import PasswordToggle from "./PasswordToggle"

export function LoginForm() {
  return (
    <div className=" text-center  max-w-sm ">
    <div className="text-xl pb-4">SIGN IN</div>
    <Card className="w-full max-w-sm shadow-md">
    
      <CardHeader>
        {/* <CardTitle className="text-2xl">Login</CardTitle> */}
        {/* <CardDescription>
          Enter your email below to login to your account.
        </CardDescription> */}
      </CardHeader>
      <CardContent className="grid gap-8 ">
        <div className="grid gap-4">
          {/* <Label htmlFor="email">Email</Label> */}
          <Input id="email" type="email" placeholder="Email" required />
        </div>
        <div className="grid gap-4">
          {/* <Label htmlFor="password">Password</Label> */}
          <PasswordToggle placeholder="Password"/>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center content-center flex-col gap-y-8">
        <Button className="">Sign in</Button>
        <div>Don't have an account? <Link href="#" className=" text-blue-600">Sign Up</Link></div>
      </CardFooter>
    </Card>
    </div>
  )
}
