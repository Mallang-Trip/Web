import { useEffect } from "react";
import { useParams } from "react-router-dom";
import UserService from "./UserService";

function PolicyPage() {
  const { category, type } = useParams();

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, [category, type]);

  if (category === "user" && type === "service") return <UserService />;
  return <div>PolicyPage</div>;
}

export default PolicyPage;
