import { EActivityCategory } from "@/shared";

export const prepareActivityCategoryToString = (
  category?: EActivityCategory,
): string => {
  switch (category) {
    case EActivityCategory.SportsAndFitness:
      return "Спорт и фитнес";
    case EActivityCategory.Quizzes:
      return "Квизы, викторины и интеллектуальные игры";
    case EActivityCategory.BoardBames:
      return "Настольные игры";
    case EActivityCategory.Culinary:
      return "Кулинарные мастер-классы";
    case EActivityCategory.Creation:
      return "Творчество и искусство";
    case EActivityCategory.NatureAndActiveRecreation:
      return "Природа и активный отдых";
    case EActivityCategory.Quests:
      return "Квесты и приключения";
    case EActivityCategory.DancingAndMusic:
      return "Танцы и музыка";
    case EActivityCategory.TrainingAndSelfDevelopment:
      return "Обучение и саморазвитие";
    case EActivityCategory.PsychologyAndWellness:
      return "Психология и wellness";
    default:
      return "Без категории";
  }
};
