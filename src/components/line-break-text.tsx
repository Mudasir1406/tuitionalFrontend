import React from "react";

export function renderWithLineBreaks(text: string) {
  return text?.split(/<br\s*\/?>/i).map((part, index) => (
    <React.Fragment key={index}>
      {part}
      {index < text.split(/<br\s*\/?>/i).length - 1 && <br />}
    </React.Fragment>
  ));
}
