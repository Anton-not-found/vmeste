export interface IActivityCollection {
  id: string;
  title: string;
  description: string;
  category?: EActivityCategory;
  activateOnUtc: string;
  location: string;
  price: number;
  currentParticipants: number;
  maxParticipants: number;
  imageUrl?: string;
  isFavorite?: boolean;
  author: IActivityAuthor;
}

export interface IActivity extends IActivityCollection {
  address?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IActivityAuthor {
  id: string;
  name: string;
  avatar?: string;
  rating: number;
}

export enum EActivityCategory {
  SportsAndFitness, // Спорт и фитнес
  Quizzes, // Квизы, викторины и интеллектуальные игры
  BoardBames, // Настольные игры
  Culinary, // Кулинарные мастер-классы
  Creation, // Творчество и искусство
  NatureAndActiveRecreation, // Природа и активный отдых
  Quests, // Квесты и приключения
  DancingAndMusic, // Танцы и музыка
  TrainingAndSelfDevelopment, // Обучение и саморазвитие
  PsychologyAndWellness, // Психология и wellness
}
