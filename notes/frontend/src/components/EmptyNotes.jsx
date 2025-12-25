import { useState } from "react";

function EmptyNotes({ emptyState }) {
  return <li className="error-text">{emptyState.message}</li>;
}

export default EmptyNotes;
