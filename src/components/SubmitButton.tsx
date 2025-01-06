interface Props {
    onSubmit: (name: string, playerId: number) => void,
    name: string,
    signature: string,
    playerId: number
}

const SubmitButton = ({ onSubmit, name, signature, playerId }: Props) => {
  return (
    <button 
        className="btn btn-outline-success" 
        type="submit"
        onClick={() => onSubmit(name, playerId)} 
    >{signature}</button>
  );
};

export default SubmitButton;