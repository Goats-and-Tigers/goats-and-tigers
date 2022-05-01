<script lang="ts">
    import { onMount } from "svelte";
    import type {
        PassiveTiles,
        AggressiveTiles,
        TileRow,
        TileCol,
    } from "./tile";

    import { aggressiveTiles, passiveTiles, playable_tiles } from "./tile";
    import Viewer from "./components/move-viewer.svelte";
    import EndScreen from "./components/game-state.svelte";
    import { add_log, log } from "./log";

    type Players = "w" | "o";
    type Tasks = "" | "moving" | "attacking" | "finishing";
    interface Tile {
        id: string;
        tile: string;
        tile_type: PassiveTiles | AggressiveTiles | "";
        el?: HTMLDivElement;
        tile_color: Players | "";
    }
    interface Tile_Loc {
        row: TileRow;
        col: TileCol;
        str: string;
    }

    let boardElement: HTMLDivElement;
    let board: { [key: string]: Tile } = {};
    let selected: Tile;
    let attackable: Array<Tile>;

    let cols = new Array(8).fill({});

    let turn: Players = "w";
    let task: Tasks = "";

    let rows = ["a", "b", "c", "d", "e", "f", "g", "h"];
    rows.forEach((r) => {
        cols.forEach((_, c) => {
            let id = r + (c + 1);
            board[id] = { tile: "", tile_type: "", tile_color: "", id };
        });
    });

    async function set_tile(
        name: PassiveTiles | AggressiveTiles | "",
        pos: string,
        col: Players | ""
    ) {
        if (name == "") {
            board[pos].tile = "";
            board[pos].tile_type = "";
            board[pos].tile_color = "";
            return;
        }
        board[pos].tile = (await playable_tiles[turn][name]).default;
        board[pos].tile_type = name;
        board[pos].tile_color = col;
        localStorage.setItem("board", JSON.stringify(board));
    }
    function parse_tile_loc(pos: string): Tile_Loc {
        const split = pos.split("");
        return {
            row: split[0] as TileRow,
            col: parseInt(split[1]) as TileCol,
            str: pos,
        };
    }
    function get_tiles_around(pos: Tile_Loc) {
        let locations: { [key: string]: Tile_Loc } = {};
        const up_row = rows.indexOf(pos.row) - 1;
        const down_row = rows.indexOf(pos.row) + 1;
        const left_col = pos.col - 1;
        const right_col = pos.col + 1;

        // get upper left diagonal
        if (left_col >= 1 && rows[up_row]) {
            locations.diag_left = {
                col: left_col as TileCol,
                row: rows[up_row] as TileRow,
                str: rows[up_row] + left_col,
            };
        }
        // get lower left diagonal
        if (left_col >= 1 && rows[down_row]) {
            locations.down_diag_left = {
                col: left_col as TileCol,
                row: rows[down_row] as TileRow,
                str: rows[down_row] + left_col,
            };
        }

        // get upper right diagonal
        if (right_col <= 8 && rows[up_row]) {
            locations.diag_right = {
                col: right_col as TileCol,
                row: rows[up_row] as TileRow,
                str: rows[up_row] + right_col,
            };
        }

        // get lower right diagonal
        if (right_col <= 8 && rows[down_row]) {
            locations.down_diag_right = {
                col: right_col as TileCol,
                row: rows[down_row] as TileRow,
                str: rows[down_row] + right_col,
            };
        }

        // get one row up
        if (rows[up_row]) {
            locations.up = {
                col: pos.col,
                row: rows[up_row] as TileRow,
                str: rows[up_row] + pos.col,
            };
        }

        // get one row down
        if (rows[down_row]) {
            locations.down = {
                col: pos.col,
                row: rows[down_row] as TileRow,
                str: rows[down_row] + pos.col,
            };
        }

        // get tile to right
        if (right_col <= 8) {
            locations.right = {
                col: right_col as TileCol,
                row: pos.row as TileRow,
                str: pos.row + right_col,
            };
        }
        // get tile to left
        if (left_col >= 1) {
            locations.left = {
                col: left_col as TileCol,
                row: pos.row as TileRow,
                str: pos.row + left_col,
            };
        }
        return locations;
    }

    const setup = async () => {
        if (localStorage.getItem("board")) {
            let oldBoard = localStorage.getItem("board");
            oldBoard = JSON.parse(oldBoard);
            Object.keys(board).forEach((key) => {
                board[key].tile = oldBoard[key].tile;
                board[key].tile_type = oldBoard[key].tile_type;
                board[key].tile_color = oldBoard[key].tile_color;
                board[key].id = oldBoard[key].id;
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
    function switchTurn() {
        if (turn == "o") {
            turn = "w";
        } else {
            turn = "o";
        }
        remove_indicators();
    }
    function remove_indicators() {
        attackable.forEach((i) => {
            i.el.className = i.el.className
                .replace("option", "")
                .replace("is-tile", "");
        });
    }
    function get_tiles_played() {
        let tiles = Object.values(board)
            .filter((e) => e.tile != "")
            .map((t) => {
                return {
                    tile: t,
                    pos: parse_tile_loc(t.id),
                };
            });
        let orange = [];
        let white = [];
        tiles.forEach((t) => {
            if (t.tile.tile_color == "o") {
                orange.push(t);
            }
            if (t.tile.tile_color == "w") {
                white.push(t);
            }
        });
        return {
            orange,
            white,
        };
    }
    function check_sides() {
        let state = {
            who: "",
            state: "",
            win: false,
            stale: false,
        };
        const right_white = get_tiles_played().white.filter(
            (t) =>
                (passiveTiles.includes(t.tile.tile_type) ||
                    t.tile.tile_type == "bird") &&
                (t.pos.str == "b8" ||
                    t.pos.str == "c8" ||
                    t.pos.str == "d8" ||
                    t.pos.str == "e8" ||
                    t.pos.str == "f8" ||
                    t.pos.str == "g8")
        );
        const left_white = get_tiles_played().white.filter(
            (t) =>
                (passiveTiles.includes(t.tile.tile_type) ||
                    t.tile.tile_type == "bird") &&
                (t.pos.str == "b1" ||
                    t.pos.str == "c1" ||
                    t.pos.str == "d1" ||
                    t.pos.str == "e1" ||
                    t.pos.str == "f1" ||
                    t.pos.str == "g1")
        );
        const right_orange = get_tiles_played().orange.filter(
            (t) =>
                (passiveTiles.includes(t.tile.tile_type) ||
                    t.tile.tile_type == "bird") &&
                (t.pos.str == "b8" ||
                    t.pos.str == "c8" ||
                    t.pos.str == "d8" ||
                    t.pos.str == "e8" ||
                    t.pos.str == "f8" ||
                    t.pos.str == "g8")
        );
        const left_orange = get_tiles_played().orange.filter(
            (t) =>
                (passiveTiles.includes(t.tile.tile_type) ||
                    t.tile.tile_type == "bird") &&
                (t.pos.str == "b1" ||
                    t.pos.str == "c1" ||
                    t.pos.str == "d1" ||
                    t.pos.str == "e1" ||
                    t.pos.str == "f1" ||
                    t.pos.str == "g1")
        );
        if (left_orange.length == 4 || right_orange.length == 4) {
            state.win = true;
            state.who = "Orange";
            if (left_orange.length == 4) {
                state.state =
                    "Orange won with 4 passive tiles aligned to the left.";
            } else {
                state.state =
                    "Orange won with 4 passive tiles aligned to the right.";
            }
        }
        if (left_white.length == 4 || right_white.length == 4) {
            state.win = true;
            state.who = "White";
            if (left_white.length == 4) {
                state.state =
                    "White won with 4 passive tiles aligned to the left.";
            } else {
                state.state =
                    "White won with 4 passive tiles aligned to the right.";
            }
        }
        return state;
    }
    function is_state(): {
        who: string;
        stale: boolean;
        state: string;
        win: boolean;
    } {
        let state = {
            state: "",
            who: "",
            win: false,
            stale: false,
        };
        const tiles = get_tiles_played();
        let orange_passive = tiles.orange.filter(
            (t) =>
                passiveTiles.includes(t.tile.tile_type) ||
                t.tile.tile_type == "bird"
        );
        let orange_ag = tiles.orange.filter((t) =>
            aggressiveTiles.includes(t.tile.tile_type)
        );
        let white_passive = tiles.white.filter(
            (t) =>
                passiveTiles.includes(t.tile.tile_type) ||
                t.tile.tile_type == "bird"
        );
        let white_ag = tiles.white.filter((t) =>
            aggressiveTiles.includes(t.tile.tile_type)
        );
        if (orange_ag.length == 0 && orange_passive.length != 0) {
            state.state =
                "Stalemate there's no fair game with no orange aggressive tiles.";
            state.stale = true;
            return state;
        }
        if (white_ag.length == 0 && white_passive.length != 0) {
            state.state =
                "Stalemate there's no fair game with no white aggressive tiles.";
            state.stale = true;
            return state;
        }
        if (orange_passive.length == 0) {
            state.state = "White took orange's passive tiles.";
            state.win = true;
            state.who = "White";
            return state;
        }
        if (white_passive.length == 0) {
            state.state = "Orange took white's passive tiles.";
            state.win = true;
            state.who = "Orange";
            return state;
        }
        return check_sides();
    }
    let game_state = {};
    function getToken(token_type: "" | PassiveTiles | AggressiveTiles) {
        if (token_type == "snake") return "L";
        return token_type[0].toUpperCase();
    }
    function is_valid_move(from: Tile_Loc, to: Tile_Loc) {
        let from_tile = board[from.str];
        if (
            aggressiveTiles.includes(from_tile.tile_type) &&
            from_tile.tile_type != "bird"
        ) {
            const tiles_around_from = get_tiles_around(from);

            if (turn == "o") {
                if (
                    tiles_around_from?.down?.str != to.str &&
                    tiles_around_from?.down_diag_left?.str != to.str &&
                    tiles_around_from?.down_diag_right?.str != to.str &&
                    tiles_around_from?.diag_right?.str != to.str &&
                    tiles_around_from?.diag_left?.str != to.str
                ) {
                    return false;
                }
            }
            if (turn == "w") {
                if (
                    tiles_around_from?.up?.str != to.str &&
                    tiles_around_from?.diag_left?.str != to.str &&
                    tiles_around_from?.diag_right?.str != to.str &&
                    tiles_around_from?.down_diag_left?.str != to.str &&
                    tiles_around_from?.down_diag_right?.str != to.str
                ) {
                    return false;
                }
            }
            return true;
        } else {
            return true;
        }
    }
    onMount(() => {
        setup();
        boardElement.querySelectorAll(".tile").forEach((E) => {
            const clickHandle = async (e: Event) => {
                const state = is_state();
                if (state.win == true) {
                    // display message
                    add_log(state.state);
                    game_state = state;

                    E.removeEventListener("click", clickHandle);
                    return;
                }
                if (state.stale == true) {
                    // display message
                    add_log(state.state);
                    game_state = state;
                    E.removeEventListener("click", clickHandle);
                    return;
                }
                let target = e.target as HTMLDivElement;
                let id = target.id;
                if (!board[id] || id.length == 0) {
                    if (id == "overlay") {
                        id = target.parentElement.parentElement.id;
                        target = target.parentElement
                            .parentElement as HTMLDivElement;
                    } else {
                        id = target.parentElement.id;
                        target = target.parentElement as HTMLDivElement;
                    }
                }
                const pos = parse_tile_loc(id);

                if (
                    board[id].tile_color == turn ||
                    board[id].tile_type == "" ||
                    task == "moving"
                ) {
                    if (board[id].tile_color == turn && task == "moving") {
                        selected = board[id];
                        task = "moving";
                        remove_indicators();
                        attackable = isAround();
                        return;
                    }
                    if (task == "" && board[id].tile_type != "") {
                        selected = board[id];
                        task = "moving";
                        attackable = isAround();
                        return;
                    }
                    if (task == "moving") {
                        const selected_loc = parse_tile_loc(selected.id);
                        const tiles_selected = get_tiles_around(selected_loc);
                        const oneAway = Object.values(tiles_selected).map(
                            (p) => p.str
                        );
                        if (!oneAway.includes(pos.str)) {
                            return;
                        }
                        if (board[id].tile_type == "") {
                            if (
                                !is_valid_move(selected_loc, parse_tile_loc(id))
                            ) {
                                return;
                            }
                            add_log(getToken(selected.tile_type) + id);
                            set_tile(selected.tile_type, pos.str, turn);
                            set_tile("", parse_tile_loc(selected.id).str, turn);
                            selected = null;
                            task = "";
                            switchTurn();
                            localStorage.setItem(
                                "board",
                                JSON.stringify(board)
                            );
                            return;
                        }
                        if (
                            board[id].tile_type != "" &&
                            board[id].tile_color != turn &&
                            aggressiveTiles.includes(selected.tile_type)
                        ) {
                            if (
                                (turn == "w" &&
                                    tiles_selected?.diag_left?.str != pos.str &&
                                    tiles_selected?.up?.str != pos.str) ||
                                (turn == "o" &&
                                    tiles_selected?.down_diag_left?.str !=
                                        pos.str &&
                                    tiles_selected?.down?.str != pos.str)
                            ) {
                                add_log("that piece cannot attack that way");
                                add_log(
                                    "attack left diagonal:",
                                    tiles_selected?.diag_left?.str
                                );
                                add_log(
                                    "attack forward:",
                                    tiles_selected?.up?.str
                                );
                                add_log("you attacked:", pos.str);
                                return;
                            }
                            add_log(
                                getToken(selected.tile_type) +
                                    selected.id +
                                    "-" +
                                    getToken(board[id].tile_type) +
                                    id
                            );
                            set_tile("", pos.str, turn);
                            set_tile(selected.tile_type, pos.str, turn);
                            set_tile("", selected.id, turn);
                            selected = null;
                            task = "";
                            switchTurn();
                            return;
                        } else {
                            if (!aggressiveTiles.includes(selected.tile_type)) {
                                add_log(
                                    "passive",
                                    selected.tile_type,
                                    "cannot attack",
                                    pos.str
                                );
                                return;
                            }
                        }
                    }
                    return;
                } else {
                    return;
                }
            };
            E.addEventListener("click", clickHandle);
        });
    });
    function isAround() {
        if (selected) {
            const around = get_tiles_around(parse_tile_loc(selected.id));
            let tiles = [];
            Object.keys(around).forEach((k) => {
                const tile = board[around[k].str];
                if (!is_valid_move(parse_tile_loc(selected.id), around[k])) {
                    return;
                }
                if (tile.tile_color != turn) {
                    const is_orange_take_dir =
                        selected.tile_color != "w" &&
                        (k == "down_diag_left" || k == "down");
                    const is_white_take_dir =
                        selected.tile_color != "o" &&
                        (k == "diag_left" || k == "up");
                    if (is_orange_take_dir || is_white_take_dir) {
                        if (
                            tile.tile_type != "" &&
                            !passiveTiles.includes(selected.tile_type)
                        ) {
                            tile.el.className += " option is-tile";
                        }
                    }
                }
                if (tile.tile_type == "") {
                    tile.el.className += " option";
                }
                tiles.push(board[around[k].str]);
            });
            return tiles;
        }
    }
</script>

<main>
    <EndScreen state={game_state} />
    <h1 class="">Goats and tigers</h1>
    <button
        on:click={() => {
            localStorage.clear();
            window.location.reload();
        }}>reset</button
    >

    <div class="flex">
        <div
            bind:this={boardElement}
            id="board-holder"
            class="h-[25vh] w-[45%]"
        >
            {#each rows as _, rowId}
                <div class="flex relative">
                    {#each cols as _, colId}
                        {#if colId % 2 == 0 && rowId % 2 == 0}
                            <div
                                id={rows[rowId] + (colId + 1)}
                                bind:this={board[rows[rowId] + (colId + 1)].el}
                                class="w-[30%] pb-[12.6%] relative h-0 bg-lightGray tile"
                            >
                                <div id="indicator">
                                    <div id="overlay" />
                                </div>
                                <img
                                    src={board[rows[rowId] + (colId + 1)].tile}
                                    class="object-contain p-2"
                                    alt={board[rows[rowId] + (colId + 1)].tile}
                                />
                            </div>
                        {:else if rowId % 2 != 0 && colId % 2 != 0}
                            <div
                                id={rows[rowId] + (colId + 1)}
                                bind:this={board[rows[rowId] + (colId + 1)].el}
                                class="w-[30%] h-0  pb-[12.6%] relative bg-lightGray tile"
                            >
                                <div id="indicator">
                                    <div id="overlay" />
                                </div>
                                <img
                                    src={board[rows[rowId] + (colId + 1)].tile}
                                    class="object-contain p-2"
                                    alt={board[rows[rowId] + (colId + 1)].tile}
                                />
                            </div>
                        {:else}
                            <div
                                id={rows[rowId] + (colId + 1)}
                                bind:this={board[rows[rowId] + (colId + 1)].el}
                                class="w-[30%] h-0 pb-[12.6%] relative bg-lightGreen tile"
                            >
                                <div id="indicator">
                                    <div id="overlay" />
                                </div>
                                <img
                                    src={board[rows[rowId] + (colId + 1)].tile}
                                    class="object-contain p-2"
                                    alt={board[rows[rowId] + (colId + 1)].tile}
                                />
                            </div>
                        {/if}
                    {/each}
                </div>
            {/each}
        </div>
        <Viewer />
    </div>
</main>
