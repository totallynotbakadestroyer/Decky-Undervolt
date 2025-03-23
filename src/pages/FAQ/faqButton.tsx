import {
    DialogBody,
    DialogButton,
    DialogFooter,
    DialogHeader,
    ModalRoot,
    ButtonItem, showModal
} from "@decky/ui";

const FaqButton = (modalContent: {header: string, body: string}) => {
    const handleClick = () => {
        showModal(<FaqDialog  modalContent={modalContent}/>, window);
    }

    return (
        <ButtonItem  layout={"below"} onClick={handleClick}>
            {modalContent.header}
        </ButtonItem>
    );
}

const FaqDialog = ({
  closeModal,
  modalContent,
}: {
  closeModal?: () => void;
  modalContent: {header: string, body: string};
}) => {
  return (
    <ModalRoot closeModal={closeModal}>
      <DialogHeader>
        {modalContent.header}
      </DialogHeader>
      <DialogBody>
          <div dangerouslySetInnerHTML={{__html: modalContent.body}} />
      </DialogBody>
      <DialogFooter>
        <DialogButton onClick={closeModal}>Close</DialogButton>
      </DialogFooter>
    </ModalRoot>
  );
};

export default FaqButton;
