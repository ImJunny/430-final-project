import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axiosClient";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const schema = z
    .object({
      first_name: z.string().min(1, "First name is required"),
      last_name: z.string().min(1, "Last name is required"),
      email: z.string().email("Invalid email"),
      password: z.string().min(6, "Password must be at least 6 characters"),
      confirm_password: z.string(),
      role: z.enum(["user", "admin"]),
    })
    .refine((data) => data.password === data.confirm_password, {
      message: "Passwords must match",
      path: ["confirm_password"],
    });

  const { control, handleSubmit, formState, trigger, setValue, getValues } =
    useForm({
      resolver: zodResolver(schema),
    });

  const navigate = useNavigate();
  const signupMutation = useMutation({
    mutationFn: async () => {
      const response = await api.post("/signup", {
        email: getValues("email"),
        first_name: getValues("first_name"),
        last_name: getValues("last_name"),
        password: getValues("password"),
        role: getValues("role"),
      });
      return response.data;
    },
  });

  const handleSignup = () => {
    signupMutation.mutate(undefined, {
      onSuccess: (response) => {
        console.log("Sign up successful:", response);
        localStorage.setItem("430_user_uuid", response.user_uuid);
        response.role === "user" ? navigate("/home") : navigate("/home-admin");
      },
      onError: () => {
        alert("Sign up failed.");
      },
    });
  };

  return (
    <div className="flex bg-blue-200 min-h-screen justify-center items-center">
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
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Input placeholder="First" {...control.register("first_name")} />
              <p className="text-red-500 text-sm">
                {formState.errors.first_name?.message}
              </p>
            </div>
            <div>
              <Input placeholder="Last" {...control.register("last_name")} />
              <p className="text-red-500 text-sm">
                {formState.errors.last_name?.message}
              </p>
            </div>
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
          <div>
            <Input
              placeholder="Confirm password"
              type="password"
              {...control.register("confirm_password")}
            />
            <p className="text-red-500 text-sm">
              {formState.errors.confirm_password?.message}
            </p>
          </div>
          <div>
            <Select
              disabled={signupMutation.isPending}
              onValueChange={(value: "user" | "admin") => {
                setValue("role", value);
                trigger("role");
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-red-500 text-sm">
              {formState.errors.role?.message}
            </p>
          </div>
          <Button className="w-full" onClick={handleSubmit(handleSignup)}>
            Sign up
          </Button>

          <a href="/" className="text-sm hover:underline">
            Already have an account? Sign in.
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
