import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function DashboardPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Welcome to the eCrate API Tester — a small playground to exercise and inspect the
            platform APIs and workflows.
          </p>

          <Separator />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button>
              <Link to="/auth-test">Auth API Tester</Link>
            </Button>
            <Button asChild>
              <Link to="/crate-test">Crate API Tester</Link>
            </Button>
            <Button asChild>
              <Link to="/data-test">Data API Tester</Link>
            </Button>
            <Button asChild>
              <Link to="/history-test">History API Tester</Link>
            </Button>
            <Button asChild>
              <Link to="/log-test">Log API Tester</Link>
            </Button>
            <Button asChild>
              <Link to="/service-test">Service API Tester</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
