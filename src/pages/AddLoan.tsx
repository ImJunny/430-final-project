import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function AddLoanScreen() {
  const [customers, setCustomers] = useState<
    { id: string; name: string; email: string; phone: string }[]
  >([]);
  const [newCustomer, setNewCustomer] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
  });

  const handleAddCustomer = () => {
    setCustomers([...customers, newCustomer]);
    setNewCustomer({ id: "", name: "", email: "", phone: "" });
  };

  return (
    <div className="flex min-h-screen bg-blue-200 justify-center pt-6">
      <div className="space-y-6">
        <Card className="p-4">
          <CardContent className="space-y-4">
            <h2 className="text-xl font-semibold">Add Customer</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>ID</Label>
                <Input
                  value={newCustomer.id}
                  onChange={(e) =>
                    setNewCustomer({ ...newCustomer, id: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Name</Label>
                <Input
                  value={newCustomer.name}
                  onChange={(e) =>
                    setNewCustomer({ ...newCustomer, name: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  value={newCustomer.email}
                  onChange={(e) =>
                    setNewCustomer({ ...newCustomer, email: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Phone</Label>
                <Input
                  value={newCustomer.phone}
                  onChange={(e) =>
                    setNewCustomer({ ...newCustomer, phone: e.target.value })
                  }
                />
              </div>
            </div>
            <Button onClick={handleAddCustomer}>Add Customer</Button>
          </CardContent>
        </Card>

        <Card className="p-4">
          <CardContent>
            <h2 className="text-xl font-semibold mb-4">Customer List</h2>
            {customers.length === 0 ? (
              <p>No customers added.</p>
            ) : (
              <ul className="space-y-2">
                {customers.map((cust, index) => (
                  <li key={index} className="border p-2 rounded">
                    <strong>{cust.name}</strong> (ID: {cust.id})<br />
                    Email: {cust.email}
                    <br />
                    Phone: {cust.phone}
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
