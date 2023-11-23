export default function Modal({ setModal, modalText }: any) {
  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setModal(false);
  };
  const handleModalContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="modal-wrapper" onClick={handleClose}>
      <div className="modal" onClick={handleModalContentClick}>
        <p>{modalText}</p>
        <button className="close-button" onClick={handleClose}>
          X
        </button>
      </div>
    </div>
  );
}
