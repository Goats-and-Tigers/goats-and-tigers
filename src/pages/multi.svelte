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
        const rows = str.split("/");
        rows.forEach((r, ri) => {
            let col = r.split("");
            if (rows.length != 8) {
                console.log("bad fen string");
                return;
            }
            col.forEach(async (c, ci) => {
                if (parseInt(c)) {
                    for (let i = 0; i < parseInt(c); i++) {
                        board[rowNames[ri] + (ci + i + 1)] = {
                            id: rowNames[ri] + (ci + i + 1),
                            tile_color: "",
                            tile_type: "",
                        };
                    }
                } else {
                    const tile = get_tile(
                        names[c].tile_color,
                        names[c].tile_type
                    );
                    const id = ci + 1;
                    board[rowNames[ri] + id] = {
                        id: rowNames[ri] + id,
                        ...names[c],
                        tile: tile,
                    };
                }
            });
        });
        return board;
    }
    onMount(async () => {
        const state = parse_fen("GHTBLMRS/8/8/8/8/8/8/ghtblmrs");
        const board = await state;
        console.log(board);
        localStorage.setItem("board", JSON.stringify(board));
    });
</script>

<Board />
