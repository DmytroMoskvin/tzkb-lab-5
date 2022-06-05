import { CharacterSets } from "./characterSets";
import "./styles/checkBox.css";

type Props = {
  id: string;
  label?: string | null;
  value: CharacterSets;
  onChange: ({ target }: { target: HTMLInputElement }) => void;
  defaultChecked?: boolean;
};

const CheckBox = ({ id, label, value, onChange, defaultChecked = true }: Props) => (
  <div className="input_checkbox">
    <input
      id={`input_checkbox__input_${id}`}
      className="input_checkbox__input"
      type="checkbox"
      value={value}
      onChange={onChange}
      defaultChecked={defaultChecked}
    />
    {label && <label className="input_checkbox__label" htmlFor={`input_checkbox__input_${id}`}>{label}</label>}
  </div>
);

export default CheckBox;