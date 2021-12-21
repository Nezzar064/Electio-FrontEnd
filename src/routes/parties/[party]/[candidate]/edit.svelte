<script context="module">
    //Fetches the selected party so it is ready to display before page is loaded.
    // Accessing it with export let party..
    export async function load({page}) {

        const party = page.params.party;
        const candidate = JSON.parse(page.params.candidate);
        let decodedParams = decodeURIComponent(party);

        const response = await fetch(`http://localhost:8080/api/party-management/party-names`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json());

        if (response) {
            return {props: {parties: response, decodedParams, candidateToEdit: candidate}};
        }
        return {
            message: response,
            error: new Error()
        };
    }
</script>

<script>
    import {put} from "$lib/api";

    export let decodedParams;
    export let candidateToEdit;
    export let parties;

    let firstName;
    let lastName;
    let party;
    console.log(firstName)
    console.log(lastName)
    console.log(party)

    async function submit(firstname, lastname, partyName) {

        const response = await put(`candidate-management/candidates/${candidateToEdit.id}`, {
            firstName: firstname,
            lastName: lastname,
            partyName: partyName
        });
        if (response) {
            firstName = null;
            lastName = null;
            party = null;
            return alert("Edit was successful - press Return to go back");
        }
        return alert("Error Occurred");
    }
</script>

<svelte:head>
    <title>Edit Candidate</title>
</svelte:head>

<div class="flex flex-row w-full px-20 p-20">
    <div class="grid flex-grow card rounded-box">
        <div>
            <h2><b>Edit Candidate</b></h2>
        </div>
        <div class="p-10">
            <div class="form-control">
                <label class="label">
                    <span class="label-text text-base-100"><b>First Name</b></span>
                </label>
                <input placeholder={candidateToEdit.firstName} bind:value={firstName} class="input max-w-xs"
                       type="text">
                <label class="label">
                    <span class="label-text text-base-100"><b>Last Name</b></span>
                </label>
                <input placeholder={candidateToEdit.lastName} bind:value={lastName} class="input max-w-xs"
                       type="text">
                <label class="label-text text-base-100">
                    <b>Party</b>
                    <br>
                    Former: {decodedParams}
                </label>
                <select bind:value={party} class="select select-bordered max-w-xs">
                    <option disabled="disabled" selected="selected">{decodedParams}</option>
                    {#each parties as party}
                        <option value={party.partyName}>{party.partyName}</option>
                    {/each}
                </select>
                <br>
                <div class="btn-group pt-5">
                    <button class="btn-success btn w-16" on:click={submit(firstName, lastName, party)}>Submit</button>
                    <a class="btn-neutral btn w-16" sveltekit:prefetch rel="external" href="/parties/{decodedParams}">Return</a>
                </div>
            </div>
        </div>
    </div>
    <div class="p-5">
        <button class="btn-neutral btn w-16" on:click={() => history.back()}>Go Back</button>
    </div>
</div>

