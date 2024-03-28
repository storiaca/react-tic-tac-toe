type CellProps = {
  id: number | string;
  cell: string;
  cells: string[];
  setCells: (cell: string[]) => void;
  firstGo: string;
  setFirstGo: (player: string) => void;
  winner: string;
};
export default function Cell({
  id,
  cell,
  cells,
  setCells,
  firstGo,
  setFirstGo,
  winner,
}: CellProps) {
  function handleGame(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    let target = event.target as HTMLDivElement;
    let taken =
      target.firstChild?.classList.contains("circle") ||
      target.firstChild?.classList.contains("cross");

    if (!taken) {
      if (firstGo === "circle") {
        target.firstChild?.classList.add("circle");
        setFirstGo("cross");
        handleCellChange("circle");
      } else if (firstGo === "cross") {
        target.firstChild?.classList.add("cross");
        setFirstGo("circle");
        handleCellChange("cross");
      }
    }
  }

  function handleCellChange(classList: string) {
    let updateArrayCell: string[] = cells.map((el, index) => {
      if (index === id) {
        return classList;
      } else {
        return el;
      }
    });

    setCells(updateArrayCell);
  }
  return (
    <div
      className="square"
      id={String(id)}
      onClick={!winner ? handleGame : undefined}
    >
      <div className={cell}></div>
    </div>
  );
}
