import { useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import Layout from '../LayoutTask/Layout';

const Wrapper = styled.div`
  display: flex;
`;

const Column = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;

  h2 {
    margin: 36px;
    color: rgb(131, 138, 145);
  }

  img {
    cursor: pointer;
    border-radius: 4px;
  }
`;

const RightColumn = styled(Column)`
  flex: none;
  padding: 0 36px;
  align-items: center;
`;

const modalStyles = {
  content: {
    overflow: 'hidden',
  },
};

const LayoutTask = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => setModalOpen((isOpen) => !isOpen);

  return (
    <Wrapper>
      <Column>
        <Layout />
      </Column>
      <RightColumn>
        <h2>Expected</h2>
        <img
          src="/assets/images/expected-layout.png"
          alt="expected"
          width={369}
          onClick={toggleModal}
        />
      </RightColumn>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={toggleModal}
        contentLabel="Expected"
        style={modalStyles}
      >
        <img
          src="/assets/images/expected-layout.png"
          alt="expected"
          width="100%"
          height="100%"
          style={{ objectFit: 'contain' }}
        />
      </Modal>
    </Wrapper>
  );
};

export default LayoutTask;
