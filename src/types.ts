export interface DokdoSource {
  id: string;
  title: string;
  year: number;
  country: "KOREA" | "JAPAN";
  category: "DOCUMENT" | "MAP";
  originalText?: string;
  sourceText: string;
  significance: string;
}

export interface HistoryEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  category: "ANYONGBOK" | "MODERN" | "GENERAL";
  points?: string[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface CoBookProposal {
  teamName: string;
  koreanStudent: string;
  japaneseStudent: string;
  title: string;
  content: string;
  selectedSources: string[];
}
