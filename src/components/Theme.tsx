interface Props {
    color: string;
    onChangeColor: (color: string) => void;
}

const Theme = ({ color, onChangeColor }: Props) => {
    return (
      <li>
        <a
          className="dropdown-item"
          onClick={() => onChangeColor(color)} 
          style={{ cursor: "pointer" }}
        >
          {color}
        </a>
      </li>
    );
  };
  

export default Theme;
