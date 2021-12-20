<script context="module">
    //Fetches candidates so it is ready to display before page is loaded
    // Accessing it with export let party..
    export async function load({fetch}) {
        const response = await fetch(`http://localhost:8080/api/candidate-management/candidates`, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json());

        if (response) {
            return {props: {candidates: response}};
        }
        return {
            status: response,
            error: new Error()
        };
    }
</script>

<script>
    import { paginate } from 'svelte-paginate';
    export let candidates;
    let items = candidates;

    //Pagination options
    let currentPage = 1;
    let pageSize = 8;
    $: paginatedItems = paginate({items, pageSize, currentPage });

    let totalItems = items.length();
    let numberOfButtons = Math.round(totalItems/pageSize);

    //Sorted List




</script>

<svelte:head>
    <title>Candidates</title>
</svelte:head>

<section>
    <div class="flex flex-row w-full px-20 p-20">
        <div class="grid flex-grow card rounded-box">
            <div>
                <div>
                    <h1>
                        <b>Candidate List</b>
                    </h1>
                </div>
                <h2>All Candidates</h2>
                <br>
                <div class="overflow-x-auto">
                    <table class="table w-50">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Party</th>
                            <th>Utilities</th>
                        </tr>
                        </thead>
                        <tbody>
                        {#each paginatedItems as candidate}
                            <tr>
                                <td>{candidate.firstName} {candidate.lastName}</td>
                                <td>{candidate.partyName}</td>
                                <td><a class="btn-neutral btn w-22" sveltekit:prefetch rel="external"
                                       href="/parties/{candidate.partyName}">Go to party</a></td>
                            </tr>
                        {/each}
                        </tbody>
                    </table>
                    <div class="btn-group">
                        <button class="btn">Previous</button>

                        <button class="btn">1</button>
                        <button class="btn btn-active">2</button>
                        <button class="btn">3</button>
                        <button class="btn">4</button>
                        <button class="btn">Next</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="p-5">
            <button class="btn-neutral btn w-16" on:click={() => history.back()}>Go Back</button>
        </div>
    </div>
</section>