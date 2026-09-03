import type spanish from './es.json';
import type { ExperienceId } from './experiences';

export interface ExperienceTranslation {
  title: string;
  subTitle: string;
  period?: string;
  stages: {
    id: string;
    title: string;
    period?: string;
    list: string[];
  }[];
}

export type Dictionary = Omit<typeof spanish, 'experience'> & {
  experience: { section: string } & Record<ExperienceId, ExperienceTranslation>;
};
