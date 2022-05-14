<script lang="ts">
  import { get_tile } from "../tile";

  import Board from "../Board.svelte";
  import { onMount } from "svelte";
  import { db, user, username } from "../user";
  import { v4 } from "uuid";
  import Cookies from "js-cookie";
  import { get } from "svelte/store";

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

  function parse_fen(str: string) {
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
              el: document.getElementById(id),
            };
          }
          colId += num;
        } else {
          let id = rowNames[ri] + (colId + 1);
          board[id] = {
            id,
            tile: get_tile(names[c].tile_color, names[c].tile_type),
            ...names[c],
            el: document.getElementById(id),
          };
          colId++;
        }
      }
    });
    return board;
  }

  let input;
  let game = false;
  let game_id = "SAMPLE";
  let buttons = true;
  let join = false;
  let menu = true;
  let db_game;
  let board_state = JSON.parse(localStorage.getItem("board"));
  let board_fen = localStorage.getItem("fen_state") || "null w";
  let this_turn: any = "w";
  let board_win_state;
  onMount(async () => {
    const params = new URLSearchParams(window.location.search);
    if (!user.is && !Cookies.get("u")) {
      window.location.href = "/login";
    }
    if (params.get("id")) {
      game_id = params.get("id");
      localStorage.setItem("game_id", game_id);
      localStorage.setItem("you", "o");
      db_game = db.get(game_id);
      menu = false;
    }
    if (localStorage.getItem("game_id")) {
      game_id = localStorage.getItem("game_id");
      db_game = db.get(game_id);
      menu = false;
    }
    if (!localStorage.getItem("fen_state")) {
      localStorage.setItem("fen_state", "GHTBLMRS/8/8/8/8/8/8/ghtblmrs w");
    }
    if (!localStorage.getItem("board")) {
      localStorage.setItem(
        "fen_state",
        JSON.stringify(parse_fen("GHTBLMRS/8/8/8/8/8/8/ghtblmrs w"))
      );
    }
    db_game.map().once((e) => {
      console.log(e);
      board_fen = e;
      let board = parse_fen(e);
      if (localStorage.getItem("turn") != localStorage.getItem("you")) {
        this_turn = "";
      } else {
        this_turn = localStorage.getItem("turn");
      }
      localStorage.setItem("board", JSON.stringify(board));
      if (
        board_fen.split(" ")[1].length >= 2 &&
        board_fen.split(" ")[1][1] == "r"
      ) {
        let player = board_fen.split(" ")[1][0];
        // FEN string is sent as current board state.
        // The player who's turn it was last would be the one to resign.
        // That is why it returns opposite to fen string.
        if (player == "w")
          board_win_state = {
            win: false,
            stale: false,
            resign: true,
            who: "Orange",
            state: "White won the game!",
          };
        if (player == "o")
          board_win_state = {
            win: false,
            stale: false,
            resign: true,
            who: "White",
            state: "Orange won the game!",
          };
      }
      board_state = board;
    });
  });
</script>

{#if menu}
  <div
    class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-[black] w-screen h-screen bg-opacity-90 flex justify-center items-center flex-col text-xl"
  >
    {#if buttons}
      <div>
        <button
          class="m-2 bg-orange p-1"
          on:click={async () => {
            buttons = false;
            game = true;
            game_id = "game_" + v4().replace(/\-/g, "_");
            let b = localStorage.getItem("fen_state");
            localStorage.setItem("game_id", game_id);
            localStorage.setItem("you", "w");
            //@ts-ignore
            db_game = db.get("game_" + game_id);
            db_game.set(b);
          }}>New game</button
        >
        <button
          class="m-2 bg-orange p-1"
          on:click={() => {
            join = true;
            buttons = false;
          }}>Join game</button
        >
      </div>
    {/if}
    {#if game}
      <p>Game Id</p>
      <p class="text-base">(share with friends)</p>
      <p class="text-orange">
        http://localhost:3000/multi?id={game_id}
      </p>
    {/if}
    {#if join}
      <input
        type="text"
        bind:this={input}
        class="bg-blue p-1"
        placeholder="Game id"
      />
      <button class="m-2 bg-orange p-1">Join</button>
    {/if}
  </div>
{/if}
<p class="-z-10">
  You: {localStorage.getItem("you") || this_turn}
</p>
<p class="-z-10">
  current turn: {board_fen.split(" ").length == 2
    ? board_fen.split(" ")[1][0]
    : ""}
</p>
<button
  on:click={() => {
    // localStorage.removeItem("board");
    localStorage.removeItem("game_id");
    localStorage.removeItem("you");
    localStorage.removeItem("fen_state");
    localStorage.setItem(
      "board",
      JSON.stringify(parse_fen("GHTBLMRS/8/8/8/8/8/8/ghtblmrs w"))
    );
    localStorage.setItem("fen_state", "GHTBLMRS/8/8/8/8/8/8/ghtblmrs w");
    db.get(game_id).set(localStorage.getItem("fen_state") + "r");
    menu = true;
  }}>Resign</button
>
<Board
  multi
  board={board_state}
  turn={this_turn}
  game_state={board_win_state}
/>
