import "./styles/materialIcon.css";

type Props = {
  className?: string | null;
  name: string;
};

const MaterialIcon = ({ className, name }: Props) => (
  <span className={className ? `${className} material-symbols-outlined` : 'material-symbols-outlined'}>
    {name}
  </span>
);

export default MaterialIcon;