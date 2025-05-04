import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Signin() {
  const schema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  const { control, handleSubmit, formState } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };
  

  return (
    <div className="flex bg-blue-200 min-h-screen justify-center items-center flex-col">
      <Card className="w-96">
        <CardContent className="space-y-2">
          <CardTitle className="text-xl font-semibold text-center mb-4">
            Loan System
          </CardTitle>
          <div>
            <Input placeholder="Email" {...control.register("email")} />
            <p className="text-red-500 text-sm">
              {formState.errors.email?.message}
            </p>
          </div>
          <div>
            <Input
              placeholder="Password"
              type="password"
              {...control.register("password")}
            />
            <p className="text-red-500 text-sm">
              {formState.errors.password?.message}
            </p>
          </div>
          <Button className="w-full" onClick={handleSubmit(onSubmit)}>
            Sign in
          </Button>
          <a href="/signup" className="text-sm hover:underline">
            Don't have an account? Sign up.
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
