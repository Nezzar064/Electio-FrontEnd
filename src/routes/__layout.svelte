<script context="module">
    //Fetches party names so it is ready to display before page is loaded, used for dropdown.
    //Accessing it with export let party..
    export async function load({fetch}) {
        const response = await fetch(`http://localhost:8080/api/party-management/party-names`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json());

        if (response) {
            return {props: {parties: response}};
        }
        return {
            status: response.status,
            error: new Error()
        };
    }
</script>

<script>
    import '../app.css';
    import {scrollTop} from 'svelte-scrolling'

    export let parties;
</script>

<div class="navbar  shadow-lg bg-neutral text-neutral-content bg-base-200 ">
    <div class="flex-none px-2 mx-2">
    <span class="text-lg font-bold">
            ELECTIO
          </span>
    </div>
    <div class="flex-1 px-2 mx-2">
        <div class="items-stretch lg:flex">
            <a sveltekit:prefetch="" href="/" class="btn btn-ghost rounded-btn">
                Home
            </a>
            <a sveltekit:prefetch="" href="/candidates" class="btn btn-ghost rounded-btn">
                Candidates
            </a>
            <div class="dropdown dropdown-hover bg-base-200">
                <div tabindex="0" class="bg-base-200 btn btn-ghost">Parties</div>
                <ul tabindex="0" class="p-2 shadow menu dropdown-content bg-base-200 rounded-box w-46">
                    <!-- Each loop provided by svelte to render our party URL's in nav -->
                    {#each parties as party}
                        <li>
                            <a class="btn btn-ghost" sveltekit:prefetch rel="external"
                               href="/parties/{party.partyName}">{party.partyName}</a>
                        </li>
                    {/each}
                </ul>
            </div>
            <a sveltekit:prefetch="" href="/result" class="btn btn-ghost rounded-btn">
                View Result
            </a>
        </div>
    </div>
</div>

<main>
    <slot/>
</main>

<div class="bg-base-200">
    <footer>
        <button class="btn btn-ghost btn-sm btn-outline" on:click="{() => scrollTop()}">To Top</button>
    </footer>
</div>


<style>

    main {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 1rem;
        width: 100%;
        margin: 0 auto;
        box-sizing: border-box;
        background-color: lightgray;
    }

    footer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 40px;
        color: white;
    }

</style>

