import { Button } from "primereact/button";

const FinoButton = ({
  form,
  label,
  icon,
  onClick,
  variant = "",
  className,
  loading,
  disabled = false,
  type = "button",
  textOnly = false,
  hidden = false,
  iconPos = "left",
  style,
  tooltip,
  link,
}: {
  form?: string;
  label?: string;
  icon?: React.ReactNode;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: string;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  textOnly?: boolean;
  hidden?: boolean;
  iconPos?: "left" | "right";
  style?: React.CSSProperties;
  tooltip?: string;
  link?: boolean;
}) => {
  const baseClasses = "fino-base-button";
  const variantColorClasses: Record<string, string> = {
    primary: "fino-primary-button",
    secondary: "fino-secondary-button",
    text: "fino-text-button",
    outlined: "fino-outlined-button",
    danger: "fino-danger-button",
    skeleton: "fino-skeleton-button",
    outlineDanger: "fino-outline-danger-button",
  };
  const disabledClasses: Record<string, string> = {
    primary: "fino-disabled-primary-button",
    secondary: "fino-disabled-secondary-button",
    text: "fino-disabled-text-button",
    danger: "fino-disabled-danger-button",
    skeleton: "fino-disabled-skeleton-button",
    outlineDanger: "fino-disabled-outlinedanger-button",
  };

  const getVariantClasses = () => {
    return `${baseClasses} ${
      disabled ? disabledClasses[variant] : variantColorClasses[variant]
    }`;
  };
  return (
    <Button
      form={form}
      label={label}
      link={link}
      icon={icon}
      onClick={onClick}
      loading={loading}
      disabled={disabled}
      type={type}
      text={textOnly}
      iconPos={iconPos}
      className={`${className} ${getVariantClasses()}`}
      hidden={hidden}
      style={style}
      tooltip={tooltip}
    />
  );
};

export default FinoButton;
