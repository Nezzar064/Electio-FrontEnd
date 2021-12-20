<script context="module">
    //No javascript on page so we prerender it as HTML
    export const prerender = true;
</script>

<script>
</script>

<svelte:head>
    <title>Home</title>
</svelte:head>

<section>
    <div class="flex flex-row w-full px-20 p-20">
        <div class="grid flex-grow card rounded-box">
            <div>
                <h1>
                    <b>Welcome to Electio</b>
                </h1>
            </div>
            <div>
                <p>
                    <b>Electio</b> is an application that can show the current candidates
                    <br>
                    for each political party in the city of Samsø, for the 2021 Commune Elections.
                    <br>
                    Electio can also manage, eg. add, edit or remove candidates for each party.
                    <br>
                    <br>
                </p>
            </div>
            <div class="p-10">
                <p>
                    The system has the following options:
                </p>
                <ul class="p-5">
                    <li class="text-base-100">
                        •&nbsp; View Candidate List at <b>View Candidates</b>
                    </li>
                    <br>
                    <li class="text-base-100">
                        •&nbsp; View a political party and it's candidates at <b>Parties</b>
                        <br>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp; Here you can also add, edit and remove candidates.
                    </li>
                    <br>
                    <li class="text-base-100">
                        •&nbsp; View a simulated result of the election at <b>View Result</b>
                    </li>
                </ul>
            </div>
        </div>
    </div>

</section>


