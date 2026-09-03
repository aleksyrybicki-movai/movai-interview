import './styles.css';
import { FC } from 'react';

interface CardProps {
  imageSrc: string;
  title: string;
  description: string;
}

const Card: FC<CardProps> = ({ imageSrc, title, description }) => (
  <div className="card">
    <img className="card-media" src={imageSrc} height="200" alt={title} />
    <div className="card-content">
      <div className="card-title">{title}</div>
      <p className="card-description">{description}</p>
    </div>
    <div className="card-actions">
      <button className="card-action-button" tabIndex={0} type="button">
        Share
      </button>
    </div>
  </div>
);

export default Card;
