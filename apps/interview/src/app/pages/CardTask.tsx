import Card from '../CardTask/Card';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
`;

const Column = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    margin: 36px;
    color: rgb(131, 138, 145);
  }
`;

const CardTask = () => (
  <Wrapper>
    <Column>
      <h2>Actual</h2>
      <Card
        imageSrc="/assets/images/card-media.jpeg"
        title="Dog"
        description="The dog or domestic dog is a domesticated descendant of the wolf. The dog is
        derived from an ancient, extinct wolf, and the modern wolf is the dog's nearest living relative."
      />
    </Column>
    <Column>
      <h2>Expected</h2>
      <img src="/assets/images/expected-card.png" alt="expected" width={369} />
    </Column>
  </Wrapper>
);

export default CardTask;
