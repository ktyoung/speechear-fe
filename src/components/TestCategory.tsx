import { Link } from "react-router-dom";

interface TestCategoryProps {
  part: string;
  icon: string;
  children: string;
}
export default function TestCategory({ part, icon, children }: TestCategoryProps) {
  return (
    <Link to={`/training/${part}/${icon}/1`} className="category-items">
      <figure>
        <img
          src={`${process.env.PUBLIC_URL}/images/icons/icon_${icon}.png`}
          alt="Category Icon"
        />
      </figure>
      <p className="category-items-text">{children}</p>
    </Link>
  );
}
