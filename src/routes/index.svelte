<script>
  import { user } from "../user";

  import Board from "../Board.svelte";
  import { onMount } from "svelte";
  var myDate = new Date();
  var currentHour = myDate.getHours();

  let msg;
  let username;

  if (currentHour < 12) msg = "Good Morning";
  else if (currentHour == 12) msg = "Good Noon";
  else if (currentHour >= 12 && currentHour <= 17) msg = "Good Afternoon";
  else if (currentHour >= 17 && currentHour <= 24) msg = "Good Evening";
  onMount(async () => {
    username = await user.get("alias");
  });
</script>

<h1 class="text-2xl font-bold mb-5">{msg}, {username}.</h1>
<Board />
