const setup = async () => {
  if (localStorage.getItem("board")) {
    let oldBoard = localStorage.getItem("board");
    oldBoard = JSON.parse(oldBoard);
    Object.keys(board).forEach((key) => {
      board[key].tile = oldBoard[key].tile;
      board[key].tile_type = oldBoard[key].tile_type;
      board[key].tile_color = oldBoard[key].tile_color;
      board[key].id = oldBoard[key].id;
      board[key].el = oldBoard[key].el;
      console.log(board);
    });
    return;
  }
  set_tile("goat", "h1", turn);
  set_tile("horse", "h2", turn);
  set_tile("tiger", "h3", turn);
  set_tile("bear", "h4", turn);
  set_tile("snake", "h5", turn);
  set_tile("mantis-shrimp", "h6", turn);
  set_tile("bird", "h7", turn);
  set_tile("sloth", "h8", turn);
  turn = "o";
  set_tile("goat", "a1", turn);
  set_tile("horse", "a2", turn);
  set_tile("tiger", "a3", turn);
  set_tile("bear", "a4", turn);
  set_tile("snake", "a5", turn);
  set_tile("mantis-shrimp", "a6", turn);
  set_tile("bird", "a7", turn);
  set_tile("sloth", "a8", turn);
  turn = "w";
};
