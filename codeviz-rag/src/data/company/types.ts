// src/data/company/types.ts

/** Example format: { input: string, output: string } */
export interface QAExample {
  input: string;
  output: string | string[];
}

/** Supported language keys for code blocks */
export type CodeLang = "python" | "cpp" | "java" | "c";

/** Code block model */
export interface CodeBlock {
  python?: string;
  cpp?: string;
  java?: string;
  c?: string;
}

/** Main QA item type — ALL attributes kept */
export interface QAItem {
  q: string;                     // question
  a: string;                     // short explanation

  difficulty?: string;           // Easy / Medium / Hard
  tags?: string[];               // topics list

  steps?: string[];              // step-by-step explanation
  examples?: QAExample[];        // multiple examples

  samples?: {                    // single sample example
    input: string;
    output: string | string[];
  };

  complexity?: {                 // time / space complexity
    time: string;
    space: string;
  };

  codes?: CodeBlock;             // code for each language

  explain?: string;              // full explanation
  explainLines?: {               // multi-line explanations for each language
    [lang: string]: string[];
  };

  feedback?: string;             // interview feedback
  improvements?: string[];       // improvements list
}

/** Every company → list of QA questions */
export type CompanyQAList = Record<string, QAItem[]>;
