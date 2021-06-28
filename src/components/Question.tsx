import React from "react";
import "../assets/css/question.scss";

type QuestionType = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  isAnswered?: boolean;
  isHighLighted?: boolean;
  children?: React.ReactNode;
};

export function Question({
  content,
  author,
  isAnswered = false,
  isHighLighted = false,
  children,
}: QuestionType) {
  return (
    <div
      className={`question ${isAnswered ? "isAnswered" : ""} ${
        isHighLighted && !isAnswered ? "isHinghLighted" : ""
      }`}
    >
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>{children}</div>
      </footer>
    </div>
  );
}
