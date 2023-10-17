import { Link } from "react-router-dom";

interface FunctionListProps {
  _to: string;
  _num: string;
  _title: string;
}

export default function FunctionList({ _to, _num, _title }: FunctionListProps) {
  return (
    <li>
      <Link to={_to}>
        <p className="function-number">{_num}</p>
        <p className="function-title">{_title}</p>
      </Link>
    </li>
  );
}
