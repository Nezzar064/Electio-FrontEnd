<script context="module">
    //Fetches candidates so it is ready to display before page is loaded
    // Accessing it with export let party..
    export async function load({fetch}) {
        const response = await fetch(`http://localhost:8080/api/party-management/party-names`, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json());

        if (response) {
            return {props: {parties: response}};
        }
        return {
            status: response,
            error: new Error()
        };
    }
</script>

<script>
    export let parties;

    let mappedParties = parties.map(party => ({...party, votes: Math.floor(Math.random() * 600) + 150}));
    //Sums up all votes for each party
    const totalVotes = () => {
        let total = 0;
        for(let i=0; i<mappedParties.length; i++) {
            total += mappedParties[i].votes;
        }
        return total;
    }
    console.log(mappedParties[1].votes)

</script>

<svelte:head>
    <title>Election Result</title>
</svelte:head>

<section>
    <div class="flex flex-row w-full px-20 p-20">
        <div class="grid flex-grow card rounded-box">
            <div>
                <div>
                    <h1>
                        <b>Election Result for each Party</b>
                    </h1>
                </div>
                <div class="p-5">
                    {#each mappedParties as party}
                    <div class="shadow stats p-10">
                        <div class="stat rounded-box w-60">
                            <div class="stat-title">{party.partyName}</div>
                            <div class="stat-value">{Math.round(party.votes/(totalVotes())*100)}%</div>
                            <div class="stat-desc">{party.votes} out of {totalVotes()} total votes</div>
                        </div>
                    </div>
                        {/each}
                </div>
            </div>
        </div>
        <div class="btn-group p-5">
            <button class="btn-neutral btn w-16" on:click={() => history.back()}>Go Back</button>
        </div>
    </div>
</section>
