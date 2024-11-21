<script lang="ts">
        import { dayStore } from "$lib/store";
        import { get } from "svelte/store";

        const day = get(dayStore);

        const bookTimeslot = (id: number) => {
                console.log("Booking timeslot", id);
                pickedTimeslot = id;
        };

        let name = "";
        let tlf = "";
        let email = "";
        let studie = "";
        let department = "";

        let pickedTimeslot = undefined;

        const submitForm = () => {
                console.log("Submitting form");

                if (!name) {
                        alert("Please enter your name");
                        return;
                }

                if (!tlf) {
                        alert("Please enter your phone number");
                        return;
                }

                if (!email) {
                        alert("Please enter your email");
                        return;
                }

                if (!pickedTimeslot) {
                        alert("Please pick a timeslot");
                        return;
                }

                // Update a specific timeslot to mark it as booked
                dayStore.update((currentDay) => {
                        const timeslot = currentDay.timeslots.find(
                                (slot) => slot.id === pickedTimeslot,
                        );
                        if (timeslot) {
                                timeslot.available = false;
                                timeslot.user = {
                                        name: name,
                                        email: "john.doe@example.com",
                                        role: "user",
                                };
                        }
                        return currentDay;
                });
        };
</script>

<main>
        <h1>Schedule for {day.date}</h1>
        <form>
                <div>
                        <label for="name">Navn</label>
                        <input
                                type="text"
                                id="name"
                                bind:value={name}
                                placeholder="Ola Normann"
                        />
                </div>
                <div>
                        <label for="name">Telefon</label>
                        <input
                                type="text"
                                id="tlf"
                                name="tlf"
                                bind:value={tlf}
                        />
                </div>
                <div>
                        <label for="name">Email</label>
                        <input
                                type="text"
                                id="email"
                                name="email"
                                bind:value={email}
                        />
                </div>
                <div>
                        <label for="studie">Studieretning</label>
                        <input
                                type="text"
                                id="studie"
                                name="studie"
                                bind:value={studie}
                        />
                </div>
                <div>
                        <label for="dep">Avdeling</label>
                        <input
                                type="text"
                                id="dep"
                                name="dep"
                                bind:value={department}
                        />
                </div>
                <ul>
                        {#each $dayStore.timeslots as timeslot}
                                <li
                                        class={timeslot.available
                                                ? "available"
                                                : "booked"}
                                        on:click={() =>
                                                timeslot.available &&
                                                bookTimeslot(timeslot.id)}
                                >
                                        {timeslot.start_time} - {timeslot.end}
                                        {#if pickedTimeslot === timeslot.id}
                                                <span>✅</span>
                                        {/if}
                                        {#if !timeslot.available}
                                                (Booked by {timeslot.user
                                                        ?.name})
                                        {/if}
                                </li>
                        {/each}
                </ul>

                <button type="submit" on:click={submitForm}>
                        Register tid
                </button>
        </form>
</main>

<style>
        ul {
                list-style-type: none;
                padding: 0;
        }

        li {
                padding: 10px;
                margin: 5px 0;
                border: 1px solid #ccc;
                border-radius: 5px;
                cursor: pointer;
        }

        li.available {
                background-color: #28a745;
                color: white;
        }

        li.booked {
                background-color: #dc3545;
                color: white;
                cursor: not-allowed;
        }

        li:hover.available {
                background-color: #218838;
        }

        input {
                width: 100%;
                padding: 10px;
                margin: 5px 0;
                border-radius: 5px;
                border: 1px solid #ccc;
                background: #000000;
        }
        button {
                padding: 10px 20px;
                background-color: #007bff;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
        }
</style>
