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
    import {onMount} from "svelte";
    import {DarkPaginationNav, paginate} from "svelte-paginate";
    export let candidates;

    let items = [];

    //Runs after component is rendered to DOM, controls lifecycle of component.
    onMount(async() => {
        items = candidates;
    });

    //Pagination options
    let currentPage = 1;
    let pageSize = 8;
    $: paginatedItems = paginate({items, pageSize, currentPage });

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
                    <div class="btn-group nav">
                        <DarkPaginationNav
                                totalItems="{items.length}"
                                pageSize="{pageSize}"
                                currentPage="{currentPage}"
                                limit="{1}"
                                showStepOptions="{true}"
                                on:setPage="{(p) => currentPage = p.detail.page}"
                        />
                    </div>
                </div>
            </div>
        </div>
        <div class="btn-group p-5">
            <button class="btn-primary btn w-16" on:click={() => items = items.sort((a, b) => a.partyName.localeCompare(b.partyName))}>Sort by Party</button>
            <button class="btn-neutral btn w-16" on:click={() => history.back()}>Go Back</button>
        </div>
    </div>
</section>

<style>
    .nav :global(.pagination-nav) {
        background-color: #2f3340;
        color: white;
    }
</style>