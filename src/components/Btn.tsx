import { Button, Spinner } from "flowbite-react";
type Props = {
  node?: React.ReactNode;
  text?: string;
  color?:
    | "blue"
    | "gray"
    | "dark"
    | "light"
    | "success"
    | "failure"
    | "warning"
    | "purple";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  outline?: boolean;
  type?: "button" | "submit" | "reset";
  isLoading?: boolean;
  isValid?: boolean;
  onClick?: () => void;
};
const Btn = (props: Props) => {
  const {
    node,
    text,
    color,
    size,
    outline,
    type,
    isValid,
    isLoading,
    onClick,
  } = props;
  return (
    <Button
      size={size || "sm"}
      color={color}
      outline={outline || false}
      disabled={isLoading ? true : isValid ? !isValid : false}
      type={type || "submit"}
      onClick={onClick ? onClick : undefined}
    >
      {isLoading ? (
        <>
          <Spinner size={size || "sm"} color={color || "primary"} />
          {text ? <span className="pl-3">Loading...</span> : null}
        </>
      ) : (
        text || node
      )}
    </Button>
  );
};

export default Btn;
