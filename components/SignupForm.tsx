import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import PasswordToggle from "./PasswordToggle";



export function SignupForm() {


  return (
    <div className="text-center max-w-md">
      <div className="text-xl pb-4">SIGN UP</div>
      <Card className="w-full max-w-md shadow-md">
        <CardHeader>
        </CardHeader>
        <CardContent className="grid gap-8">
          <div className="grid grid-cols-2 gap-4">
            <Input id="firstName" type="text" placeholder="First Name" required />
            <Input id="lastName" type="text" placeholder="Last Name" required />
          </div>
          <Input id="address" type="text" placeholder="Address" required />
          <div className="grid grid-cols-2 gap-4">
            <Input id="email" type="email" placeholder="Email" required />
            <Input id="phoneNumber" type="tel" placeholder="Phone Number" required />
          </div>
          <PasswordToggle placeholder="Password"/>
<PasswordToggle placeholder="Confirm Password"/>
        </CardContent>
        <CardFooter className="flex justify-center content-center flex-col gap-y-8">
          <Button className="">Register</Button>
          <div>
            Already have an account? <Link href="#" className="text-blue-600">Sign In</Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}