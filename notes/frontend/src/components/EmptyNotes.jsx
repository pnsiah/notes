import { useState } from "react";

function EmptyNotes({ emptyState }) {
  return <li style={{ color: "red" }}>{emptyState.message}</li>;
}

export default EmptyNotes;
