<script context="module">
    //Fetches the selected party so it is ready to display before page is loaded.
    // Accessing it with export let party..
    export async function load({fetch, page}) {
        const {party} = page.params;
        let decodedParams = decodeURIComponent(party);

        const response = await fetch(`http://localhost:8080/api/party-management/parties/party-by-name?party-name=${decodedParams}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json());

        if (response) {
            return {props: {party: response, decodedParams}};
        }
        return {
            error: new Error(),
        };
    }
</script>

<script>
    export let decodedParams;
    export let party;
    import {goto} from "$app/navigation";
    import {del} from "$lib/api";

    let partyCandidates = party.candidates;

    const handleDelete = async (candidate, id) => {
        let index = partyCandidates.indexOf(candidate);
        await del(`candidate-management/candidates/${id}`);
        partyCandidates.splice(index, 1);
        partyCandidates = partyCandidates;
    };
</script>

<svelte:head>
    <title>{decodedParams}</title>
</svelte:head>

<section>
    <div class="flex flex-row w-full px-20 p-20">
        <div class="grid flex-grow card rounded-box">
            <div>
                <h1>
                    <b>{decodedParams}</b>
                </h1>
            </div>
            <h2>
                Candidate List
            </h2>

            <div class="overflow-x-auto">
                <table class="table w-50">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Utilities</th>
                    </tr>
                    </thead>
                    <tbody>
                    {#each partyCandidates as candidate}
                        <tr>
                            <td>{candidate.firstName} {candidate.lastName}</td>
                            <td>
                                <!-- Could encode the candidate so it isn't exposed in URI -->
                                <button class="btn btn-primary" on:click={() => {
                            goto(`${decodedParams}/${JSON.stringify(candidate)}/edit`)}}>
                                    Edit
                                </button>
                                <button class="btn btn-danger" on:click={handleDelete(candidate, candidate.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    {/each}
                    </tbody>
                </table>
            </div>
        </div>
        <div class="btn-group p-5">
            <a class="btn btn-primary w-22" on:click={() => {
                            goto(`${decodedParams}/add`)}}>
                Add Candidate
            </a>
            <button class="btn-neutral btn w-16" sveltekit:prefetch rel="external" on:click={() => history.back()}>Go
                Back
            </button>
        </div>
    </div>

</section>