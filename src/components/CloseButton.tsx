interface Props {
    onClose: () => void
}

const CloseButton = ({ onClose }: Props) => {
  return (
    <button
      type="button"
      className="btn btn-secondary"
      data-bs-dismiss="modal"
      onClick={onClose} 
    >Close</button>
  );
};

export default CloseButton;

