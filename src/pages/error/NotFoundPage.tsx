import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="text-center space-y-4">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-muted-foreground">
        The page you are looking for could not be found.
      </p>
      <Button asChild>
        <Link to="/">Back to Home</Link>
      </Button>
    </div>
  );
}
