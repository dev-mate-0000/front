import { CheckCircle, Pencil, XCircle } from "lucide-react";

interface StatusIconProps {
    status: EditStatus;
  }

export function StatusIcon({status}: StatusIconProps) {
  const getIcon = () => {
    switch (status) {
      case EditStatus.GOOD:
        return <CheckCircle className="w-8 h-8 text-green-500" />;
      case EditStatus.EDIT:
        return <Pencil className="w-8 h-8 text-blue-300" />;
      case EditStatus.ERR:
        return <XCircle className="w-8 h-8 text-red-500" />;
      default:
        return null;
    }
  };

  return <div>{getIcon()}</div>;
}

export enum EditStatus {
  GOOD,
  EDIT,
  ERR,
}
