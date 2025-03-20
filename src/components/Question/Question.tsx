import React, { JSX } from 'react';
import { Question as QuestionType } from '../../types';
//import { stringify } from 'querystring';

export function Question({
  question,
}: {
  question: QuestionType;
}): JSX.Element {
  const [answerId, setAnswerId] = React.useState<number | null>(null);
  const [showAnswers, setShowAnswers] = React.useState<boolean>(false);

  //let showAnswers = false;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowAnswers(true);
    console.log('submit, valið svar:', answerId);
  };

  return (
    <div>
      <h2>{question.text}</h2>
      <form onSubmit={onSubmit}>
        <ul>
          {question.answers.map((answer) => {
            const isCorrect = answer.correct ? answerId === answer.id : answerId !== answer.id;
            return (
              <li key={answer.id}>
                <input
                  type="radio"
                  name="answer"
                  value={answer.id}
                  onChange={() => showAnswers ? null : setAnswerId(answer.id)}
                />
                {answer.text}{showAnswers ? isCorrect ? ' - RÉTT' : ' - RANGT': ''}
                {/*answer.text*/}
                {/*showAnswers ? stringify({isCorrect: isCorrect ? 'a' : 'b'}) : ''*/}
              </li>
            );
          })}
        </ul>
        <button>
          Svara
        </button>
      </form>
    </div>
  );
}
