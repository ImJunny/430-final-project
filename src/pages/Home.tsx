import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useQuery } from "react-query";
import { Dispatch, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/axiosClient";
import { set, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@radix-ui/react-label";

export default function Home() {
  const [loans, setLoans] = useState([]);
  const [formVisible, setFormVisible] = useState(false);

  const fetchLoans = async () => {
    const response = await api.get("/getLoans");
    return response.data;
  };

  const { data, isLoading, isError } = useQuery("loans", fetchLoans);

  useEffect(() => {
    if (isLoading) {
      console.log("Loading loans...");
    } else if (isError) {
      console.error("Error fetching loans");
    } else {
      console.log("Loans fetched successfully:", data);
    }
  }, [isLoading, isError]);

  const navigate = useNavigate();
  const handleSignout = () => {
    navigate("/");
  };

  const showForm = () => {
    setFormVisible(true);
  };

  return (
    <div className="flex bg-blue-200 min-h-screen justify-center py-6">
      <div className="space-y-4 w-[40rem]">
        <Card className="h-auto flex">
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold">Current Loans</h1>
              <p
                className="ml-auto text-sm hover:underline hover:cursor-pointer"
                onClick={handleSignout}
              >
                Sign out
              </p>
            </div>
            <p className="text-sm py-6 text-center">No loans yet</p>

            <Button className="w-full" variant="outline" onClick={showForm}>
              Request a loan
            </Button>
          </CardContent>
        </Card>
        {formVisible && <LoanForm setFormVisible={setFormVisible} />}
      </div>
    </div>
  );
}

function LoanForm({
  setFormVisible,
}: {
  setFormVisible: Dispatch<React.SetStateAction<boolean>>;
}) {
  const schema = z.object({
    amount: z.coerce.number().min(1000, "Minimum amount is 1000"),
    loan_type: z.enum(["mortgage", "auto", "personal", "student"]),
  });

  const { control, handleSubmit, formState, setValue, trigger } = useForm({
    resolver: zodResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const onSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      console.log("Loan request submitted");
      setLoading(false);
      setValue("loan_type", "auto");
      setValue("amount", 0);
    }, 2000);
  };

  const hideForm = () => {
    setFormVisible(false);
  };

  return (
    <Card>
      <CardContent className="space-y-2">
        <h1 className="text-xl font-semibold">Loan Request Form</h1>
        <p className="text-sm text-gray-500">
          Requesting a loan will send your personal details for consideration of
          approval. Please enter the type of loan and the amount you wish to
          request.
        </p>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label className="text-sm font-semibold">Loan type</Label>
            <Select
              disabled={loading}
              onValueChange={(
                value: "mortgage" | "auto" | "personal" | "student"
              ) => {
                setValue("loan_type", value);
                trigger("loan_type");
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mortgage">Mortgage</SelectItem>
                <SelectItem value="auto">Auto</SelectItem>
                <SelectItem value="personal">Personal</SelectItem>
                <SelectItem value="student">Student</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-red-500 text-sm">
              {formState.errors.loan_type?.message}
            </p>
          </div>
          <div className="w-full">
            <Label className="text-sm font-semibold">Amount ($)</Label>
            <Input
              disabled={loading}
              placeholder="Enter number amount"
              {...control.register("amount")}
            />
            <p className="text-red-500 text-sm">
              {formState.errors.amount?.message}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" onClick={hideForm} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit(onSubmit)} disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
