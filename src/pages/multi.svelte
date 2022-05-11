<script lang="ts">
  import { get_tile } from "../tile";

  import Board from "../Board.svelte";
  import { onMount } from "svelte";
  let rowNames = ["a", "b", "c", "d", "e", "f", "g", "h"];
  let names = {
    g: {
      tile_color: "w",
      tile_type: "goat",
    },
    h: {
      tile_color: "w",
      tile_type: "horse",
    },
    t: {
      tile_color: "w",
      tile_type: "tiger",
    },
    b: {
      tile_color: "w",
      tile_type: "bear",
    },
    l: {
      tile_color: "w",
      tile_type: "snake",
    },
    m: {
      tile_color: "w",
      tile_type: "mantis-shrimp",
    },
    r: {
      tile_color: "w",
      tile_type: "bird",
    },
    s: {
      tile_color: "w",
      tile_type: "sloth",
    },
    G: {
      tile_color: "o",
      tile_type: "goat",
    },
    H: {
      tile_color: "o",
      tile_type: "horse",
    },
    T: {
      tile_color: "o",
      tile_type: "tiger",
    },
    B: {
      tile_color: "o",
      tile_type: "bear",
    },
    L: {
      tile_color: "o",
      tile_type: "snake",
    },
    M: {
      tile_color: "o",
      tile_type: "mantis-shrimp",
    },
    R: {
      tile_color: "o",
      tile_type: "bird",
    },
    S: {
      tile_color: "o",
      tile_type: "sloth",
    },
  };

  async function parse_fen(str: string) {
    let board = {};
    const state = str.split(" ");
    localStorage.setItem("turn", state[1][0]);

    const rows = state[0].split("/");
    rows.forEach((r, ri) => {
      const rowName = rowNames[ri];
      let col = r.split("");
      if (rows.length != 8) {
        console.log("bad fen string");
        return;
      }
      let colId = 0;
      for (let i = 0; i < col.length; i++) {
        const c = col[i];
        if (parseInt(c)) {
          const num = parseInt(c);

          for (let ci = 0; ci < num; ci++) {
            let id = rowName + (colId + ci + 1);
            board[id] = {
              id,
              tile_type: "",
              tile_color: "",
              tile: "",
            };
          }
          colId += num;
        } else {
          let id = rowNames[ri] + (colId + 1);
          board[id] = {
            id,
            tile: get_tile(names[c].tile_color, names[c].tile_type),
            ...names[c],
          };
          colId++;
        }
      }
    });
    return board;
  }
  onMount(async () => {
    const state = parse_fen("GHTBLMRS/8/8/8/8/2h5/g2m4/1htblmrs w");
    const board = await state;
    localStorage.setItem("board", JSON.stringify(board));
  });
</script>

<Board />
