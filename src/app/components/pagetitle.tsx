import React from "react";

type PageTitleProps = {
  title: string;
};

const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  return (
    <>
      <h1 className="text-xl">{title}</h1>
    </>
  );
};

export { PageTitle };
